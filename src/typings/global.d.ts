/*
 * @Author: zjd
 * @Date: 2023-02-13 10:41:09
 * @LastEditors: zjd
 * @LastEditTime: 2023-04-14 16:16:49
 * @Description:
 */
// * Menu
declare namespace Menu {
	interface MenuOptions {
		path: string
		fullPath: string
		name: string
		component?: string | (() => Promise<any>)
		redirect?: string
		meta: MetaProps
		children?: MenuOptions[]
		code: string
	}
	interface MetaProps {
		icon: string
		title: string
		activeMenu?: string
		isLink?: string
		isHide: boolean
		isFull: boolean
		isAffix: boolean
	}
}

// * Vite
declare type Recordable<T = any> = Record<string, T>

declare interface ViteEnv {
	VITE_API_URL: string
	VITE_PORT: number
	VITE_OPEN: boolean
	VITE_GLOB_APP_TITLE: string
	VITE_DROP_CONSOLE: boolean
	VITE_PROXY_URL: string
	VITE_BUILD_GZIP: boolean
	VITE_REPORT: boolean
}
