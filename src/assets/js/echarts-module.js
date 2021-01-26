import * as echarts from "echarts/core"
import {
	TitleComponent,
	ToolboxComponent,
	TooltipComponent,
	GridComponent,
	DataZoomComponent,
} from "echarts/components"
import { ScatterChart, LineChart } from "echarts/charts"
import { CanvasRenderer } from "echarts/renderers"
echarts.use([
	TitleComponent,
	ToolboxComponent,
	TooltipComponent,
	GridComponent,
	DataZoomComponent,
	ScatterChart,
	LineChart,
	CanvasRenderer,
])
let scatterChart = null
let lineChart = null
let lineChartCallback = null
let ganttChart = null
const createScatterChart = (element, data) => {
	let chartDom = document.getElementById(element)
	scatterChart = echarts.init(chartDom)
	let option = {
		tooltip: {
			position: "top",
		},
		toolbox: {
			right: 20,
			feature: {
				dataZoom: {},
			},
		},
		grid: {
			right: 70,
			bottom: 70,
		},
		xAxis: [{}],
		yAxis: [{}],
		dataZoom: [
			{
				type: "inside",
			},
			{
				type: "slider",
				showDataShadow: false,
				handleIcon:
					"path://M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
				handleSize: "80%",
			},
			{
				type: "inside",
				orient: "vertical",
			},
			{
				type: "slider",
				orient: "vertical",
				showDataShadow: false,
				handleIcon:
					"path://M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
				handleSize: "80%",
			},
		],
		animation: false,
		series: [
			{
				type: "scatter",
				data: data,
				dimensions: ["x", "y"],
				symbolSize: 3,
				itemStyle: {
					opacity: 0.4,
				},
				blendMode: "source-over",
				large: true,
				largeThreshold: 500,
			},
		],
	}
	scatterChart.setOption(option)
}
const createLineChart = (element, xdata, ydata) => {
	let chartDom = document.getElementById(element)
	lineChart = echarts.init(chartDom)
	let option = {
		xAxis: {
			type: "category",
			data: xdata,
			//数据格式:
			// data: ['邮件营销', '联盟广告']
		},
		tooltip: {
			trigger: "axis",
		},
		yAxis: {
			type: "value",
		},
		dataZoom: [
			{
				type: "inside",
			},
			{
				type: "slider",
				showDataShadow: false,
				handleIcon:
					"path://M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
				handleSize: "80%",
			},
			{
				type: "inside",
				orient: "vertical",
			},
			{
				type: "slider",
				orient: "vertical",
				showDataShadow: false,
				handleIcon:
					"path://M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
				handleSize: "80%",
			},
		],
		series: ydata,
		//数据格式：
		// series: [
		//     {
		//         name: '邮件营销',
		//         type: 'line',
		//         stack: '总量',
		//         data: [120, 132, 101, 134, 90, 230, 210]
		//     },
		//     {
		//         name: '联盟广告',
		//         type: 'line',
		//         stack: '总量',
		//         data: [220, 182, 191, 234, 290, 330, 310]
		//     },

		// ]
	}
	lineChart.setOption(option)
}
const createLineChartCallBack = (element, xdata, ydata, callback) => {
	let chartDom = document.getElementById(element)
	lineChartCallback = echarts.init(chartDom)
	let option = {
		xAxis: {
			type: "category",
			data: xdata,
			//数据格式:
			// data: ['邮件营销', '联盟广告']
		},
		tooltip: {
			trigger: "axis",
		},
		yAxis: {
			type: "value",
		},
		dataZoom: [
			{
				type: "inside",
			},
			{
				type: "slider",
				showDataShadow: false,
				handleIcon:
					"path://M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
				handleSize: "80%",
			},
			{
				type: "inside",
				orient: "vertical",
			},
			{
				type: "slider",
				orient: "vertical",
				showDataShadow: false,
				handleIcon:
					"path://M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
				handleSize: "80%",
			},
		],
		series: ydata,
		//数据格式：
		// series: [
		//     {
		//         name: '邮件营销',
		//         type: 'line',
		//         stack: '总量',
		//         data: [120, 132, 101, 134, 90, 230, 210]
		//     },
		//     {
		//         name: '联盟广告',
		//         type: 'line',
		//         stack: '总量',
		//         data: [220, 182, 191, 234, 290, 330, 310]
		//     },

		// ]
	}
	lineChartCallback.setOption(option)
	if (callback) {
		lineChartCallback.on("click", "series", function(params) {
			callback(params.value)
		})
	}
}
const createGanttChart = (element, ydata, data, callback) => {
	let chartDom = document.getElementById(element)
	ganttChart = echarts.init(chartDom)
	let option = {
		tooltip: {
			trigger: "axis",
			formatter: function(params) {
				var tar
				if (params[1].value !== "-") {
					tar = params[1]
				} else {
					tar = params[0]
				}
				return tar.name + "<br/>" + tar.seriesName + " : " + tar.value
			},
		},
		legend: {
			data: ["运行中", "完成", "失败", "暂停"],
		},
		grid: {
			left: "3%",
			right: "4%",
			bottom: "3%",
			containLabel: true,
		},
		dataZoom: [
			{
				type: "inside",
			},
			{
				type: "slider",
				showDataShadow: false,
				handleIcon:
					"path://M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
				handleSize: "80%",
			},
			{
				type: "inside",
				orient: "vertical",
			},
			{
				type: "slider",
				orient: "vertical",
				showDataShadow: false,
				handleIcon:
					"path://M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
				handleSize: "80%",
			},
		],
		xAxis: {
			type: "value",
		},
		yAxis: {
			type: "category",
			splitLine: { show: false },
			data: ydata,
		},
		series: data,
		//数据结构：//
		// {
		//     name: '生活费',
		//     type: 'bar',
		//     stack: '总量',
		//     label: {
		//         show: true,
		//         position: 'inside'
		//     },
		//     data: [2900, 1200, 300, 200, 900, 300]
		// }
	}
	ganttChart.setOption(option)
}
const clear = (name) => {
	if (name == "scatter" && scatterChart != null) {
		scatterChart.dispose()
		scatterChart = null
	}
	if (name == "line" && lineChart != null) {
		lineChart.dispose()
		lineChart = null
	}
	if (name == "lineChartCallback" && lineChartCallback != null) {
		lineChartCallback.dispose()
		lineChartCallback = null
	}
	if (name == "ganttChart" && ganttChart != null) {
		ganttChart.dispose()
		ganttChart = null
	}
	if (name == "all") {
		if (scatterChart != null) {
			scatterChart.dispose()
			scatterChart = null
		}
		if (lineChart != null) {
			lineChart.dispose()
			lineChart = null
		}
	}
}
export { createScatterChart, createLineChart, createLineChartCallBack, createGanttChart }
export { clear }
