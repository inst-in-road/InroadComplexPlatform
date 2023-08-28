/*
 * @Author: zjd
 * @Date: 2023-03-24 14:28:51
 * @LastEditors: zjd
 * @LastEditTime: 2023-03-24 14:28:57
 * @Description:
 */
import { defineStore } from 'pinia'
import { keepAliveState } from '@/stores/interface'

// KeepAliveStore
export const KeepAliveStore = defineStore({
	id: 'KeepAliveStore',
	state: (): keepAliveState => ({
		keepAliveName: []
	}),
	actions: {
		// addKeepAliveName
		async addKeepAliveName(name: string) {
			!this.keepAliveName.includes(name) && this.keepAliveName.push(name)
		},
		// removeKeepAliveName
		async removeKeepAliveName(name: string) {
			this.keepAliveName = this.keepAliveName.filter(item => item !== name)
		},
		// setKeepAliveName
		async setKeepAliveName(keepAliveName: string[] = []) {
			this.keepAliveName = keepAliveName
		}
	}
})
