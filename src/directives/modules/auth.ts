/*
 * @Author: zjd
 * @Date: 2023-02-13 10:41:08
 * @LastEditors: zjd
 * @LastEditTime: 2023-02-13 11:21:45
 * @Description:
 */
/**
 * v-auth
 * 按钮权限指令
 */
import { AuthStore } from '@/stores/modules/auth'
import type { Directive, DirectiveBinding } from 'vue'

const auth: Directive = {
	mounted(el: HTMLElement, binding: DirectiveBinding) {
		const { value } = binding
		const authStore = AuthStore()
		const currentPageRoles = authStore.authButtonListGet[authStore.routeName] ?? []
		if (value instanceof Array && value.length) {
			const hasPermission = value.every(item => currentPageRoles.includes(item))
			if (!hasPermission) el.remove()
		} else {
			if (!currentPageRoles.includes(value)) el.remove()
		}
	}
}

export default auth
