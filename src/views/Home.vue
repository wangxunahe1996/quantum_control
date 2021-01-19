<template>
	<div id="home">
		<a-layout id="components-layout-demo-top" class="layout">
			<a-layout-header>
				<div class="logo" />
				<a-menu
					theme="dark"
					mode="horizontal"
					:default-selected-keys="defaultSelectedKeys"
					:style="{ lineHeight: '64px' }"
				>
					<a-menu-item key="1"> Config </a-menu-item>
					<a-menu-item key="2"> Hardware </a-menu-item>
					<a-menu-item key="3"> Runtime </a-menu-item>
				</a-menu>
			</a-layout-header>
			<a-layout-content style="padding: 0 20px;min-width:1200px;">
				<router-view></router-view>
			</a-layout-content>
		</a-layout>
	</div>
</template>

<script>
export default {
	name: "Home",
	components: {},
	data() {
		return {
			defaultSelectedKeys: [],
		}
	},
	watch: {},
	computed: {},
	created() {
		this.init()
	},
	mounted() {
		
	},
	methods: {
		init() {
			let path = this.$route.path
			switch (path) {
				case "/home/config":
					this.defaultSelectedKeys = ["1"]
					break
				case "/personCenter/personPassword":
					this.defaultSelectedKeys = ["2"]
					break
				case "/personCenter/personManagement":
					this.defaultSelectedKeys = ["3"]
					break
				default:
					break
			}
		},
	},
}
</script>
<style lang="less" scoped>
#home {
	height: 100%;
	width: 100%;
	#components-layout-demo-top {
		height: 100%;
	}
	/deep/ #components-layout-demo-top .logo {
		width: 120px;
		height: 31px;
		background: rgba(255, 255, 255, 0.2);
		margin: 16px 24px 16px 0;
		float: left;
	}
	/deep/ .ant-layout{
		min-width: 1200px
	}
	/deep/ .ant-layout-content {
		margin-top: 20px;
		height: 100%;
	}
}
</style>
