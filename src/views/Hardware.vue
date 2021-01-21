<template>
	<div id="Hardware" class="main">
		<div id="myPaletteDiv" class="leftDiv"></div>
		<div id="myDiagramDiv" class="rightDiv"></div>
		<div class="btnGroup">
			<a-button type="primary" @click="save">
				console.log
			</a-button>
			<!-- <a-button type="primary" @click="start">
				start
			</a-button> -->
			<!-- <a-button type="primary" @click="resotoreEditor">
				restore
			</a-button> -->
		</div>
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
		{ key: 2, category: "Computer", name: "Computer2" ,color:"red"},
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
		{ from: 1, frompid: "UL", to: 11, topid: "" },
		{ from: 2, frompid: "OUT", to: 11, topid: "R", color: "red",arrowColor:"red" },
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
			// this.makeTemplate("Table", "../assets/images/table.svg", "forestgreen", [], [this.makePort("OUT", false)])

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

			// this.makeTemplate(
			// 	"Filter",
			// 	"../assets/images/filter.svg",
			// 	"cornflowerblue",
			// 	[this.makePort("", true)],
			// 	[this.makePort("OUT", false), this.makePort("INV", false)]
			// )

			this.makeTemplate(
				"GPU",
				"/images/gpu.svg",
				"mediumpurple",
				[this.makePort("", true)],
				[this.makePort("OUT", false)]
			)

			// this.makeTemplate(
			// 	"Sort",
			// 	"../assets/images/sort.svg",
			// 	"sienna",
			// 	[this.makePort("", true)],
			// 	[this.makePort("OUT", false)]
			// )

			// this.makeTemplate("Export", "../assets/images/upload.svg", "darkred", [this.makePort("", true)], [])
			this.load()
			//初始化配置面板
			myPalette = $(go.Palette, "myPaletteDiv", {
				"animationManager.initialAnimationStyle": go.AnimationManager.None,
				InitialAnimationStarting: this.animateFadeDown,
				nodeTemplateMap: myDiagram.nodeTemplateMap,
				model: new go.GraphLinksModel([
					{ category: "Computer", name: "Computer" },
					{ category: "GPU", name: "GPU" },
					{ category: "CPU", name: "CPU" },
				]),
			})
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
				$(go.Shape, { stroke: "gray", fill: "gray", toArrow: "Standard" },new go.Binding("stroke", "arrowColor"))
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
					$(go.Shape, "Rectangle", {
						fill:background,
						stroke: null,
						strokeWidth: 0,
						spot1: go.Spot.TopLeft,
						spot2: go.Spot.BottomRight,
					},new go.Binding("fill", "color")),
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
		//开始
		start() {
			
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
