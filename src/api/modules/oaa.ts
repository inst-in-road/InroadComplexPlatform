/*
 * @Author: zjd
 * @Date: 2023-05-04 13:36:26
 * @LastEditors: zhangjiadi-gz jdzhang@in-road.com
 * @LastEditTime: 2023-05-31 13:52:06
 * @Description:oaa模块接口
 */
import http from '@/utils/request'
// 刷新Token
export function refreshOaaToken(data) {
	return http.service({
		url: ``,
		method: 'post',
		data
	})
}
