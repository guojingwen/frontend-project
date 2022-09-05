<template>
    <div>
        <h2>compiler vue3 components by rollup</h2>
        <input type="text" v-model="msg" placeholder="请输入内容">
        <p>{{msg}}</p>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    setup() {
        const arr: number[] = [1,2,3,4];
        const last = arr.at(-1);
        console.log(last);
        const msg = ref('');
        return {
            msg,
        }
    },
})
</script>
