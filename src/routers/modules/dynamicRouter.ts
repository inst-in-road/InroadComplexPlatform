/*
 * @Author: zjd
 * @Date: 2023-02-13 10:41:09
 * @LastEditors: zjd
 * @LastEditTime: 2023-04-17 17:27:52
 * @Description:
 */
import router from '@/routers/index'
import { isType } from '@/utils/util'
import { LOGIN_URL } from '@/config/config'
import { ElNotification } from 'element-plus'
import { GlobalStore } from '@/stores'
import { AuthStore } from '@/stores/modules/auth'
import { notFoundRouter } from '@/routers/modules/staticRouter'

// 引入 views 文件夹下所有 vue 文件
const modules = import.meta.glob('@/views/**/*.vue')

/**
 * 初始化动态路由
 */
export const initDynamicRouter = async () => {
	const authStore = AuthStore()
	const globalStore = GlobalStore()
	try {
		// 1.获取菜单列表权限
		await authStore.getAuthMenuList()

		// 2.判断当前用户有没有菜单权限
		if (!authStore.authMenuListGet.length) {
			ElNotification({
				title: '无权限访问',
				message: '当前账号无任何菜单权限，请联系系统管理员！',
				type: 'warning',
				duration: 3000
			})
			globalStore.setToken('')
			router.replace(LOGIN_URL)
			return Promise.reject('No permission')
		}
		// 3.添加动态路由
		authStore.flatMenuListGet.forEach((item: any) => {
			item.children && delete item.children
			if (item.component && isType(item.component) == 'string') {
				item.component = modules['/src/views' + item.component + '.vue']
			}
			if (item.meta.isFull) {
				router.addRoute(item)
			} else {
				router.addRoute('layout', item)
			}
		})
		// 4.最后添加 notFoundRouter
		router.addRoute(notFoundRouter)
	} catch (error) {
		globalStore.setToken('')
		router.replace(LOGIN_URL)
		return Promise.reject(error)
	}
}
