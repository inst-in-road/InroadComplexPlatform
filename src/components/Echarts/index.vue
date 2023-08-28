<!--
 * @Author: zhangjiadi-gz jdzhang@in-road.com
 * @Date: 2023-08-24 16:21:09
 * @LastEditors: zhangjiadi-gz jdzhang@in-road.com
 * @LastEditTime: 2023-08-25 15:05:20
 * @FilePath: \Inroad-Complex-Platform\folding-box\src\components\Echarts\index.vue
 * @Description: 通用echarts组件
-->
<template>
	<div :style="{ height: props.height, width: props.width }" id="chart" ref="chartRef"></div>
</template>

<script lang="ts" setup>
import chartTheme from './index'
import * as echarts from 'echarts'
import { useDebounceFn } from '@vueuse/core'
const chartRef = ref<HTMLElement | null>(null)
const chartInstance = shallowRef()
interface Props {
	options: any
	width?: string
	height?: string
}
const props = withDefaults(defineProps<Props>(), {
	width: '100%',
	height: '100%'
})

const emit = defineEmits(['chart-click'])

const initChart = () => {
	if (!chartRef.value) return
	echarts.registerTheme('vintage', chartTheme)
	chartInstance.value = echarts.init(chartRef.value, 'vintage', {
		renderer: 'canvas'
	})
	chartInstance.value.setOption(props.options)
}

const resize = () => {
	if (!chartInstance.value) return
	chartInstance.value.resize()
}

const debanceResize = useDebounceFn(resize, 500)

const myResizeObserver = ref()
const resizeObserve = () => {
	myResizeObserver.value = new ResizeObserver(debanceResize)
	myResizeObserver.value.observe(chartRef.value as HTMLElement)
}

const initEvent = () => {
	if (!chartInstance.value) return
	chartInstance.value.on('click', (params: any) => {
		emit('chart-click', params)
	})
}

const clearChart = () => {
	if (!chartInstance.value) return
	chartInstance.value.clear()
}
watch(
	() => props.options,
	() => {
		clearChart()
		chartInstance.value?.setOption(props.options)
	},
	{ deep: true }
)
onMounted(() => {
	initChart()
	resizeObserve()
	initEvent()
})
onUnmounted(() => {
	myResizeObserver.value.disconnect()
	chartInstance.value?.dispose()
})
</script>
<style scoped lang="scss"></style>
