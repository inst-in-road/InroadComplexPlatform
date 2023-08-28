<!--
 * @Author: zjd
 * @Date: 2023-02-13 10:41:09
 * @LastEditors: zjd
 * @LastEditTime: 2023-02-13 11:19:25
 * @Description: 
-->
<template>
	<div class="fullscreen">
		<i :class="['iconfont', isFullscreen ? 'icon-suoxiao' : 'icon-fangda']" class="toolBar-icon" @click="toggle"></i>
	</div>
</template>

<script setup lang="ts">
import { useFullscreen } from '@vueuse/core'
const { toggle, isFullscreen } = useFullscreen()
</script>
