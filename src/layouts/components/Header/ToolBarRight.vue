<!--
 * @Author: zjd
 * @Date: 2023-02-13 10:41:09
 * @LastEditors: zjd
 * @LastEditTime: 2023-04-11 16:12:17
 * @Description: 
-->
<template>
	<div class="tool-bar-ri">
		<div class="header-icon">
			<SearchMenu id="searchMenu" />
			<Fullscreen id="fullscreen" />
		</div>
		<span class="username">{{ localGet('userInfo')?.username || 'Root' }}</span>
		<Avatar />
	</div>
</template>

<script setup lang="ts">
import SearchMenu from './components/SearchMenu.vue'
import Fullscreen from './components/Fullscreen.vue'
import Avatar from './components/Avatar.vue'
import { localGet } from '@/utils/util'
</script>

<style scoped lang="scss">
.tool-bar-ri {
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0 30px 0 0;
	.header-icon {
		display: flex;
		align-items: center;
		& > * {
			margin-left: 21px;
		}
	}
	.username {
		margin-left: 20px;
		margin-right: 20px;
		font-size: 15px;
	}
}
</style>
