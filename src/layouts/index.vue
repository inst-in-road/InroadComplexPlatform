<!--
 * @Author: zjd
 * @Date: 2023-02-13 10:41:09
 * @LastEditors: zjd
 * @LastEditTime: 2023-02-23 17:04:44
 * @Description: 
-->
<!-- 💥 这里是一次性加载 LayoutComponents -->
<template>
	<component :is="LayoutComponents.vertical" />
</template>

<script setup lang="ts" name="layout">
import { type Component } from 'vue'
import LayoutVertical from './LayoutVertical/index.vue'

const LayoutComponents: { [key: string]: Component } = {
	vertical: LayoutVertical
}
</script>

<style scoped lang="scss">
.layout {
	min-width: 760px;
}
</style>
