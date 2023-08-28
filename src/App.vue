<!--
 * @Author: zjd
 * @Date: 2023-02-13 10:41:08
 * @LastEditors: zjd
 * @LastEditTime: 2023-05-25 18:10:11
 * @Description: 
-->
<template>
	<el-config-provider :button="config">
		<router-view></router-view>
	</el-config-provider>
</template>

<script setup lang="ts">
// 配置element按钮文字中间是否有空格
const config = reactive({
	autoInsertSpace: true
})
</script>
