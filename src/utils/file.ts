/*
 * @Author: zhangjiadi-gz jdzhang@in-road.com
 * @Date: 2023-08-01 16:44:28
 * @LastEditors: zhangjiadi-gz jdzhang@in-road.com
 * @LastEditTime: 2023-08-01 16:45:01
 * @FilePath: \Inroad-Complex-Platform\folding-box\src\utils\file.ts
 * @Description: 文件相关工具函数
 */
export function blobToFile(theBlob, fileName) {
	theBlob.lastModifiedDate = new Date()
	theBlob.name = fileName
	return new File([theBlob], fileName, { type: theBlob.type, lastModified: Date.now() })
}
/**
 * 将dataURI转换为blob文件
 * @param dataURI
 * @return {Blob}
 */
export function dataURItoBlob(dataURI) {
	// convert base64/URLEncoded data component to raw binary data held in a string
	let byteString
	if (dataURI.split(',')[0].indexOf('base64') >= 0) {
		byteString = atob(dataURI.split(',')[1])
	} else {
		byteString = decodeURI(dataURI.split(',')[1])
	}

	// separate out the mime component
	const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

	// write the bytes of the string to a typed array
	const ia = new Uint8Array(byteString.length)
	for (let i = 0; i < byteString.length; i++) {
		ia[i] = byteString.charCodeAt(i)
	}

	return new Blob([ia], { type: mimeString })
}
