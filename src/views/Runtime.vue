<template>
	<div id="Runtime" class="main">
		<div class="leftDiv">
			<a-menu style="width: 100%;border:0;" mode="inline" @click="handleClick">
				<a-menu-item v-for="(item, index) in menuList" :key="index" :value="item.id">
					{{ item.name }}——{{ item.state }}
				</a-menu-item>
			</a-menu>
		</div>
		<div class="rightDiv" v-if="titleName != ''">
			<div id="titleDiv">
				<p>{{ titleName }}</p>
				<div class="btnGroup">
					<a-button type="primary" size="small">
						Pause
					</a-button>
					<a-button type="primary" size="small">
						stop
					</a-button>
					<a-button type="primary" size="small">
						start
					</a-button>
				</div>
			</div>
			<!-- 第一个图表 -->
			<div id="topDiv"></div>
			<div id="midDiv">
				<div v-if="detail == null">
					<span>
						Please select a sequence
					</span>
				</div>
				<div v-if="detail != null">
					<span class="itemDetail" v-for="(value, key, index) in detail" :key="index">
						<span>{{ key }}:</span>
						<span>{{ value }}</span>
					</span>
					<div class="btnGroup">
						<a-button type="primary" size="small" @click="showWave">
							show wave
						</a-button>
						<a-button type="primary" size="small" @click="showCailbratedWave">
							show calibrated wave
						</a-button>
						<a-button type="primary" size="small" @click="showReturn">
							show return
						</a-button>
					</div>
				</div>
			</div>
			<div id="bottomDiv">
				<div id="leftLineDiv"></div>
				<div id="rightScatterDiv" v-if="isRightScatterShow"></div>
			</div>
		</div>
		<div class="rightDiv" v-if="titleName == ''">
			<div id="tipDiv">
				<p>Please select an experiment</p>
			</div>
		</div>
		<!-- 弹出框 -->
		<a-modal :title="modalTitle" :visible="visible" :footer="null" @cancel="handleCancel" width="50%">
			<div id="g2Chart"></div>
		</a-modal>
	</div>
</template>

