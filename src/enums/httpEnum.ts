/*
 * @Author: zjd
 * @Date: 2023-02-13 10:41:08
 * @LastEditors: zhangjiadi-gz jdzhang@in-road.com
 * @LastEditTime: 2023-06-08 16:15:43
 * @Description:
 */
// * 请求枚举配置
/**
 * @description：请求配置
 */
export enum ResultEnum {
	SUCCESS = 200,
	ERROR = 500,
	OVERDUE = 401,
	TIMEOUT = 30000,
	TYPE = 'success'
}

/**
 * @description：请求方法
 */
export enum RequestEnum {
	GET = 'GET',
	POST = 'POST',
	PATCH = 'PATCH',
	PUT = 'PUT',
	DELETE = 'DELETE'
}

/**
 * @description：常用的contentTyp类型
 */
export enum ContentTypeEnum {
	// json
	JSON = 'application/json;charset=UTF-8',
	// text
	TEXT = 'text/plain;charset=UTF-8',
	// form-data 一般配合qs
	FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
	// form-data 上传
	FORM_DATA = 'multipart/form-data;charset=UTF-8'
}
