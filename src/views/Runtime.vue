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
			<div id="topDiv">
				<div id="ganttDiv"></div>
			</div>
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
				<div id="rightScatterDiv" v-if="isRightScatterShow">
					<a-button type="primary" @click="selectTracksBottom" class="configSelect">
						select
					</a-button>
					<div class="selectConfigDiv" v-if="selectDivBottom">
						<p class="title">Slelect Traces</p>
						<a-radio-group v-model="trackValueBottom" @change="trackChangeBottom">
							<a-radio :style="radioStyle" :value="1">
								Option A
							</a-radio>
							<a-radio :style="radioStyle" :value="2">
								Option B
							</a-radio>
							<a-radio :style="radioStyle" :value="3">
								Option C
							</a-radio>
							<a-radio :style="radioStyle" :value="3">
								Option C
							</a-radio>
							<a-radio :style="radioStyle" :value="3">
								Option C
							</a-radio>
						</a-radio-group>
						<div class="btnGroup">
							<a-button type="primary" size="small" @click="submitTracksBottom">
								OK
							</a-button>
							<a-button type="primary" size="small" @click="cancelTracksBottom">
								CANCEL
							</a-button>
						</div>
					</div>
					<div id="rightChartDiv"></div>
				</div>
			</div>
		</div>
		<div class="rightDiv" v-if="titleName == ''">
			<div id="tipDiv">
				<p>Please select an experiment</p>
			</div>
		</div>
		<!-- 弹出框 -->
		<a-modal :title="modalTitle" :visible="visible" :footer="null" @cancel="handleCancel" width="80%">
			<a-button type="primary" @click="selectTracks" class="configSelect">
				select
			</a-button>
			<div class="selectConfigDiv" v-if="selectDiv">
				<p class="title">Slelect Traces</p>
				<a-radio-group v-model="trackValue" @change="trackChange">
					<a-radio :style="radioStyle" :value="1">
						Option A
					</a-radio>
					<a-radio :style="radioStyle" :value="2">
						Option B
					</a-radio>
					<a-radio :style="radioStyle" :value="3">
						Option C
					</a-radio>
					<a-radio :style="radioStyle" :value="3">
						Option C
					</a-radio>
					<a-radio :style="radioStyle" :value="3">
						Option C
					</a-radio>
				</a-radio-group>
				<div class="btnGroup">
					<a-button type="primary" size="small" @click="submitTracks">
						OK
					</a-button>
					<a-button type="primary" size="small" @click="cancelTracks">
						CANCEL
					</a-button>
				</div>
			</div>
			<div id="g2Chart"></div>
		</a-modal>
	</div>
</template>

