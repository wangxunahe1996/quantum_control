<template>
	<a-config-provider :locale="locale">
		<div id="app">
			<router-view />
		</div>
	</a-config-provider>
</template>
<script>
import enUS from "ant-design-vue/lib/locale-provider/en_US"
export default {
	data() {
		return {
			locale: enUS,
		}
	},
}
</script>
<style lang="less">
body,
ol,
ul,
li,
h1,
h2,
h3,
h4,
h5,
h6,
p,
th,
td,
dl,
dd,
form,
fieldset,
legend,
// input,
textarea,
select {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: "Arial Normal", "Arial";
}
input {
	outline: 0;
}
img {
	border: 0;
	vertical-align: top;
}
html,
body {
	height: 100%;
	width: 100%;

	//  font-size: 14px;
	//  overflow: hidden
}
.left {
	float: left;
}
.right {
	float: right;
}
ul {
	margin: 0;
	li {
		list-style: none;
	}
}
#app {
	font-family: "微软雅黑";
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: left;
	color: #2c3e50;
	height: 100%;
	width: 100%;
}
// ::-webkit-scrollbar {
// 	/*滚动条整体样式*/
// 	width: 4px;
// 	/*高宽分别对应横竖滚动条的尺寸*/
// 	height: 4px;
// }

// ::-webkit-scrollbar-thumb {
// 	/*滚动条里面小方块*/
// 	border-radius: 5px;
// 	-webkit-box-shadow: inset 0 0 5px @GREEN;
// 	background: @GREEN;
// }

// ::-webkit-scrollbar-track {
// 	/*滚动条里面轨道*/
// 	-webkit-box-shadow: inset 0 0 5px #fff;
// 	border-radius: 0;
// 	background: #fff;
// }
</style>
