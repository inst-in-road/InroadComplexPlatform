<!--
 * @Author: zjd
 * @Date: 2023-02-13 10:41:09
 * @LastEditors: zjd
 * @LastEditTime: 2023-04-17 13:34:11
 * @Description: 
-->
<template>
	<Tabs />
	<el-main>
		<router-view v-slot="{ Component, route }">
			<component :is="Component" :key="route.fullPath || route.path" v-if="isRouterShow" />
		</router-view>
	</el-main>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeUnmount, provide, watch } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import { GlobalStore } from '@/stores'
import Tabs from '@/layouts/components/Tabs/index.vue'

const globalStore = GlobalStore()
const themeConfig = computed(() => globalStore.themeConfig)
const isCollapse = computed(() => globalStore.themeConfig.isCollapse)

// 刷新当前页面
const isRouterShow = ref(true)
const refreshCurrentPage = (val: boolean) => (isRouterShow.value = val)
provide('refresh', refreshCurrentPage)

// 监听当前页是否最大化，动态添加 class
watch(
	() => themeConfig.value.maximize,
	() => {
		const app = document.getElementById('app') as HTMLElement
		if (themeConfig.value.maximize) app.classList.add('main-maximize')
		else app.classList.remove('main-maximize')
	},
	{ immediate: true }
)

// 监听窗口大小变化，折叠侧边栏
const screenWidth = ref(0)
const listeningWindow = useDebounceFn(() => {
	screenWidth.value = document.body.clientWidth
	if (!isCollapse.value && screenWidth.value < 1200) globalStore.setThemeConfig({ ...themeConfig.value, isCollapse: true })
	if (isCollapse.value && screenWidth.value > 1200) globalStore.setThemeConfig({ ...themeConfig.value, isCollapse: false })
}, 100)
window.addEventListener('resize', listeningWindow, false)
onBeforeUnmount(() => {
	window.removeEventListener('resize', listeningWindow)
})
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