<script>
import { createGanttChart, destoryGanttChart } from "../assets/js/g2-module"
import { createScatterChart, createLineChart, createLineChartCallBack, clear } from "../assets/js/echarts-module"
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
			selectDiv: false,
			trackValue: 1,
			selectDivBottom: false,
			trackValueBottom: 1,
			radioStyle: {
				display: "inline-block",
				height: "30px",
				lineHeight: "30px",
			},
		}
	},
	mounted() {},
	methods: {
		//利用回调获取点击数值
		ganttChartCallback(data) {
			this.detail = data
		},
		//线图回调
		lineChartCallback(callbackData) {
			this.isRightScatterShow = true

			const data = [
				[-161.2, 51.6],
				[-161.2, -51.6],
				[161.2, -51.6],
				[161.2, 51.6],
				[-177.8, -74.8],
				[-177.8, 74.8],
				[177.8, -74.8],
				[177.8, 74.8],
			]
			this.$nextTick(() => {
				clear("all")
				createScatterChart("rightChartDiv", data)
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
					{ task: "task11", startTime: "2018-04-19 01:18:15", endTime: "2018-04-19 01:19:20", status: 2 },
					{ task: "task21", startTime: "2018-04-19 02:11:32", endTime: "2018-04-19 02:18:50", status: 3 },
					{ task: "task31", startTime: "2018-04-19 02:18:50", endTime: "2018-04-19 03:16:38", status: 0 },
					{ task: "task41", startTime: "2018-04-19 02:19:48", endTime: "2018-04-19 02:21:57", status: 0 },
					{ task: "task51", startTime: "2018-04-19 03:16:38", endTime: "2018-04-19 03:19:38", status: 1 },
					{ task: "task61", startTime: "2018-04-19 03:19:38", endTime: "2018-04-19 03:27:49", status: 0 },
					{ task: "task71", startTime: "2018-04-19 07:29:37", endTime: "2018-04-19 07:33:01", status: 0 },
					{ task: "task81", startTime: "2018-04-19 03:27:49", endTime: "2018-04-19 04:26:05", status: 0 },
					{ task: "task91", startTime: "2018-04-19 04:26:05", endTime: "2018-04-19 06:06:36", status: 0 },
					{ task: "task101", startTime: "2018-04-20 06:06:36", endTime: "2018-04-20 06:15:15", status: 0 },
					{ task: "task111", startTime: "2018-04-20 03:27:49", endTime: "2018-04-20 03:34:50", status: 0 },
					{ task: "task12", startTime: "2018-04-20 01:18:15", endTime: "2018-04-20 01:19:20", status: 2 },
					{ task: "task22", startTime: "2018-04-20 02:11:32", endTime: "2018-04-20 02:18:50", status: 3 },
					{ task: "task32", startTime: "2018-04-20 02:18:50", endTime: "2018-04-20 03:16:38", status: 0 },
					{ task: "task42", startTime: "2018-04-20 02:19:48", endTime: "2018-04-20 02:21:57", status: 0 },
					{ task: "task52", startTime: "2018-04-20 03:16:38", endTime: "2018-04-20 03:19:38", status: 1 },
					{ task: "task62", startTime: "2018-04-20 03:19:38", endTime: "2018-04-20 03:27:49", status: 0 },
					{ task: "task72", startTime: "2018-04-20 07:29:37", endTime: "2018-04-20 07:33:01", status: 0 },
					{ task: "task82", startTime: "2018-04-20 03:27:49", endTime: "2018-04-20 04:26:05", status: 0 },
					{ task: "task92", startTime: "2018-04-20 04:26:05", endTime: "2018-04-20 06:06:36", status: 0 },
					{ task: "task102", startTime: "2018-04-20 06:06:36", endTime: "2018-04-20 06:15:15", status: 0 },
					{ task: "task112", startTime: "2018-04-20 03:27:49", endTime: "2018-04-20 03:34:50", status: 0 },
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
			const xdata = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
			const ydata = [
				{
					name: "邮件营销",
					type: "line",
					stack: "总量",
					data: [120, 132, 101, 134, 90, 230, 210],
				},
				{
					name: "联盟广告",
					type: "line",
					stack: "总量",
					data: [220, 182, 191, 234, 290, 330, 310],
				},
			]
			this.$nextTick(() => {
				destoryGanttChart()
				clear("createLineChartCallBack")
				createGanttChart("ganttDiv", data, this.ganttChartCallback)
				createLineChartCallBack("leftLineDiv", xdata, ydata, this.lineChartCallback)
			})
		},
		//详情按钮
		showWave() {
			this.modalTitle = "show wave"
			this.visible = true
			const xdata = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
			const ydata = [
				{
					name: "邮件营销",
					type: "line",
					stack: "总量",
					data: [120, 132, 101, 134, 90, 230, 210],
				},
				{
					name: "联盟广告",
					type: "line",
					stack: "总量",
					data: [220, 182, 191, 234, 290, 330, 310],
				},
			]
			this.$nextTick(() => {
				clear("all")
				createLineChart("g2Chart", xdata, ydata)
			})
		},
		//showCailbratedWave
		showCailbratedWave() {
			this.modalTitle = "show cailbreated wave"
			this.visible = true
			const xdata = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
			const ydata = [
				{
					name: "视频广告",
					type: "line",
					stack: "总量",
					data: [120, 132, 101, 134, 90, 230, 210],
				},
				{
					name: "直接访问",
					type: "line",
					stack: "总量",
					data: [220, 182, 191, 234, 290, 330, 310],
				},
			]
			this.$nextTick(() => {
				clear("all")
				createLineChart("g2Chart", xdata, ydata)
			})
		},
		//show return
		showReturn() {
			this.modalTitle = "show return"
			this.visible = true
			const data = [
				[-161.2, 51.6],
				[-161.2, -51.6],
				[161.2, -51.6],
				[161.2, 51.6],
				[-177.8, -74.8],
				[-177.8, 74.8],
				[177.8, -74.8],
				[177.8, 74.8],
			]
			this.$nextTick(() => {
				clear("all")
				createScatterChart("g2Chart", data)
			})
		},
		//关闭弹框
		handleCancel() {
			this.visible = false
		},
		//选择因变量
		trackChange(value) {},
		//选择按钮点击
		selectTracks() {
			this.selectDiv = true
		},
		cancelTracks() {
			this.selectDiv = false
		},
		//下方的点状图选择框
		selectTracksBottom() {
			this.selectDivBottom = true
		},
		//下方的点状选择框
		submitTracksBottom() {
			this.selectDivBottom = false
		},
		cancelTracksBottom() {
			this.selectDivBottom = false
		},
		trackChangeBottom(value) {},
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
			#ganttDiv {
				height: 100%;
				width: 100%;
			}
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
				position: relative;
				.configSelect {
					left: 60px;
				}
				#rightChartDiv {
					width: 100%;
					height: 100%;
				}
			}
			#leftLineDiv {
				margin-right: 1%;
			}
		}
	}
}
#g2Chart {
	width: 100%;
	height: 500px;
}
.configSelect {
	width: 100px;
	position: absolute;
	top: 10px;
	left: 200px;
	z-index: 999;
}
.selectConfigDiv {
	width: 300px;
	min-height: 200px;
	background: #fff;
	position: absolute;
	z-index: 999;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
	padding: 20px;

	.title {
		font-weight: bold;
		font-size: 18px;
		margin-bottom: 5px;
	}
	.btnGroup {
		position: absolute;
		bottom: 10px;
		right: 10px;
		.ant-btn {
			margin-left: 10px;
		}
	}
}
</style>
