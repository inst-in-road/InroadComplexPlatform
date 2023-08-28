<!--
 * @Author: zhangjiadi-gz jdzhang@in-road.com
 * @Date: 2023-08-04 09:40:49
 * @LastEditors: zhangjiadi-gz jdzhang@in-road.com
 * @LastEditTime: 2023-08-17 16:32:32
 * @FilePath: \Inroad-Complex-Platform\folding-box\src\components\CommonTable\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
	<div style="width: 100%; height: 100%">
		<slot name="tableHeader"></slot>
		<el-table
			class="common-table"
			ref="commonTableRef"
			id="common-table"
			:data="props.tableData"
			:key="key"
			flexible
			border
			:row-key="getRowKeys"
			style="width: 100%; margin-top: 20px"
			:height="height - layoutHeight"
			@row-click="rowClick"
			@select="select"
			@select-all="selectAll"
		>
			<template v-for="item in column" :key="item">
				<el-table-column
					v-bind="item"
					:align="item.align ?? 'center'"
					:reserve-selection="item.type == 'selection'"
					v-if="item.type == 'selection' || item.type == 'index'"
				>
				</el-table-column>
				<el-table-column v-bind="item" :align="item.align ?? 'center'" v-if="item.type == 'radio'">
					<template v-if="item.render" #header>
						<component :is="item.render()"></component>
					</template>
					<template #default="{ row }">
						<el-radio v-model="radio" :label="row.id" @change="radioBind(row)"><span></span></el-radio>
					</template>
				</el-table-column>
				<el-table-column v-bind="item" :align="item.align ?? 'center'" v-if="item.type == 'expand'" v-slot="scope">
					<component :is="item.render" :row="scope.row" v-if="item.render"> </component>
					<slot :name="item.type" :row="scope.row" v-else></slot>
				</el-table-column>
				<Column v-if="!item.type && item.prop" :column="item"></Column>
			</template>
		</el-table>
		<el-pagination
			class="pagination"
			v-model:current-page="pagination.currentPage"
			v-model:page-size="pagination.pageSize"
			:page-sizes="[20, 50, 100, 200]"
			:small="false"
			:disabled="false"
			:background="true"
			layout="total, sizes, prev, pager, next, jumper"
			:total="pagination.total"
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
		/>
	</div>
</template>

<script lang="ts" setup>
import Column from './components/Column.vue'
const { width, height } = useWindowSize()
interface Prop {
	tableData: Array<any>
	column: Array<any>
	layoutHeight?: number
	rowClick?: (row: any) => void
}
const commonTableRef = ref()
const key = ref(0)
const props = withDefaults(defineProps<Prop>(), {
	config: {
		selection: false,
		toolTip: false
	},
	layoutHeight: 0
})
const emit = defineEmits(['pageChange', 'selected'])
const { tableData, column, layoutHeight } = toRefs(props)

// 选中的数据
const selectedData = ref([])
const select = (val: any, row) => {
	const ids = selectedData.value.map(item => item.id)
	if (ids.includes(row.id)) {
		selectedData.value.splice(ids.indexOf(row.id), 1)
	} else {
		selectedData.value.push(row)
	}
	emit('selected', selectedData.value)
}
const selectAll = (val: any) => {
	if (val.length === 0) {
		tableData.value.forEach(item => {
			const ids = selectedData.value.map(item => item.id)
			if (ids.includes(item.id)) {
				selectedData.value.splice(ids.indexOf(item.id), 1)
			}
		})
	} else {
		const ids = selectedData.value.map(item => item.id)
		val.forEach(item => {
			if (!ids.includes(item.id)) {
				selectedData.value.push(item)
			}
		})
	}
	emit('selected', selectedData.value)
}
const pagination = ref({
	currentPage: 1,
	pageSize: 20,
	total: 0
})
const handleSizeChange = (val: number) => {
	emit('pageChange', pagination.value)
}
const handleCurrentChange = (val: number) => {
	emit('pageChange', pagination.value)
}
const getRowKeys = (row: any, selectId = 'id') => {
	return row[selectId]
}
const refresh = () => {
	key.value++
}

const radio = ref(null)

const radioBind = (row: any) => {
	radio.value = row.id
	selectedData.value = [{ ...row }]
}

defineExpose({
	refresh,
	pagination
})
</script>
<style scoped lang="scss">
.pagination {
	margin-top: 20px;
}
</style>
