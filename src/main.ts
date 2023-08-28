/*
 * @Author: zjd
 * @Date: 2023-02-13 10:41:09
 * @LastEditors: zhangjiadi-gz jdzhang@in-road.com
 * @LastEditTime: 2023-08-24 16:46:23
 * @Description:
 */
import { createApp } from 'vue'
import App from './App.vue'
// reset style sheet
import '@/styles/reset.scss'
// CSS common style sheet
import '@/styles/common.scss'
// iconfont css
import '@/assets/iconfont/iconfont.scss'
// font css
// import '@/assets/fonts/font.scss'
// element plus
import ElementPlus from 'element-plus'
// element icons
import * as Icons from '@element-plus/icons-vue'
// element css
import 'element-plus/dist/index.css'
// element dark(内置暗黑模式)
import 'element-plus/theme-chalk/dark/css-vars.css'
// custom element dark(自定义暗黑模式)
import '@/styles/theme/element-dark.scss'
// custom element css
import '@/styles/element.scss'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// custom directives
import directives from '@/directives/index'
// vue Router
import router from '@/routers/index'
// pinia store
import pinia from '@/stores/index'
// svg icons
import 'virtual:svg-icons-register'
// errorHandler
import errorHandler from '@/utils/errorHandler'

import WujieVue from 'wujie-vue3'

const app = createApp(App)

// app.config.errorHandler = errorHandler

// 注册element Icons组件
Object.keys(Icons).forEach(key => {
	app.component(key, Icons[key as keyof typeof Icons])
})

if (window.__POWERED_BY_WUJIE__) {
	document.documentElement.classList.add('isFromIframe')
}

app.use(router).use(pinia).use(directives).use(ElementPlus, { locale: zhCn }).use(WujieVue).mount('#app')
