<!--
 * @Author: zjd
 * @Date: 2023-04-13 17:10:53
 * @LastEditors: zhangjiadi-gz jdzhang@in-road.com
 * @LastEditTime: 2023-08-28 10:01:29
 * @Description: 
-->
<template>
	<iframe :src="url" frameborder="0"></iframe>
</template>

<script setup lang="ts" name="iframe">
import { routeRole } from '@/utils/util'
import { AuthStore } from '@/stores/modules/auth'
import { TabsStore } from '@/stores/modules/tabs'
const authStore = AuthStore()
const tabStore = TabsStore()
const fullPath = ref(useRoute().fullPath)
watch(
	fullPath,
	val => {
		if (routeRole(val, authStore.authMenuList)) {
			const router = useRouter()
			router.push('/home/index')
			tabStore.tabsMenuList.pop()
		}
	},
	{
		immediate: true
	}
)
const code = ref(useRoute().query.code)
const url =
	code.value === 'aaa'
		? 'http://'
		: 'http://'
</script>

<style lang="scss" scoped>
iframe {
	width: 100%;
	height: 100%;
}
</style>
