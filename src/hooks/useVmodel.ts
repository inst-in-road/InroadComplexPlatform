/*
 * @Author: zjd
 * @Date: 2023-03-17 11:22:03
 * @LastEditors: zjd
 * @LastEditTime: 2023-03-17 15:09:40
 * @Description: 处理v-model的hooks 使用包装后的proxy 来绑定数据 自动emit
 */
export const useVmodel = (props, key = 'modelValue') => {
	const vm = getCurrentInstance()
	const _emit = vm?.emit
	const event = `update:${key}`
	const proxy = computed({
		get() {
			return props[key]
		},
		set(v) {
			_emit(event, v)
		}
	})
	return proxy
}
