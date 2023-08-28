<!--
 * @Author: zjd
 * @Date: 2023-02-13 10:41:08
 * @LastEditors: zjd
 * @LastEditTime: 2023-02-23 16:56:29
 * @Description: 
-->
<template>
	<div class="tool-bar-lf">
		<CollapseIcon id="collapseIcon" />
		<Breadcrumb id="breadcrumb" />
	</div>
</template>

<script setup lang="ts">
import CollapseIcon from './components/CollapseIcon.vue'
import Breadcrumb from './components/Breadcrumb.vue'
</script>

<style scoped lang="scss">
.tool-bar-lf {
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
	white-space: nowrap;
}
</style>
