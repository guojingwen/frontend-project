<template>
    <div class="my-table">
			<p class="test">AAA</p>
        <el-table :data="tableData" border>
            <el-table-column label="ID" prop="id"></el-table-column>
            <el-table-column label="姓名" prop="name"></el-table-column>
            <el-table-column label="年龄" prop="age"></el-table-column>
        </el-table>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {ElTable, ElTableColumn} from 'element-plus';

export default defineComponent({
    components: {
        ElTable,
        ElTableColumn,
    },
    setup() {
        return {
            tableData: [
                {id: 1, name: 'zs', age: 18},
                {id: 1, name: 'zs', age: 19},
            ]
        }
    },
})
</script>
<style lang="scss">
$size: 20px;
.my-table {
    background-color: aliceblue;
    padding: 20px;
		.test{
			font-size: $size;
			/* ios 9 会转会为 rgba(18,52,86,0.47059) */
			color: #12345678;
		}
}
</style>
