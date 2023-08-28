/*
 * @Author: zjd
 * @Date: 2023-02-13 16:08:59
 * @LastEditors: zhangjiadi-gz jdzhang@in-road.com
 * @LastEditTime: 2023-08-22 11:08:05
 * @Description:
 */
import { defineStore, createPinia } from 'pinia'
import { GlobalState, ThemeConfigProps, AssemblySizeType } from './interface'
import { DEFAULT_PRIMARY } from '@/config/config'
import piniaPersistConfig from '@/config/piniaPersist'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { useCookies } from '@vueuse/integrations/useCookies'
import { localGet, localSet, computeTokenExpirationTimestamp } from '@/utils/util'
import { refreshOaaToken } from '@/api/modules/oaa'
// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const GlobalStore = defineStore({
	// id: 必须的，在所有 Store 中唯一
	id: 'GlobalState',
	// state: 返回对象的函数
	state: (): GlobalState => ({
		// token
		token: useCookies().get('token'),
		// refreshToken
		refreshToken: localGet('refreshToken'),
		// userInfo
		userInfo: localGet('userInfo') || {},
		// expirationTimestamp
		expirationTimestamp: localGet('expirationTimestamp'),
		// element组件大小
		assemblySize: 'default',
		// themeConfig
		themeConfig: {
			// 当前页面是否全屏
			maximize: false,
			// 默认 primary 主题颜色
			primary: DEFAULT_PRIMARY,
			// 折叠菜单
			isCollapse: false,
			// 面包屑导航
			breadcrumb: true,
			// 面包屑导航图标
			breadcrumbIcon: true,
			// 标签页
			tabs: true,
			// 标签页图标
			tabsIcon: true
		}
	}),
	getters: {},
	actions: {
		// setToken
		setToken(token: string) {
			this.token = token
		},
		// setRefreshToken
		setRefreshToken(token: string) {
			this.refreshToken = token
			localSet('refreshToken', token)
		},
		// setUserInfo
		setUserInfo(userInfo: any) {
			this.userInfo = userInfo
			localSet('userInfo', userInfo)
		},
		// setThemeConfig
		setThemeConfig(themeConfig: ThemeConfigProps) {
			this.themeConfig = themeConfig
			localSet('themeConfig', themeConfig)
		},
		setExpirationTimestamp(expirationTimestamp: string) {
			this.expirationTimestamp = expirationTimestamp
			localSet('expirationTimestamp', expirationTimestamp)
		},
		refresh() {
			this.setToken('')
			this.setRefreshToken('')
			this.setUserInfo('')
			this.setExpirationTimestamp('')
			this.setThemeConfig('')
		}
	},
	persist: piniaPersistConfig('GlobalState')
})

// piniaPersist(持久化)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export default pinia
