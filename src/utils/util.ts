/*
 * @Author: zhangjiadi-gz jdzhang@in-road.com
 * @Date: 2023-02-23 18:05:11
 * @LastEditors: zhangjiadi-gz jdzhang@in-road.com
 * @LastEditTime: 2023-08-17 15:18:40
 * @FilePath: \Inroad-Complex-Platform\folding-box\src\utils\util.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { isArray } from '@/utils/is'
/**
 * @description: 计算oaaToken过期时间戳
 * @param {Number} expirationDate 登录/刷新oaaToken成功，后台返回的有效时间，单位为秒
 * @return {Number} newExpirationTimestamp oaaToken到期时间戳
 */
export function computeTokenExpirationTimestamp(expirationDate) {
	return expirationDate * 1000 + new Date().getTime()
}
/**
 * @description 获取localStorage
 * @param {String} key Storage名称
 * @return string
 */
export function localGet(key: string) {
	const value = window.localStorage.getItem(key)
	try {
		return JSON.parse(window.localStorage.getItem(key) as string)
	} catch (error) {
		return value
	}
}

/**
 * @description 存储localStorage
 * @param {String} key Storage名称
 * @param {Any} value Storage值
 * @return void
 */
export function localSet(key: string, value: any) {
	window.localStorage.setItem(key, value)
}

/**
 * @description 清除localStorage
 * @param {String} key Storage名称
 * @return void
 */
export function localRemove(key: string) {
	window.localStorage.removeItem(key)
}

/**
 * @description 清除所有localStorage
 * @return void
 */
export function localClear() {
	window.localStorage.clear()
}

/**
 * @description 判断数据类型
 * @param {Any} val 需要判断类型的数据
 * @return string
 */
export function isType(val: any) {
	if (val === null) return 'null'
	if (typeof val !== 'object') return typeof val
	else return Object.prototype.toString.call(val).slice(8, -1).toLocaleLowerCase()
}

/**
 * @description 生成唯一 uuid
 * @return string
 */
export function generateUUID() {
	if (typeof crypto === 'object') {
		if (typeof crypto.randomUUID === 'function') {
			return crypto.randomUUID()
		}
		if (typeof crypto.getRandomValues === 'function' && typeof Uint8Array === 'function') {
			const callback = (c: any) => {
				const num = Number(c)
				return (num ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (num / 4)))).toString(16)
			}
			return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, callback)
		}
	}
	let timestamp = new Date().getTime()
	let performanceNow = (typeof performance !== 'undefined' && performance.now && performance.now() * 1000) || 0
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
		let random = Math.random() * 16
		if (timestamp > 0) {
			random = (timestamp + random) % 16 | 0
			timestamp = Math.floor(timestamp / 16)
		} else {
			random = (performanceNow + random) % 16 | 0
			performanceNow = Math.floor(performanceNow / 16)
		}
		return (c === 'x' ? random : (random & 0x3) | 0x8).toString(16)
	})
}

/**
 * 判断两个对象是否相同
 * @param a 要比较的对象一
 * @param b 要比较的对象二
 * @returns 相同返回 true，反之则反
 */
export function isObjectValueEqual(a: { [key: string]: any }, b: { [key: string]: any }) {
	if (!a || !b) return false
	let aProps = Object.getOwnPropertyNames(a)
	let bProps = Object.getOwnPropertyNames(b)
	if (aProps.length != bProps.length) return false
	for (let i = 0; i < aProps.length; i++) {
		let propName = aProps[i]
		let propA = a[propName]
		let propB = b[propName]
		if (!b.hasOwnProperty(propName)) return false
		if (propA instanceof Object) {
			if (!isObjectValueEqual(propA, propB)) return false
		} else if (propA !== propB) {
			return false
		}
	}
	return true
}

/**
 * @description 生成随机数
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 * @return number
 */
export function randomNum(min: number, max: number): number {
	let num = Math.floor(Math.random() * (min - max) + max)
	return num
}

/**
 * @description 获取浏览器默认语言
 * @return string
 */
export function getBrowserLang() {
	let browserLang = navigator.language ? navigator.language : navigator.browserLanguage
	let defaultBrowserLang = ''
	if (browserLang.toLowerCase() === 'cn' || browserLang.toLowerCase() === 'zh' || browserLang.toLowerCase() === 'zh-cn') {
		defaultBrowserLang = 'zh'
	} else {
		defaultBrowserLang = 'en'
	}
	return defaultBrowserLang
}