<script>
import {
	createGanttChart,
	createLineChart,
	createScatterChart,
	destoryGanttChart,
	destoryLineAndScatter,
	destoryScatterChart,
} from "../assets/js/g2-module"
export default {
	data() {
		return {
			selectedKeys: ["0"],
			menuList: [
				{
					id: "1",
					name: "a test",
					state: "runtime",
				},
				{
					id: "2",
					name: "a test",
					state: "stop",
				},
			],
			titleName: "",
			detail: null,
			modalTitle: "",
			visible: false,
			isRightScatterShow: false,
		}
	},
	mounted() {},
	methods: {
		//利用回调获取点击数值
		ganttChartCallback(data) {
			this.detail = data
		},
		//线图回调
		lineChartCallback(data) {
			// console.log(data)
			this.isRightScatterShow = true
			const scatterChartdata = [
				{ gender: "female", height: -161.2, weight: 51.6 },
				{ gender: "female", height: -161.2, weight: -51.6 },
				{ gender: "female", height: 161.2, weight: -51.6 },
				{ gender: "female", height: 161.2, weight: 51.6 },

				{ gender: "male", height: -177.8, weight: -74.8 },
				{ gender: "male", height: -177.8, weight: 74.8 },
				{ gender: "male", height: 177.8, weight: -74.8 },
				{ gender: "male", height: 177.8, weight: 74.8 },
			]
			this.$nextTick(() => {
				destoryScatterChart()
				createScatterChart("rightScatterDiv",scatterChartdata)
			})
		},
		//选择实验
		handleClick(e) {
			let nowTest = this.menuList.filter((item) => item.id == e.item.value)[0]
			this.titleName = `${nowTest.name}——${nowTest.state}`
			this.detail = null
			let data, lineData
			if (e.item.value == "1") {
				data = [
					{ task: "task0", startTime: "2018-04-18 01:17:12", endTime: "2018-04-18 01:19:10", status: 0 },
					{ task: "task1", startTime: "2018-04-18 01:18:15", endTime: "2018-04-18 01:19:20", status: 2 },
					{ task: "task2", startTime: "2018-04-18 02:11:32", endTime: "2018-04-18 02:18:50", status: 3 },
					{ task: "task3", startTime: "2018-04-18 02:18:50", endTime: "2018-04-18 03:16:38", status: 0 },
					{ task: "task4", startTime: "2018-04-18 02:19:48", endTime: "2018-04-18 02:21:57", status: 0 },
					{ task: "task5", startTime: "2018-04-18 03:16:38", endTime: "2018-04-18 03:19:38", status: 1 },
					{ task: "task6", startTime: "2018-04-18 03:19:38", endTime: "2018-04-18 03:27:49", status: 0 },
					{ task: "task7", startTime: "2018-04-18 07:29:37", endTime: "2018-04-18 07:33:01", status: 0 },
					{ task: "task8", startTime: "2018-04-18 03:27:49", endTime: "2018-04-18 04:26:05", status: 0 },
					{ task: "task9", startTime: "2018-04-18 04:26:05", endTime: "2018-04-18 06:06:36", status: 0 },
					{ task: "task10", startTime: "2018-04-18 06:06:36", endTime: "2018-04-18 06:15:15", status: 0 },
					{ task: "task11", startTime: "2018-04-18 03:27:49", endTime: "2018-04-18 03:34:50", status: 0 },
				]
				lineData = [
					{ year: "1991", value: 3 },
					{ year: "1992", value: 4 },
					{ year: "1993", value: 3.5 },
					{ year: "1994", value: 5 },
					{ year: "1995", value: 4.9 },
					{ year: "1996", value: 6 },
					{ year: "1997", value: 7 },
					{ year: "1998", value: 9 },
					{ year: "1999", value: 13 },
				]
			} else {
				data = [
					{ task: "task0", startTime: "2018-04-18 01:17:12", endTime: "2018-04-18 01:19:10", status: 1 },
					{ task: "task1", startTime: "2018-04-18 01:18:15", endTime: "2018-04-18 01:19:20", status: 1 },
					{ task: "task2", startTime: "2018-04-18 02:11:32", endTime: "2018-04-18 02:18:50", status: 1 },
					{ task: "task3", startTime: "2018-04-18 02:18:50", endTime: "2018-04-18 03:16:38", status: 1 },
					{ task: "task4", startTime: "2018-04-18 02:19:48", endTime: "2018-04-18 02:21:57", status: 1 },
					{ task: "task5", startTime: "2018-04-18 03:16:38", endTime: "2018-04-18 03:19:38", status: 1 },
					{ task: "task6", startTime: "2018-04-18 03:19:38", endTime: "2018-04-18 03:27:49", status: 0 },
					{ task: "task7", startTime: "2018-04-18 07:29:37", endTime: "2018-04-18 07:33:01", status: 0 },
					{ task: "task8", startTime: "2018-04-18 03:27:49", endTime: "2018-04-18 04:26:05", status: 0 },
					{ task: "task9", startTime: "2018-04-18 04:26:05", endTime: "2018-04-18 06:06:36", status: 0 },
					{ task: "task10", startTime: "2018-04-18 06:06:36", endTime: "2018-04-18 06:15:15", status: 0 },
					{ task: "task11", startTime: "2018-04-18 03:27:49", endTime: "2018-04-18 03:34:50", status: 0 },
				]
			}
			this.$nextTick(() => {
				destoryGanttChart()
				destoryLineAndScatter()
				createGanttChart("topDiv", data, this.ganttChartCallback)
				createLineChart("leftLineDiv", lineData, this.lineChartCallback)
			})
		},
		//详情按钮
		showWave() {
			this.modalTitle = "show wave"
			this.visible = true
			const data = [
				{ year: "1991", value: 3 },
				{ year: "1992", value: 4 },
				{ year: "1993", value: 3.5 },
				{ year: "1994", value: 5 },
				{ year: "1995", value: 4.9 },
				{ year: "1996", value: 6 },
				{ year: "1997", value: 7 },
				{ year: "1998", value: 9 },
				{ year: "1999", value: 13 },
			]
			this.$nextTick(() => {
				destoryLineAndScatter()
				createLineChart("g2Chart", data)
			})
		},
		//showCailbratedWave
		showCailbratedWave() {
			this.modalTitle = "show cailbreated wave"
			this.visible = true
			const data = [
				{ year: "1991", value: 11 },
				{ year: "1992", value: 41 },
				{ year: "1993", value: 3.5 },
				{ year: "1994", value: 5 },
				{ year: "1995", value: 4.9 },
				{ year: "1996", value: 6 },
				{ year: "1997", value: 7 },
				{ year: "1998", value: 9 },
				{ year: "1999", value: 13 },
			]
			this.$nextTick(() => {
				destoryLineAndScatter()
				createLineChart("g2Chart", data)
			})
		},
		//show return
		showReturn() {
			this.modalTitle = "show return"
			this.visible = true
			const data = [
				{ gender: "female", height: -161.2, weight: 51.6 },
				{ gender: "female", height: -161.2, weight: -51.6 },
				{ gender: "female", height: 161.2, weight: -51.6 },
				{ gender: "female", height: 161.2, weight: 51.6 },

				{ gender: "male", height: -177.8, weight: -74.8 },
				{ gender: "male", height: -177.8, weight: 74.8 },
				{ gender: "male", height: 177.8, weight: -74.8 },
				{ gender: "male", height: 177.8, weight: 74.8 },
			]
			this.$nextTick(() => {
				destoryLineAndScatter()
				createScatterChart("g2Chart", data)
			})
		},
		//关闭弹框
		handleCancel() {
			this.visible = false
		},
	},
}
</script>
<style lang="less" scoped>
@import url("../assets/css/common.less");
#Runtime {
	.rightDiv {
		#tipDiv {
			width: 100%;
			height: 100%;
			text-align: center;
			p {
				font-size: 30px;
			}
		}
		#titleDiv {
			height: 10%;
			position: relative;
			.btnGroup {
				position: absolute;
				right: 0;
				top: 0;

				.ant-btn {
					margin-left: 10px;
				}
			}
		}
		#topDiv {
			width: 100%;
			height: 30%;
		}
		#midDiv {
			width: 100%;
			height: 30%;
			max-height: 30%;
			overflow: auto;
			border-top: 1px solid #ccc;
			border-bottom: 1px solid #ccc;
			position: relative;
			.itemDetail {
				display: inline-block;
				width: 30%;
				height: 10%;
				// background: red;
				padding: 0 5px;
				span {
					user-select: none;
					display: inline-block;
					&:nth-of-type(1) {
						margin-right: 2px;
					}
				}
			}
			.btnGroup {
				position: absolute;
				bottom: 10px;
				text-align: center;
				.ant-btn {
					margin-right: 10px;
				}
			}
		}
		#bottomDiv {
			height: 30%;
			display: flex;
			#leftLineDiv,
			#rightScatterDiv {
				width: 50%;
			}
			#leftLineDiv {
				margin-right: 1%;
			}
		}
	}
}
#g2Chart {
	width: 100%;
	height: 300px;
}
</style>
