<!--
 * @Author: zhangjiadi-gz jdzhang@in-road.com
 * @Date: 2023-02-23 18:05:10
 * @LastEditors: zhangjiadi-gz jdzhang@in-road.com
 * @LastEditTime: 2023-08-28 10:26:55
 * @FilePath: \Inroad-Complex-Platform\folding-box\src\layouts\components\Header\components\Avatar.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
	<el-dropdown trigger="click">
		<div class="avatar">登出</div>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item @click="logout">
					<el-icon><SwitchButton /></el-icon>退出登录
				</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
</template>

<script setup lang="ts">
import { GlobalStore } from '@/stores'
import { LOGIN_URL } from '@/config/config'
import { useRouter } from 'vue-router'
import { ElMessageBox, ElMessage } from 'element-plus'
const router = useRouter()
const globalStore = GlobalStore()

// 退出登录
const logout = () => {
	ElMessageBox.confirm('您是否确认退出登录?', '温馨提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning'
	}).then(async () => {
		globalStore.refresh()
		router.replace(LOGIN_URL)
		ElMessage.success('退出登录成功！')
	})
}
</script>

<style scoped lang="scss">
.avatar {
	width: 40px;
	height: 40px;
	overflow: hidden;
	cursor: pointer;
	line-height: 40px;
	// border-radius: 50%;
	img {
		width: 100%;
		height: 100%;
	}
}
</style>
