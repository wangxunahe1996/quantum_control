import { Chart } from "@antv/g2"
//创建ganttchart
let ganttChart = null
let lineChart = null
let scatterChart = null
const createGanttChart = (element, data, callback) => {
	const values = ["运行中", "出错", "暂停", "运行完成"]
	data.forEach((obj) => {
		obj.range = [obj.startTime, obj.endTime]
		obj.status = values[obj.status]
	})

	ganttChart = new Chart({
		container: element,
		autoFit: true,
	})

	ganttChart.data(data)

	ganttChart.coordinate().transpose()

	ganttChart.scale("range", {
		type: "time",
		nice: true,
	})

	ganttChart.tooltip({
		showMarkers: false,
	})
	ganttChart.interaction("element-single-selected")
	ganttChart.on("interval:click", (ev) => {
		const intervalElement = ev.target.get("element")
		const data = intervalElement.getModel().data // 单条数据
		callback(data)
	})

	ganttChart
		.interval()
		.position("task*range")
		.color("status", ["#2FC25B", "blue", "yellow", "#F04864"])
		.animate({
			appear: {
				animation: "scale-in-x",
			},
		})

	ganttChart.render()
}
//创建波形图
const createLineChart = (element, data, callback) => {
	lineChart = new Chart({
		container: element,
		autoFit: true,
	})

	lineChart.data(data)
	lineChart.scale({
		year: {
			range: [0, 1],
		},
		value: {
			min: 0,
			nice: true,
		},
	})


	lineChart
		.line()
		.position("year*value")
		.label("value")
	lineChart.point().position("year*value")
	if (callback) {
		lineChart.on("point:click", (ev) => {
			const intervalElement = ev.target.get("element")
			const data = intervalElement.getModel().data // 单条数据
			callback(data)
		})
	}
	lineChart.render()
}
//创建散点图
const createScatterChart = (element, data, callback) => {
	scatterChart = new Chart({
		container: element,
		autoFit: true,
		height: 500,
	})

	// 数据格式： [{"gender":"female","height":161.2,"weight":51.6}]
	scatterChart.data(data)
	scatterChart.scale({
		height: { nice: true },
		weight: { nice: true },
	})
	scatterChart.tooltip({
		showTitle: false,
		showCrosshairs: true,
		crosshairs: {
			type: "xy",
		},
		itemTpl:
			'<li class="g2-tooltip-list-item" data-index={index} style="margin-bottom:4px;">' +
			'<span style="background-color:{color};" class="g2-tooltip-marker"></span>' +
			"{name}<br/>" +
			"{value}" +
			"</li>",
	})
	scatterChart
		.point()
		.position("height*weight")
		.color("gender")
		.shape("circle")
		.tooltip("gender*height*weight", (gender, height, weight) => {
			return {
				name: gender,
				value: height + "(cm), " + weight + "(kg)",
			}
		})
		.style({
			fillOpacity: 0.85,
        })
    scatterChart.axis('year',{
        tickLine:false
    })
	scatterChart.interaction("legend-highlight")
	scatterChart.render()
}

//回收创建的，重置图表为Null
const destoryGanttChart = () => {
	if (ganttChart != null) {
		ganttChart.destroy()
		ganttChart = null
	}
}

//回收线形图和点图
const destoryLineAndScatter = () => {
	if (lineChart != null) {
		lineChart.destroy()
		lineChart = null
	}
	if (scatterChart != null) {
		scatterChart.destroy()
		scatterChart = null
	}
}
//单回收点状图
const destoryScatterChart = () => {
	if (scatterChart != null) {
		scatterChart.destroy()
		scatterChart = null
	}
}
export { createGanttChart, createLineChart, createScatterChart }
export { destoryGanttChart, destoryLineAndScatter ,destoryScatterChart}