/**
 * @description 递归查询当前路由所对应的路由
 * @param {Array} menuList 所有菜单列表
 * @param {String} path 当前访问地址
 * @return array
 */
export function filterCurrentRoute(menuList: Menu.MenuOptions[], path: string) {
	let result = {}
	for (let item of menuList) {
		if (item.path === path) return item
		if (item.children) {
			const res = filterCurrentRoute(item.children, path)
			if (Object.keys(res).length) result = res
		}
	}
	return result
}

/**
 * @description 扁平化数组对象(主要用来处理路由菜单)
 * @param {Array} menuList 所有菜单列表
 * @return array
 */
export function getFlatArr(menuList: Menu.MenuOptions[]) {
	let newMenuList: Menu.MenuOptions[] = JSON.parse(JSON.stringify(menuList))
	return newMenuList.reduce((pre: Menu.MenuOptions[], current: Menu.MenuOptions) => {
		let flatArr = [...pre, current]
		if (current.children) flatArr = [...flatArr, ...getFlatArr(current.children)]
		return flatArr
	}, [])
}

/**
 * @description 使用递归，过滤出需要渲染在左侧菜单的列表（剔除 isHide == true 的菜单）
 * @param {Array} menuList 所有菜单列表
 * @return array
 * */
export function getShowMenuList(menuList: Menu.MenuOptions[]) {
	let newMenuList: Menu.MenuOptions[] = JSON.parse(JSON.stringify(menuList))
	return newMenuList.filter(item => {
		item.children?.length && (item.children = getShowMenuList(item.children))
		return !item.meta?.isHide
	})
}

/**
 * @description 使用递归处理路由菜单 path，生成一维数组(第一版本地路由鉴权会用到)
 * @param {Array} menuList 所有菜单列表
 * @param {Array} menuPathArr 菜单地址的一维数组 ['**','**']
 * @return array
 */
export function getMenuListPath(menuList: Menu.MenuOptions[], menuPathArr: string[] = []) {
	menuList.forEach((item: Menu.MenuOptions) => {
		typeof item === 'object' && item.path && menuPathArr.push(item.path)
		item.children?.length && getMenuListPath(item.children, menuPathArr)
	})
	return menuPathArr
}

/**
 * @description 递归找出所有面包屑存储到 pinia/vuex 中
 * @param {Array} menuList 所有菜单列表
 * @param {Object} result 输出的结果
 * @param {Array} parent 父级菜单
 * @returns object
 */
export const getAllBreadcrumbList = (menuList: Menu.MenuOptions[], result: { [key: string]: any } = {}, parent = []) => {
	for (const item of menuList) {
		result[item.path] = [...parent, item]
		if (item.children) getAllBreadcrumbList(item.children, result, result[item.path])
	}
	return result
}

/**
 * @description 处理无数据情况
 * @param {String} callValue 需要处理的值
 * @return string
 * */
export function formatValue(callValue: any) {
	// 如果当前值为数组,使用 / 拼接（根据需求自定义）
	if (isArray(callValue)) return callValue.length ? callValue.join(' / ') : '--'
	return callValue ?? '--'
}

/**
 * @description 处理 prop 为多级嵌套的情况(列如: prop:user.name)
 * @param {Object} row 当前行数据
 * @param {String} prop 当前 prop
 * @return any
 * */
export function handleRowAccordingToProp(row: { [key: string]: any }, prop: string) {
	if (!prop.includes('.')) return row[prop] ?? '--'
	prop.split('.').forEach(item => (row = row[item] ?? '--'))
	return row
}

/**
 * @description 处理 prop，当 prop 为多级嵌套时 ==> 返回最后一级 prop
 * @param {String} prop 当前 prop
 * @return string
 * */
export function handleProp(prop: string) {
	const propArr = prop.split('.')
	if (propArr.length == 1) return prop
	return propArr[propArr.length - 1]
}

/**
 * @description 根据枚举列表查询当需要的数据（如果指定了 label 和 value 的 key值，会自动识别格式化）
 * @param {String} callValue 当前单元格值
 * @param {Array} enumData 字典列表
 * @param {Array} fieldNames 指定 label && value 的 key 值
 * @param {String} type 过滤类型（目前只有 tag）
 * @return string
 * */
export function filterEnum(
	callValue: any,
	enumData: any[] | undefined,
	fieldNames?: { label: string; value: string },
	type?: string
): string {
	const value = fieldNames?.value ?? 'value'
	const label = fieldNames?.label ?? 'label'
	let filterData: { [key: string]: any } = {}
	if (Array.isArray(enumData)) filterData = enumData.find((item: any) => item[value] === callValue)
	if (type == 'tag') return filterData?.tagType ? filterData.tagType : ''
	return filterData ? filterData[label] : '--'
}

