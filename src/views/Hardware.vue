<template>
	<div id="Hardware" class="main">
		<div id="myPaletteDiv" class="leftDiv"></div>
		<div id="myDiagramDiv" class="rightDiv"></div>
		<div class="btnGroup">
			<a-button type="primary" @click="setLeftPalette">
				Add
			</a-button>
			<a-button type="primary" @click="save">
				console.log
			</a-button>
		</div>
		<a-modal title="Add" :visible="visible" :confirm-loading="confirmLoading" @ok="handleOk" @cancel="handleCancel">
			<a-form-model ref="dynamicValidateForm" :model="dynamicValidateForm" v-bind="formItemLayoutWithOutLabel">
				<a-form-model-item
					key="4"
					v-bind="formItemLayout"
					label="Type"
					prop="hardwareType"
					:rules="{
						required: true,
						message: 'hardware type can not be null',
						trigger: 'blur',
					}"
				>
					<a-input
						v-model="dynamicValidateForm.hardwareType"
						placeholder="please input left hardware type"
						style="width: 60%; margin-right: 8px"
					/>
				</a-form-model-item>
				<a-form-model-item
					key="5"
					v-bind="formItemLayout"
					label="Name"
					prop="hardwareName"
					:rules="{
						required: true,
						message: 'hardware name can not be null',
						trigger: 'blur',
					}"
				>
					<a-input
						v-model="dynamicValidateForm.hardwareName"
						placeholder="please input left hardware name"
						style="width: 60%; margin-right: 8px"
					/>
				</a-form-model-item>
				<a-form-model-item
					key="3"
					v-bind="formItemLayout"
					label="Color"
					prop="hardwareColor"
					:rules="{
						required: true,
						message: 'hardware Color can not be null',
						trigger: 'blur',
					}"
				>
					<a-input
						v-model="dynamicValidateForm.hardwareColor"
						placeholder="please input left hardware Color"
						style="width: 60%; margin-right: 8px"
					/>
				</a-form-model-item>
				<a-form-model-item
					v-for="(leftPort, index) in dynamicValidateForm.leftPorts"
					:key="leftPort.key"
					v-bind="index === 0 ? formItemLayout : {}"
					:label="index === 0 ? 'Left Ports' : ''"
					:prop="'leftPorts.' + index + '.value'"
					:rules="{
						required: true,
						message: 'left port can not be null',
						trigger: 'blur',
					}"
				>
					<a-input
						v-model="leftPort.value"
						placeholder="please input left port name"
						style="width: 60%; margin-right: 8px"
					/>
					<a-icon
						v-if="dynamicValidateForm.leftPorts.length > 1"
						class="dynamic-delete-button"
						type="minus-circle-o"
						:disabled="dynamicValidateForm.leftPorts.length === 1"
						@click="removeLeftPort(leftPort)"
					/>
				</a-form-model-item>
				<a-form-model-item v-bind="formItemLayoutWithOutLabel" v-if="dynamicValidateForm.leftPorts.length < 7">
					<a-button type="dashed" style="width: 60%" @click="addLeftPort">
						<a-icon type="plus" /> Add field
					</a-button>
				</a-form-model-item>
				<a-form-model-item v-bind="formItemLayoutWithOutLabel" v-if="dynamicValidateForm.leftPorts.length >= 7">
					<p style="color:red;">最多支持添加7个端口</p>
				</a-form-model-item>

				<a-form-model-item
					v-for="(rightPort, index) in dynamicValidateForm.rightPorts"
					:key="rightPort.key"
					v-bind="index === 0 ? formItemLayout : {}"
					:label="index === 0 ? 'Reft Ports' : ''"
					:prop="'rightPorts.' + index + '.value'"
					:rules="{
						required: true,
						message: 'right port can not be null',
						trigger: 'blur',
					}"
				>
					<a-input
						v-model="rightPort.value"
						placeholder="please input right port name"
						style="width: 60%; margin-right: 8px"
					/>
					<a-icon
						v-if="dynamicValidateForm.rightPorts.length > 1"
						class="dynamic-delete-button"
						type="minus-circle-o"
						:disabled="dynamicValidateForm.rightPorts.length === 1"
						@click="removeRightPort(rightPort)"
					/>
				</a-form-model-item>
				<a-form-model-item v-bind="formItemLayoutWithOutLabel">
					<a-button
						type="dashed"
						style="width: 60%"
						@click="addRightPort"
						v-if="dynamicValidateForm.rightPorts.length < 7"
					>
						<a-icon type="plus" /> Add field
					</a-button>
				</a-form-model-item>
				<a-form-model-item
					v-bind="formItemLayoutWithOutLabel"
					v-if="dynamicValidateForm.rightPorts.length >= 7"
				>
					<p style="color:red;">最多支持添加7个端口</p>
				</a-form-model-item>
			</a-form-model>
		</a-modal>
	</div>
