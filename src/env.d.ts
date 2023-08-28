/*
 * @Author: zjd
 * @Date: 2023-02-08 14:00:33
 * @LastEditors: zjd
 * @LastEditTime: 2023-02-15 18:36:37
 * @Description:
 */
/// <reference types="vite/client" />

declare module '*.vue' {
	import type { DefineComponent } from 'vue'
	// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
	const component: DefineComponent<{}, {}, any>
	export default component
}
