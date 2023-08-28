/*
 * @Author: zjd
 * @Date: 2023-02-13 10:41:09
 * @LastEditors: zjd
 * @LastEditTime: 2023-04-12 13:49:50
 * @Description:
 */
/* GlobalState */
export interface GlobalState {
	token: string
	refreshToken: string
	expirationTimestamp: string
	userInfo: any
	assemblySize: AssemblySizeType
	themeConfig: ThemeConfigProps
}

/* themeConfigProp */
export interface ThemeConfigProps {
	maximize: boolean
	primary: string
	isCollapse: boolean
	breadcrumb: boolean
	breadcrumbIcon: boolean
	tabs: boolean
	tabsIcon: boolean
}

export type AssemblySizeType = 'default' | 'small' | 'large'

/* tabsMenuProps */
export interface TabsMenuProps {
	icon: string
	title: string
	path: string
	name: string
	close: boolean
}

/* TabsState */
export interface TabsState {
	tabsMenuList: TabsMenuProps[]
}

/* AuthState */
export interface AuthState {
	routeName: string
	authButtonList: {
		[key: string]: string[]
	}
	authMenuList: Menu.MenuOptions[]
}

/* keepAliveState */
export interface keepAliveState {
	keepAliveName: string[]
}
