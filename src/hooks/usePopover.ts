// 多元素虚拟触发popover   用法
// <el-table-column align="center" label="分组">
// 	<template #default="scope">
// 		<el-button
// 			:ref="setItemRef"
// 			v-click-outside="onClickOutside"
// 			@click="editGroup(scope.row, scope.$index)"
// 		>
// 			<el-icon><EditPen /></el-icon>
// 		</el-button>
// 	</template>
// </el-table-column>
// <el-popover
// 	:visible="popoverVisible"
// 	ref="popoverRef"
// 	:virtual-ref="buttonRef"
// 	virtual-triggering
// 	trigger="click"
// 	>
// 	内容
// </el-popover>
export const usePopover = () => {
	const refList = ref([])
	const setItemRef = el => {
		if (el) {
			refList.value.push(el)
		}
	}
	const popoverRef = ref()
	const buttonRef = computed(() => {
		return refList.value[num.value]
	})
	const num = ref(0)
	const popoverVisible = ref(false)
	const onClickOutside = e => {
		popoverVisible.value = false
		nextTick(() => {
			unref(popoverRef).popperRef?.delayHide?.()
		})
	}
	return { refList, setItemRef, popoverRef, buttonRef, num, popoverVisible, onClickOutside }
}
