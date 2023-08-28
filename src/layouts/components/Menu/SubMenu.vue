<!--
 * @Author: zjd
 * @Date: 2023-02-13 10:41:09
 * @LastEditors: zhangjiadi-gz jdzhang@in-road.com
 * @LastEditTime: 2023-08-28 10:21:53
 * @Description: 
-->
<template>
	<template v-for="subItem in menuList" :key="subItem.fullPath ? subItem.fullPath : subItem.path">
		<el-sub-menu
			v-if="subItem.children && subItem.children.length > 0"
			:index="subItem.fullPath ? subItem.fullPath : subItem.path"
		>
			<template #title>
				<el-icon>
					<component :is="subItem.meta.icon"></component>
				</el-icon>
				<span>{{ subItem.meta.title }}</span>
			</template>
			<SubMenu :menuList="subItem.children" />
		</el-sub-menu>
		<el-menu-item v-else :index="subItem.fullPath ? subItem.fullPath : subItem.path" @click="handleClickMenu(subItem)">
			<el-icon>
				<component :is="subItem.meta.icon"></component>
			</el-icon>
			<template #title>
				<span>{{ subItem.meta.title }}</span>
			</template>
		</el-menu-item>
	</template>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const props = defineProps<{ menuList: Menu.MenuOptions[] }>()
// console.log(props.menuList, 'menuList')
const router = useRouter()
const handleClickMenu = (subItem: Menu.MenuOptions) => {
	if (subItem.meta.isLink) return window.open(subItem.meta.isLink, '_blank')
	// 动态传递参数
	router.push(subItem.fullPath ? subItem.fullPath : subItem.path)
}
</script>
