/*
 * @Author: zhangjiadi-gz jdzhang@in-road.com
 * @Date: 2023-08-01 11:00:04
 * @LastEditors: zhangjiadi-gz jdzhang@in-road.com
 * @LastEditTime: 2023-08-01 13:39:22
 * @Description: mutationObserve 监听元素变化
 */
class MutationObserverListener {
	private observer: MutationObserver | null
	private callback: MutationCallback

	constructor(callback: MutationCallback) {
		this.observer = null
		this.callback = callback
	}

	on(target: Node, config: MutationObserverInit): void {
		if (this.observer) {
			console.warn("MutationObserver is already running. Call 'off' before calling 'on' again.")
			return
		}

		this.observer = new MutationObserver(this.callback)
		this.observer.observe(target, config)
	}

	off(): void {
		if (this.observer) {
			this.observer.disconnect()
			this.observer = null
		}
	}
}

export const useElementEventListener = () => {
	const myCallback: MutationCallback = (mutationsList, observer) => {
		for (const mutation of mutationsList) {
			console.log('Mutation type:', mutation.type)
			console.log('Changed element:', mutation.target)
			console.log('Old value:', mutation.oldValue)
			console.log('New value:', (mutation.target as HTMLElement).textContent)
		}
	}
	const observerListener = new MutationObserverListener(myCallback)
	const start = (
		target: Node,
		config: MutationObserverInit = {
			childList: true, // 监听子节点的变化
			characterData: true, // 监听文本节点内容的变化
			attributes: true, // 监听属性的变化
			subtree: true, // 监听所有后代节点
			attributeOldValue: true, // 记录属性旧值
			characterDataOldValue: true // 记录文本节点内容的旧值
		}
	) => {
		observerListener.on(target, config)
	}
	const stop = () => {
		observerListener.off()
	}
	return { start, stop }
}
