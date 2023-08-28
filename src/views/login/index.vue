<!--
 * @Author: zjd
 * @Date: 2023-02-13 16:06:32
 * @LastEditors: zhangjiadi-gz jdzhang@in-road.com
 * @LastEditTime: 2023-08-28 10:18:56
 * @Description: 
-->
<template>
	<div class="login-container flx-center">
		<div class="login-box">
			<div class="login-form">
				<div class="login-logo">
					<h2 class="logo-text">络盒</h2>
				</div>
				<LoginForm />
			</div>
		</div>
		<div class="footer">
			<span>推荐使用最新版本</span>
			<i class="fa fa-chrome" style="font-size: 16px" />
			<span>谷歌Chrome浏览器</span>
		</div>
	</div>
</template>

<script setup lang="ts" name="login">
import LoginForm from './components/LoginForm.vue'
</script>

<style scoped lang="scss">
.footer {
	position: fixed;
	right: 31px;
	bottom: 33px;
	height: 11px;
	opacity: 1;
	font-size: 12px;
	color: rgba(255, 255, 255, 0.51);
	line-height: 17px;
	letter-spacing: 1px;
	text-align: right;
	a {
		text-decoration: underline;
		padding-right: 20px;
		color: #b0b0c2;
	}
}
.login-container {
	position: relative;
	min-width: 520px;
	height: 100%;
	min-height: 520px;
	background: linear-gradient(rgba(47, 71, 146, 0.3), rgba(47, 71, 146, 0.3)),
		url('https://filesnew.in-road.com/inroadfiles/demo/attachfiles/20211126/6377354052396021685692365.jpeg') center center / cover
			no-repeat;
	.dark {
		position: absolute;
		top: 4.5%;
		right: 3.2%;
	}
	.login-box {
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-around;
		border-radius: 10px;
		.login-form {
			width: 420px;
			padding: 50px 40px 45px;
			background-color: #ffffff;
			border-radius: 10px;
			box-shadow: 2px 3px 7px rgb(0 0 0 / 20%);
			.login-logo {
				display: flex;
				align-items: center;
				justify-content: center;
				margin-bottom: 45px;
				.login-icon {
					width: 60px;
					height: 60px;
				}
				.logo-text {
					padding: 0 0 0 25px;
					margin: 0;
					font-size: 42px;
					font-weight: bold;
					color: #34495e;
					white-space: nowrap;
				}
			}
			.el-form-item {
				margin-bottom: 40px;
			}
		}
	}
}

@media screen and (max-width: 1100px) {
	.login-left {
		display: none;
	}
}
</style>
