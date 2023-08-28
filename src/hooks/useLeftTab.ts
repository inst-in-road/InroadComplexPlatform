// 左侧显隐按钮

export const useLeftTab = () => {
	const leftTab = ref()
	const open = ref<boolean>(false)
	const showLeftTab = () => {
		const display = leftTab.value.style.display
		if (display === 'none') {
			leftTab.value.style.display = 'block'
			open.value = false
		} else {
			leftTab.value.style.display = 'none'
			open.value = true
		}
	}
	return { showLeftTab, open, leftTab }
}
