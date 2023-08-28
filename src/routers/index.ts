/*
 * @Author: zjd
 * @Date: 2023-02-13 16:09:16
 * @LastEditors: zhangjiadi-gz jdzhang@in-road.com
 * @LastEditTime: 2023-08-28 10:20:16
 * @Description:
 */
import { createRouter, createWebHashHistory } from 'vue-router'
import { GlobalStore } from '@/stores'
import { AuthStore } from '@/stores/modules/auth'
import { LOGIN_URL, ROUTER_WHITE_LIST } from '@/config/config'
import { initDynamicRouter } from '@/routers/modules/dynamicRouter'
import { staticRouter, errorRouter, noLayoutRouter } from '@/routers/modules/staticRouter'
import NProgress from '@/config/nprogress'
import { localGet, localClear, localSet, routeRole } from '@/utils/util'

/**
 * @description 动态路由参数配置
 * @param path ==> 菜单路径
 * @param name ==> 菜单别名
 * @param redirect ==> 重定向地址
 * @param component ==> 视图文件路径
 * @param meta ==> 菜单信息
 * @param meta.icon ==> 菜单图标
 * @param meta.title ==> 菜单标题
 * @param meta.activeMenu ==> 当前路由为详情页时，需要高亮的菜单
 * @param meta.isLink ==> 是否外链
 * @param meta.isHide ==> 是否隐藏
 * @param meta.isFull ==> 是否全屏(示例：数据大屏页面)
 * @param meta.isAffix ==> 是否固定在 tabs nav
 * */
let router = null
let routes = [...staticRouter, ...errorRouter]
let noLayoutRoute = [...noLayoutRouter, ...errorRouter]
if (window.__POWERED_BY_WUJIE__ || window.self !== window.top) {
	console.log('无界嵌入或iframe嵌入')
	router = createRouter({
		history: createWebHashHistory(),
		routes: noLayoutRoute,
		strict: false,
		scrollBehavior: () => ({ left: 0, top: 0 })
	})
} else {
	router = createRouter({
		history: createWebHashHistory(),
		routes: routes,
		strict: false,
		scrollBehavior: () => ({ left: 0, top: 0 })
	})
}
/**
 * @description 路由拦截 beforeEach
 * */
router.beforeEach(async (to, from, next) => {
	const globalStore = GlobalStore()
	// 1.NProgress 开始
	NProgress.start()
	// 2.动态设置标题
	const title = import.meta.env.VITE_GLOB_APP_TITLE
	document.title = to.meta.title ? `${to.meta.title} - ${title}` : title
	// console.log(to.path, 'to.path', from.fullPath, 'from.fullPath')
	// 3.判断是访问登陆页，有 Token 就在当前页面，没有 Token 重置路由并放行到登陆页
	if (to.path === LOGIN_URL) {
		if (globalStore.token) return next(from.fullPath)
		localClear()
		resetRouter()
		return next()
	}
	// 4.判断访问页面是否在路由白名单地址中，如果存在直接放行
	console.log(to.path, 'to.path')
	if (ROUTER_WHITE_LIST.includes(to.path)) return next()
	// 5.判断是否有 Token，没有重定向到 login
	// if (!globalStore.token) {
	// 	return next({ path: LOGIN_URL, replace: true })
	// }
	// 6.如果没有菜单列表，就重新请求菜单列表并添加动态路由
	const authStore = AuthStore()
	authStore.setRouteName(to.name as string)
	if (!authStore.authMenuListGet.length) {
		await initDynamicRouter()
		return next({ ...to, replace: true })
	}
	// if (routeRole(to.fullPath, authStore.authMenuList)) {
	// 	console.log('无权限')
	// 	return next({ ...from, replace: true })
	// }
	// 7.正常访问页面
	next()
})

/**
 * @description 重置路由
 * */
export const resetRouter = () => {
	const authStore = AuthStore()
	authStore.flatMenuListGet.forEach(route => {
		const { name } = route
		if (name && router.hasRoute(name)) router.removeRoute(name)
	})
}

/**
 * @description 路由跳转结束
 * */
router.afterEach(() => {
	NProgress.done()
})

/**
 * @description 路由跳转错误
 * */
router.onError(error => {
	NProgress.done()
	console.warn('路由错误', error.message)
})

export default router
