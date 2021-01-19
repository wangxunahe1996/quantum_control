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
				<a-select
					placeholder="Select version"
					style="width: 150px;margin-left:0px;"
					size="small"
					v-model="version"
				>
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
				<a-input-search
					placeholder="input search text"
					size="small"
					style="width:240px;margin-left:20px;"
					enter-button
					:loading="searchLoading"
					@search="onSearch"
				/>
			</div>
			<div id="jsonEditor"></div>
		</div>
		<div class="rightDiv"></div>
	</div>
</template>
<script>
import JsonEditor from "jsoneditor"
import "jsoneditor/dist/jsoneditor.min.css"
const SCHEMA = {
	type: "object",
	title: "vue-json-editor demo",
	editor: null,
	properties: {
		name: {
			type: "string",
		},
		email: {
			type: "string",
		},
	},
}
export default {
	data() {
		return {
			version: undefined,
			selectedKeys: ["1"],
			searchLoading: false,
		}
	},
	mounted() {
		this.initJsonEditor()
	},
	methods: {
		handleClick(e) {
			let key = e.key
			this.selectedKeys = [`${key}`]
		},
		onSearch() {
			this.getJSON()
			this.searchLoading = true
			setTimeout(() => {
				this.searchLoading = false
			}, 2000)
		},
		initJsonEditor() {
			var options = {
				templates: [
					{
						text: "qubit1",
						title: "Insert a Person Node",
						className: "jsoneditor-type-object",
						field: "qubit1",
						value: {
							firstName: "John",
							lastName: "Do",
							age: 28,
						},
					},
					{
						text: "Address",
						title: "Insert a Address Node",
						field: "AddressTemplate",
						value: {
							street: "",
							city: "",
							state: "",
							"ZIP code": "",
						},
					},
				],
			}
			let container = document.getElementById("jsonEditor")
			this.editor = new JsonEditor(container, options)
			this.setJSON()
		},
		setJSON() {
			var json = {}
			this.editor.set(json)
		},
		getJSON() {
			var json = this.editor.get()
			console.log(json)
		},
	},
}
</script>
<style lang="less" scoped>
@import url("../assets/css/common.less");
/deep/ .ant-menu-submenu-title {
	display: none;
}
#Config {
	#jsonEditor {
		margin-top: 20px;
	}
}
</style>
