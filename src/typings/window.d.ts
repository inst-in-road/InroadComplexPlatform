/*
 * @Author: zjd
 * @Date: 2023-02-13 10:41:09
 * @LastEditors: zhangjiadi-gz jdzhang@in-road.com
 * @LastEditTime: 2023-06-09 14:04:26
 * @Description:
 */
// * global
declare global {
	interface Navigator {
		msSaveOrOpenBlob: (blob: Blob, fileName: string) => void
		browserLanguage: string
	}
	interface Window {
		log: (val: any, msg: any, type?: number) => void
		__POWERED_BY_WUJIE__?: boolean
		$wujie?: any
	}
}

export {}
