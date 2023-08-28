<template>
	<component :is="renderColumn(column)"></component>
</template>

<script lang="tsx" setup>
defineProps<{ column }>()
const renderColumn = item => {
	return (
		<>
			{item.show !== false && (
				<el-table-column
					{...item}
					align={item.align ?? 'center'}
					showOverflowTooltip={item.showOverflowTooltip ?? item.prop !== 'operation'}
				>
					{{
						default: (scope: any) => {
							if (item.render) {
								return item.render(scope)
							} else {
								return (
									<div
										style={{
											display: '-webkit-box',
											'-webkit-line-clamp': 2,
											overflow: 'hidden',
											'text-overflow': 'ellipsis',
											'-webkit-box-orient': 'vertical',
											'white-space': 'normal'
										}}
									>
										{scope.row[item.prop]}
									</div>
								)
							}
						},
						header: () => {
							return item.label
						}
					}}
				</el-table-column>
			)}
		</>
	)
}
</script>
<style scoped lang="scss"></style>