// 数组转树
interface TreeNode {
	id: any
	name?: string
	[key: string]: any
	children?: TreeNode[]
}

export function arrayToTree(
	data: any[],
	parentId = 0,
	idField = 'id',
	parentField = 'parentId',
	name = 'name',
	children = 'children'
): TreeNode[] {
	return data
		.filter(item => item[parentField] === parentId)
		.map(item => ({
			...item,
			[idField]: item[idField], // 设置节点ID属性名称
			name: item[name], // 设置节点名称属性
			[children]: arrayToTree(data, item[idField], idField, parentField, name, children)
		}))
}

export function treeToArray(tree: any[], arr: any[] = [], pid = 0): any[] {
	for (let i = 0, len = tree.length; i < len; i++) {
		const { custommenuid, parentmenuid: nodePid, children, ...rest } = tree[i]
		arr.push({ ...rest, custommenuid, parentmenuid: nodePid })
		if (children && children.length) {
			treeToArray(children, arr, custommenuid)
		}
	}
	return arr
}

// 动态菜单权限判断
export function routeRole(fullPath, authMenuList) {
	const arr = authMenuList.filter(item => {
		return item.fullPath === fullPath
	})
	return arr.length === 0
}

export function getParentNode(tree, targetNode) {
	if (tree.id === targetNode.id) {
		// 已经找到目标节点，返回该节点
		return null
	}
	// 遍历子节点
	for (const childNode of tree.child_list || []) {
		if (childNode.id === targetNode.id) {
			// 如果找到目标节点，则返回当前节点
			return tree
		} else {
			// 继续遍历子节点
			const parentNode = getParentNode(childNode, targetNode)
			if (parentNode) {
				// 如果找到目标节点的父节点，则返回该节点
				return parentNode
			}
		}
	}
	// 没有找到目标节点及其父节点，返回 null
	return null
}
// 剪枝操作
export function removeNodeById(node, targetNode) {
	if (!node || !targetNode) {
		return null
	}
	if (node.id === targetNode.id) {
		// 如果当前节点就是要删除的节点，则返回 null，表示将该节点从树中删除
		return null
	}
	if (node.child_list) {
		// 如果当前节点有子节点，则遍历子节点
		node.child_list = node.child_list
			.map(child => removeNodeById(child, targetNode)) // 递归处理子节点
			.filter(child => child !== null) // 过滤掉被删除的子节点
	}
	return node
}

/**
 * 获取树节点路径
 * @param {*} curKey 树节点标识的值
 * @param {array} data 树
 * @returns {array} result 存放搜索到的树节点到顶部节点的路径节点
 */
export const getPathByKey = (curKey, tree) => {
	/** 存放搜索到的树节点到顶部节点的路径节点 */
	let result = []
	/**
	 * 路径节点追踪
	 * @param {*} curKey 树节点标识的值
	 * @param {array} path 存放搜索到的树节点到顶部节点的路径节点
	 * @param {*} data 树
	 * @returns undefined
	 */
	let traverse = (curKey, path, tree) => {
		// 树为空时，不执行函数
		if (tree.length === 0) {
			return
		}

		// 遍历存放树的数组
		for (let item of tree) {
			// 遍历的数组元素存入path参数数组中
			path.push(item)
			// 如果目的节点的id值等于当前遍历元素的节点id值
			if (item.id === curKey) {
				// 把获取到的节点路径数组path赋值到result数组
				result = JSON.parse(JSON.stringify(path))
				return
			}

			// 当前元素的child_list是数组
			const child_list = Array.isArray(item.child_list) ? item.child_list : []
			// 递归遍历子数组内容
			traverse(curKey, path, child_list)
			// 利用回溯思想，当没有在当前叶树找到目的节点，依次删除存入到的path数组路径
			path.pop()
		}
	}
	traverse(curKey, [], tree)
	// 返回找到的树节点路径
	return result
}

// 获取当前时间
export function getDate() {
	const currentDate = new Date()
	const year = currentDate.getFullYear().toString().padStart(4, '0')
	const month = (currentDate.getMonth() + 1).toString().padStart(2, '0')
	const day = currentDate.getDate().toString().padStart(2, '0')
	const hour = currentDate.getHours().toString().padStart(2, '0')
	const minute = currentDate.getMinutes().toString().padStart(2, '0')
	const second = currentDate.getSeconds().toString().padStart(2, '0')
	const currentTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
	return currentTime
}
