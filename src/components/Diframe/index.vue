<!--
 * @Author: zjd
 * @Date: 2023-03-27 10:06:55
 * @LastEditors: zjd
 * @LastEditTime: 2023-03-28 18:24:14
 * @Description: 
-->
<template>
	<iframe :src="props.url" frameborder="0" class="iframe" id="iframe"></iframe>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useDebounceFn } from '@vueuse/core'
interface Props {
	url: string
	width: number
	height: number
	bg?: string
}
const props = defineProps<Props>()
const iframe = ref()
onMounted(() => {
	setScale()
	window.addEventListener('resize', setScale)
})
const scale = ref(1)
const getScale = () => {
	// 固定好16：9的宽高比，计算出最合适的缩放比
	const wh = window.innerHeight / props.height
	const ww = window.innerWidth / props.width
	return ww < wh ? ww : wh
}
const setScale = useDebounceFn(async () => {
	// 获取到缩放比例，设置它
	scale.value = getScale()
	console.log(scale.value, 'scale.value')
	await nextTick(() => {
		iframe.value = document.getElementById('iframe')
		if (iframe.value) {
			iframe.value.style.setProperty('transform', `scale(${scale.value})`)
		}
	})
})
</script>
<style lang="scss" scoped>
.iframe {
	width: 1920px;
	height: 1080px;
	background-color: red;
	position: fixed;
	left: 50%;
	top: 50%;
	margin-left: -960px;
	margin-top: -540px;
	transform: scale(1);
}
</style>
