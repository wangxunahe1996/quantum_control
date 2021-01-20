<template>
	<div id="Config" class="main">
		<div class="leftDiv">
			<a-menu style="width: 100%;border:0;" mode="inline" @click="handleClick" :selectedKeys="selectedKeys">
				<a-menu-item key="1">
					Qubit
				</a-menu-item>
				<a-menu-item key="2">
					Hardware
				</a-menu-item>
				<a-menu-item key="3">
					Custom
				</a-menu-item>
			</a-menu>
		</div>
		<div class="midDiv">
			<div class="search">
				<a-select placeholder="version" style="width: 100px;margin-left:0px;" size="small" v-model="version">
					<a-select-option value="0">
						1.1
					</a-select-option>
					<a-select-option value="1">
						1.2
					</a-select-option>
					<a-select-option value="2">
						1.3
					</a-select-option>
				</a-select>
			</div>
			<div id="jsonEditor"></div>
			<div class="btnGroup">
				<a-button type="primary" @click="commit">
					commit
				</a-button>
				<a-button type="primary" @click="setAsDefault">
					set as default
				</a-button>
				<a-button type="primary" @click="resotoreEditor">
					restore
				</a-button>
			</div>
		</div>
		<div class="rightDiv">
			<div id="modelEditor"></div>
		</div>
		<!-- 提交弹出框 -->
		<a-modal
			title="Confirm"
			:visible="visible"
			:confirm-loading="confirmLoading"
			@ok="handleOk"
			@cancel="handleCancel"
		>
			<a-form-model ref="confirmForm" :model="confirmForm" :rules="confirmRules" class="confirmForm">
				<a-form-model-item prop="versionNum">
					<a-input
						v-model="confirmForm.versionNum"
						type="text"
						autocomplete="off"
						placeholder="Please enter the version number"
					/>
				</a-form-model-item>
			</a-form-model>
		</a-modal>
	</div>
</template>
<script>
import JsonEditor from "jsoneditor"
import "jsoneditor/dist/jsoneditor.min.css"

export default {
	data() {
		return {
			version: undefined,
			selectedKeys: ["1"],
			searchLoading: false,
			json: {},
			visible: false,
			confirmLoading: false,
			confirmForm: {
				versionNum: "",
			},
			confirmRules: {
				versionNum: [{ required: true, message: "Please enter the version number", trigger: "blur" }],
			},
		}
	},
	mounted() {
		// 初始化jsoneditor
		this.initJsonEditor()
	},
	methods: {
		//左侧选择栏
		handleClick(e) {
			let key = e.key
			this.selectedKeys = [`${key}`]
		},
		//初始化editor
		initJsonEditor() {
			let self = this

			let options = {
				// language: "en",
				mode: "tree",
				modes: ["code", "form", "text", "tree", "view", "preview"], // allowed modes
			}
			let optionModel = {
				text: "name",
				mode: "tree",
				modes: ["code", "form", "text", "tree", "view", "preview"], // allowed modes
				//模板editor监听事件
				onEvent: function(node, event) {
					// console.log(event)
					if (event.type == "focus" && node.field != "" && node.path.length < 2) {
						self.getJSONModel(node.field)
					}
				},
				templates: [
					{
						text: "qubit1",
						title: "Insert a Person Node",
						className: "jsoneditor-type-object",
						field: "qubit1",
						value: {
							hardwares: ["ADC1", "DAC1"],
							dealy: [1, "s"],
						},
					},
				],
			}
			let container = document.getElementById("jsonEditor")
			let containerModel = document.getElementById("modelEditor")
			this.editor = new JsonEditor(container, options)
			this.editorModel = new JsonEditor(containerModel, optionModel)
			this.setJSON(this.json)
			this.setJsonModel()
		},
		//设置中间editor
		setJSON() {
			this.editor.set(this.json)
		},
		// 设置模板editor
		setJsonModel(json) {
			let jsonModel = {
				qubit1: { hardwares: ["ADC1", "DAC1"], dealy: [1, "s"] },
			}
			this.editorModel.set(jsonModel)
		},
		// 读取中间JSON
		getJSON() {
			let nowJson = this.editor.get()
			return nowJson
		},
		// 读取模板JSON
		getJSONModel(field) {
			let nowJson = this.getJSON()
			this.json = nowJson
			let jsonModel = this.editorModel.get()
			if (this.json[field]) {
				let count = 1
				Object.getOwnPropertyNames(this.json).map((item) => {
					if (item.split("[")[0] == field) {
						count += 1
					}
				})

				let name = `${field}[${count}]`
				this.json[name] = jsonModel[field]
			} else {
				this.json[field] = jsonModel[field]
			}
			this.setJSON()
		},
		//重置
		resotoreEditor() {
			this.json = {}
			this.setJSON()
		},
		//提交
		commit() {
			this.visible = true
		},
		//对话框确认提交
		handleOk() {
			this.$refs.confirmForm.validate((valid) => {
				if (valid) {
					//loading
					this.confirmLoading = true
					let nowJson = this.getJSON()
					nowJson['version'] = this.confirmForm.versionNum
					setTimeout(()=>{
						this.confirmForm.versionNum = ""
						this.confirmLoading = false
						this.visible = false
					},2000)
				}
			})
		},
		//取消提交
		handleCancel(){
			this.visible = false
		},
		//设置为默认
		setAsDefault(){
			//实现就是读取中间页面json，调用存储模板接口。刷新右侧
			
		}

	},
}
</script>
<style lang="less" scoped>
@import url("../assets/css/common.less");
/deep/ .ant-menu-submenu-title {
	display: none;
}
#Config {
	.midDiv {
		position: relative;
	}
	.search {
		position: absolute;
		z-index: 999;
		right: 190px;
		top: 5px;
	}
	.btnGroup {
		margin-top: 10px;
		text-align: center;
		.ant-btn {
			margin-right: 10px;
			margin-bottom: 30px;
		}
	}
	/deep/ .ant-select-sm .ant-select-selection--single {
		height: 26px;
	}
}
</style>
