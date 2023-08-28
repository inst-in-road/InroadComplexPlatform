<!-- 💥 这里是异步加载 LayoutComponents -->
<template>
	<suspense>
		<template #default>
			<component :is="LayoutComponents.vertical" />
		</template>
		<template #fallback>
			<Loading />
		</template>
	</suspense>
</template>

<script setup lang="ts" name="layout">
import { defineAsyncComponent, type Component } from 'vue'
import Loading from '@/components/Loading/index.vue'

const LayoutComponents: { [key: string]: Component } = {
	vertical: defineAsyncComponent(() => import('./LayoutVertical/index.vue'))
}
</script>

<style scoped lang="scss">
.layout {
	min-width: 760px;
}
</style>