</template>

<script>
import * as go from "../assets/js/go-module.js"
let $ = go.GraphObject.make
//画板盒子
let myDiagram, myPalette
let testData = {
	class: "go.GraphLinksModel",
	// nodeCategoryProperty: "type",
	linkFromPortIdProperty: "frompid",
	linkToPortIdProperty: "topid",
	nodeDataArray: [
		{ key: 1, category: "Computer", name: "Computer1" },
		{ key: 2, category: "Computer", name: "Computer2", color: "red" },
		{ key: 3, category: "Computer", name: "Computer3" },
		{ key: 4, category: "Computer", name: "Computer4" },
		{ key: 11, category: "GPU", name: "gpu1" },
		{ key: 12, category: "GPU", name: "gpu2" },
		{ key: 13, category: "GPU", name: "gpu3" },
		{ key: 21, category: "CPU", name: "cpu1" },
		{ key: 31, category: "CPU", name: "cpu2" },
		{ key: 32, category: "CPU", name: "cpu3" },
		{ key: 41, category: "GPU", name: "GPU4" },
		{ key: 42, category: "GPU", name: "gpu5" },
		{ key: 51, category: "GPU", name: "gpu6" },
		{ key: 61, category: "GPU", name: "gpu7" },
		{ key: 71, category: "GPU", name: "gpu8" },
	],
	linkDataArray: [
		{ from: 1, frompid: "UL", to: 11, topid: "", text: "hello" },
		{ from: 2, frompid: "OUT", to: 11, topid: "R", color: "red", arrowColor: "red" },
		{ from: 3, frompid: "OUT", to: 12, topid: "R" },
		{ from: 4, frompid: "OUT", to: 13, topid: "R" },
		{ from: 11, frompid: "M", to: 12, topid: "L" },
		{ from: 12, frompid: "M", to: 13, topid: "L" },
		{ from: 13, frompid: "M", to: 21 },
		{ from: 21, frompid: "OUT", to: 31 },
		{ from: 21, frompid: "OUT", to: 32 },
		{ from: 31, frompid: "OUT", to: 41 },
		{ from: 32, frompid: "OUT", to: 42 },
		{ from: 41, frompid: "OUT", to: 51, topid: "L" },
		{ from: 42, frompid: "OUT", to: 51, topid: "R" },
		{ from: 51, frompid: "OUT", to: 61 },
		{ from: 61, frompid: "OUT", to: 71 },
	],
}
export default {
	data() {
		return {
			testData,
			confirmLoading: false,
			visible: false,
			formItemLayout: {
				labelCol: {
					xs: { span: 24 },
					sm: { span: 4 },
				},
				wrapperCol: {
					xs: { span: 24 },
					sm: { span: 20 },
				},
			},
			formItemLayoutWithOutLabel: {
				wrapperCol: {
					xs: { span: 24, offset: 0 },
					sm: { span: 20, offset: 4 },
				},
			},
			dynamicValidateForm: {
				hardwareColor: undefined,
				hardwareType: undefined,
				hardwareName: undefined,
				leftPorts: [
					{
						key: "1",
						value: undefined,
					},
				],
				rightPorts: [
					{
						key: "2",
						value: undefined,
					},
				],
			},
		}
	},
	mounted() {
		this.init()
	},

	methods: {
		init() {
			//初始化右侧画布
			myDiagram = $(go.Diagram, "myDiagramDiv", {
				"animationManager.initialAnimationStyle": go.AnimationManager.None,
				initialContentAlignment: go.Spot.Left,
				initialAutoScale: go.Diagram.UniformToFill,
				layout: $(go.LayeredDigraphLayout, { direction: 0 }),
				"undoManager.isEnabled": true,
			})
			//设置模板
			this.setTemplate()
			this.load()
			this.initLeftPalette()
			//设置连接线
			myDiagram.linkTemplate = $(
				go.Link,
				{
					routing: go.Link.Orthogonal,
					corner: 5,
					relinkableFrom: true,
					relinkableTo: true,
				},
				$(go.Shape, { stroke: "gray", strokeWidth: 2 }, new go.Binding("stroke", "color")),
				$(
					go.Shape,
					{ stroke: "gray", fill: "gray", toArrow: "Standard" }, //Line 无向 standard 有向
					new go.Binding("stroke", "arrowColor"), //箭头边线颜色
					new go.Binding("fill", "arrowColor"), //箭头内部颜色
					new go.Binding("toArrow", "arrow") //箭头样式
				),
				$(
					go.Panel,
					"Auto",
					$(
						go.TextBlock,
						"transition", // the label text
						{
							textAlign: "center",
							font: "9pt helvetica, arial, sans-serif",
							margin: 4,
							editable: true, // enable in-place editing
						},
						new go.Binding("text").makeTwoWay()
					)
				),
				{
					contextMenu: this.setLinkMenu(),
				}
			)
		},
		//初始化左侧模板
		initLeftPalette(paletteData) {
			
			
			if (myPalette) {
				myPalette.div = null
			}
			let data = [
				{ category: "Computer", name: "Computer" },
				{ category: "GPU", name: "GPU" },
				{ category: "CPU", name: "CPU" },
			]
			
			if (paletteData) {
				paletteData = [...data,paletteData]
			} else {
				paletteData = data
			}
			
			//初始化配置面板
			myPalette = $(go.Palette, "myPaletteDiv", {
				"animationManager.initialAnimationStyle": go.AnimationManager.None,
				InitialAnimationStarting: this.animateFadeDown,
				nodeTemplateMap: myDiagram.nodeTemplateMap,
				model: new go.GraphLinksModel(paletteData),
			})
		},
		//设置模板
		setTemplate() {
			this.makeTemplate(
				"Computer",
				"/images/computer.svg",
				"mediumorchid",
				[this.makePort("L", true), this.makePort("R", true)],
				[
					this.makePort("UL", false),
					this.makePort("ML", false),
					this.makePort("M", false),
					this.makePort("MR", false),
					this.makePort("UR", false),
				]
			)
			this.makeTemplate(
				"CPU",
				"/images/cpu.svg",
				"darkcyan",
				[this.makePort("", true)],
				[this.makePort("OUT", false)]
			)
			this.makeTemplate(
				"GPU",
				"/images/gpu.svg",
				"mediumpurple",
				[this.makePort("", true)],
				[this.makePort("OUT", false)]
			)
		},
		//动画方法
		animateFadeDown(e) {
			let diagram = e.diagram
			let animation = new go.Animation()
			animation.isViewportUnconstrained = true // So Diagram positioning rules let the animation start off-screen
			animation.easing = go.Animation.EaseOutExpo
			animation.duration = 900
			// Fade "down", in other words, fade in from above
			animation.add(diagram, "position", diagram.position.copy().offset(0, 200), diagram.position)
			animation.add(diagram, "opacity", 0, 1)
			animation.start()
		},
		//创建端口
		//端口名称和是否在左边
		makePort(name, leftside) {
			let port = $(go.Shape, "Rectangle", {
				fill: "gray",
				stroke: null,
				desiredSize: new go.Size(8, 8),
				portId: name,
				// toMaxLinks: 1,
				cursor: "pointer",
			})

			let lab = $(
				go.TextBlock,
				name, // the name of the port
				{ font: "7pt sans-serif" }
			)

			let panel = $(go.Panel, "Horizontal", { margin: new go.Margin(2, 0) })

			// set up the port/panel based on which side of the node it will be on
			if (leftside) {
				port.toSpot = go.Spot.Left
				port.toLinkable = true
				lab.margin = new go.Margin(1, 0, 0, 1)
				panel.alignment = go.Spot.TopLeft
				panel.add(port)
				panel.add(lab)
			} else {
				port.fromSpot = go.Spot.Right
				port.fromLinkable = true
				lab.margin = new go.Margin(1, 1, 0, 0)
				panel.alignment = go.Spot.TopRight
				panel.add(lab)
				panel.add(port)
			}
			return panel
		},
		//创建模板
		//名称，图标，背景色，输入口，输出口
		makeTemplate(typename, icon, background, inports, outports) {
			let node = $(
				go.Node,
				"Spot",
				$(
					go.Panel,
					"Auto",
					{ width: 100, height: 120 },
					$(
						go.Shape,
						"Rectangle",
						{
							fill: background,
							stroke: null,
							strokeWidth: 0,
							spot1: go.Spot.TopLeft,
							spot2: go.Spot.BottomRight,
						},
						new go.Binding("fill", "color")
					),
					$(
						go.Panel,
						"Table",
						$(go.TextBlock, typename, {
							row: 0,
							margin: 3,
							maxSize: new go.Size(80, NaN),
							stroke: "white",
							font: "bold 11pt sans-serif",
						}),
						$(go.Picture, icon, { row: 1, width: 16, height: 16, scale: 3.0 }),
						$(
							go.TextBlock,
							{
								row: 2,
								margin: 3,
								editable: true,
								maxSize: new go.Size(80, 40),
								stroke: "white",
								font: "bold 9pt sans-serif",
							},
							new go.Binding("text", "name").makeTwoWay()
						)
					)
				),
				$(
					go.Panel,
					"Vertical",
					{
						alignment: go.Spot.Left,
						alignmentFocus: new go.Spot(0, 0.5, 8, 0),
					},
					inports
				),
				$(
					go.Panel,
					"Vertical",
					{
						alignment: go.Spot.Right,
						alignmentFocus: new go.Spot(1, 0.5, -8, 0),
					},
					outports
				)
			)
			myDiagram.nodeTemplateMap.set(typename, node)
		},
		//数据加载画布
		load() {
			myDiagram.model = go.Model.fromJson(JSON.stringify(this.testData))
		},
		//打印数据
		save() {
			console.log(myDiagram.model.toJson())
		},
		//设置连接线右键菜单
		setLinkMenu() {
			let self = this
			let linkMenu = $(
				"ContextMenu",
				self.makeButton("Delete", function(e, obj) {
					e.diagram.commandHandler.deleteSelection()
				}),
				self.makeButton("Directional arrow", function(e, obj) {
					self.changeArrow(obj.part.adornedObject, "Standard")
				}),
				self.makeButton("Undirected arrow", function(e, obj) {
					self.changeArrow(obj.part.adornedObject, "Line")
				})
			)
			return linkMenu
		},
		//创建右键菜单按键
		makeButton(text, action, visiblePredicate) {
			return $(
				"ContextMenuButton",
				$(go.TextBlock, text),
				{ click: action },
				visiblePredicate
					? new go.Binding("visible", "", function(o, e) {
							return o.diagram ? visiblePredicate(o, e) : false
					  }).ofObject()
					: {}
			)
		},
		//修改连接线箭头
		changeArrow(link, type) {
			myDiagram.startTransaction("typeArrow")
			let data = link.data
			myDiagram.model.setDataProperty(data, "arrow", type)
			myDiagram.commitTransaction("typeArrow")
		},
		//设置左侧模板
		setLeftPalette() {
			this.visible = true
		},
		handleOk() {
			this.$refs["dynamicValidateForm"].validate((valid) => {
				if (valid) {
				
					// this.visible = false
					this.confirmLoading = true
					let makeLeftPorts = []
					let makeRightPorts = []
					this.dynamicValidateForm.leftPorts.map((item) => {
						makeLeftPorts.push(this.makePort(item.value, true))
					})
					this.dynamicValidateForm.rightPorts.map((item) => {
						makeRightPorts.push(this.makePort(item.value, false))
					})
					this.makeTemplate(
						this.dynamicValidateForm.hardwareType,
						"/images/cpu.svg",
						this.dynamicValidateForm.hardwareColor,
						makeLeftPorts,
						makeRightPorts
					)
					// console.log(myDiagram.nodeTemplateMap)
					this.initLeftPalette({
						category: this.dynamicValidateForm.hardwareType,
						name: this.dynamicValidateForm.hardwareName,
					})
					this.confirmLoading = false
					this.visible = false
				}
			})
		},
		handleCancel() {
			this.visible = false
			this.dynamicValidateForm = {
				hardwareName: undefined,
				hardwareType: undefined,
				leftPorts: [
					{
						key: "1",
						value: undefined,
					},
				],
				rightPorts: [
					{
						key: "2",
						value: undefined,
					},
				],
			}
		},

		resetForm(formName) {
			this.$refs[formName].resetFields()
		},
		//移除左侧端口
		removeLeftPort(item) {
			let index = this.dynamicValidateForm.leftPorts.indexOf(item)
			if (index !== -1) {
				this.dynamicValidateForm.leftPorts.splice(index, 1)
			}
		},
		//移除右侧端口
		removeRightPort(item) {
			let index = this.dynamicValidateForm.rightPorts.indexOf(item)
			if (index !== -1) {
				this.dynamicValidateForm.rightPorts.splice(index, 1)
			}
		},
		//添加左侧端口
		addLeftPort() {
			this.dynamicValidateForm.leftPorts.push({
				value: "",
				key: Date.now(),
			})
		},
		//添加右侧端口
		addRightPort() {
			this.dynamicValidateForm.rightPorts.push({
				value: "",
				key: Date.now(),
			})
		},
	},
}
</script>
<style lang="less" scoped>
@import url("../assets/css/common.less");
#Hardware {
	width: 100%;
	height: 100%;
	position: relative;
	.btnGroup {
		position: absolute;
		z-index: 999;
		right: 0px;
		.ant-btn {
			margin-left: 10px;
		}
	}
}
</style>
