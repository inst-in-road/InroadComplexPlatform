import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { showFullScreenLoading, tryHideFullScreenLoading } from '@/config/serviceLoading'
import { ResultData } from '@/api/interface'
import { ResultEnum } from '@/enums/httpEnum'
import { checkStatus } from '@/api/helper/checkStatus'
import { ElMessage } from 'element-plus'
import { GlobalStore } from '@/stores'
import { LOGIN_URL } from '@/config/config'
import router from '@/routers'
import { localGet, localSet, localClear } from '@/utils/util'
// 存储请求的数组
let refreshSubscribers = []

// 当前计时器
let timeId = null

/* 将所有的请求都push到数组中*/
function subscribeTokenRefresh(cb) {
	refreshSubscribers.push(cb)
}

// 数组中的请求得到新的token之后自执行，用新的token去请求数据
function onRrefreshed(token) {
	refreshSubscribers.map(cb => cb(token))
}

const Expiration = 'expirationTimestamp'
function getExpiration() {
	return localGet(Expiration)
}
// 刷新token的过期时间判断
// 如果登录时返回的token过期时间 - 当前时间 < 10分钟，则自动调用刷新toekn接口，刷新token
function isRefreshTokenExpired() {
	// 这是在登录/刷新token时候保存的时间戳（下一次token过期时间戳）
	const expiration = Number(getExpiration())
	if (!expiration) return false
	// 当前时间戳
	const nowDate = new Date().getTime()
	// 计算下次token过期时间与当前时间差，是否小于10分钟
	const timeDiff = parseInt(String((expiration - nowDate) / 1000 / 60))
	console.log('token剩余过期时间', timeDiff + '分钟')
	return timeDiff < 10
}
const config = {
	headers: { 'Content-Type': 'application/json' },
	// baseURL: import.meta.env.VITE_API_URL as string,
	// 设置超时时间（10s）
	timeout: ResultEnum.TIMEOUT as number,
	// 跨域时候允许携带凭证
	withCredentials: true
}
class RequestHttp {
	service: AxiosInstance
	public constructor(config: AxiosRequestConfig) {
		// 实例化axios
		this.service = axios.create(config)
		/**
		 * @description 请求拦截器
		 * 客户端发送请求 -> [请求拦截器] -> 服务器
		 * token校验(JWT) : 接受服务器返回的token,存储到vuex/pinia/本地储存当中
		 */
		this.service.interceptors.request.use(
			async (config: any) => {
				// 打印当前时间
				// console.log('当前时间', new Date().toLocaleString())
				const globalStore = GlobalStore()
				// * 如果当前请求不需要显示 loading,在 api 服务中通过指定的第三个参数: { headers: { noLoading: true } }来控制不显示loading，参见loginApi
				// config.headers!.noLoading || showFullScreenLoading()
				const token = globalStore.token
				if (token) {
					config.headers.Authorization = `Bearer ${token}`
					if (isRefreshTokenExpired() && config.url.indexOf('api/token/refresh') === -1) {
						console.log('refresh', isRefreshTokenExpired())
						if (timeId) clearTimeout(timeId) // 保证token只刷新一次
						timeId = setTimeout(_ => {
							// 发refresh 请求
							globalStore
								.RefreshOaaToken()
								.then(res => {
									config.headers['Authorization'] = `Bearer ${res}`
									onRrefreshed(res)
									/* 执行onRefreshed函数后清空数组中保存的请求*/
									refreshSubscribers = []
								})
								.catch(err => {
									console.log('catch', err)
									globalStore.refresh()
									router.replace(LOGIN_URL)
									ElMessage.info('请重新登录！')
								})
						}, 1000)
						/* 把请求(token)=>{....}都push到一个数组中*/
						const retry = new Promise((resolve, reject) => {
							/* (token) => {...}这个函数就是回调函数*/
							subscribeTokenRefresh(token => {
								config.headers['Authorization'] = `Bearer ${token}`
								/* 将请求挂起*/
								resolve(config)
							})
						})
						return retry
					} else {
						return config
					}
				}
				return config
			},
			(error: AxiosError) => {
				return Promise.reject(error)
			}
		)

		/**
		 * @description 响应拦截器
		 *  服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
		 */
		this.service.interceptors.response.use(
			(response: AxiosResponse) => {
				// 打印当前时间
				// console.log('当前结束时间', new Date().toLocaleString())
				const { data } = response
				const globalStore = GlobalStore()
				// * 在请求结束后，并关闭请求 loading
				tryHideFullScreenLoading()
				// * 登陆失效（code == 401）
				if (data?.error?.code === ResultEnum.OVERDUE) {
					// debugger
					ElMessage.error(data.error.message)
					globalStore.refresh()
					router.replace(LOGIN_URL)
					return Promise.reject(data)
				}
				// * 全局错误信息拦截（防止下载文件得时候返回数据流，没有code，直接报错）
				if (data.IsSuccess === false || data.isSuccess === false) {
					ElMessage.error(data.error.showMessage)
					return data
				}
				// * 成功请求（在页面上除非特殊情况，否则不用在页面处理失败逻辑）
				return data
			},
			(error: AxiosError) => {
				const { response } = error
				const globalStore = GlobalStore()
				if (response?.status === 401) {
					ElMessage.error('登录失效，请重新登录！')
					globalStore.refresh()
					router.replace(LOGIN_URL)
					return Promise.reject(response)
				}
				tryHideFullScreenLoading()
				// 请求超时 && 网络错误单独判断，没有 response
				if (error.message.indexOf('timeout') !== -1) ElMessage.error('请求超时！请您稍后重试')
				if (error.message.indexOf('Network Error') !== -1) ElMessage.error('网络错误！请您稍后重试')
				// 根据响应的错误状态码，做不同的处理
				if (response) checkStatus(response.status)
				// 服务器结果都没有返回(可能服务器错误可能客户端断网)，断网处理:可以跳转到断网页面
				if (!window.navigator.onLine) router.replace('/500')
				return Promise.reject(error)
			}
		)
	}
}

export default new RequestHttp(config)
