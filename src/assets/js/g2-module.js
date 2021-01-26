import { Chart } from "@antv/g2"
//创建ganttchart
let ganttChart = null
const createGanttChart = (element, data, callback) => {
	const values = ["运行中", "出错", "暂停", "运行完成"]
	data.forEach((obj) => {
		obj.range = [obj.startTime, obj.endTime]
		obj.status = values[obj.status]
	})

	ganttChart = new Chart({
		container: element,
		autoFit: true,
		height: 400,
		limitInPlot: true,
	})
	ganttChart.animate(false)
	ganttChart.data(data)

	ganttChart.coordinate().transpose()

	ganttChart.scale("range", {
		type: "time",
		nice: true,
	})

	ganttChart.tooltip({
		showMarkers: false,
	})
	ganttChart.option("slider", {
		start: 0.1,
		end: 0.8,
		trendCfg: {
			isArea: false,
		},
	})
	ganttChart
		.interval()
		.position("task*range")
		.color("status", ["#2FC25B", "blue", "yellow", "#F04864"])

	ganttChart.interaction("element-single-selected")
	ganttChart.on("interval:click", (ev) => {
		const intervalElement = ev.target.get("element")
		const data = intervalElement.getModel().data // 单条数据
		callback(data)
	})
	ganttChart.interaction("drag-move")
	ganttChart.interaction("view-zoom")
	ganttChart.render()
	ganttChart.getCanvas().on("mousewheel", (ev) => {
		ev.preventDefault()
	})
}

const destoryGanttChart = () => {
	if (ganttChart != null) {
		ganttChart.destroy()
		ganttChart = null
	}
}

export { createGanttChart }
export { destoryGanttChart }
