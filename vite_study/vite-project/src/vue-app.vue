<template>
  <div> Hello Vue</div>
  <p>{{count}}</p>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
const count = ref(0);
setInterval(() => {
  ++count.value;
}, 1000)
</script>
