<template>
  <div>{{ obj.name }} is {{ obj.age }}</div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const obj = reactive({
  name: 'zs',
  age: 12,
});
console.log(obj);
</script>
