<template>
    <div class="my-table">
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
<style>
.my-table {
    background-color: aliceblue;
    padding: 20px;
}
</style>
