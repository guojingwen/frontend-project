## 组合式APi的优势
- 更好的类型推导
- 更加内聚的代码 
- 自定义钩子， 解决了mixin缺陷
- treeSharking 
- 更好的与社区项目集成

## reactive的缺点
- 对解构不友好
- 不支持基本类型
- 不能替换整个对象

## watch 与 watchEffect的区别
- watchEffect是 watch的简写  {immediate: true}
- 前者同步  后者默认异步 flush:'post'
- watch明确了数据源，不会追踪回调中的任何对象或变量 ， watch会追踪同步执行的对象或变量

## v-model
v-model的事件
```js
const model = defineModel()
```
<input v-model="model">
const props = defineProps(['modelValue'])
const emit = defineEmits([]);
<input :value="props.modelValue" @input="emit('update:model', $event.target.value)">

## $attr
- 默认透传
- inheritAttrs: false
- v-bind:$attrs

## 指令
- 改为和 vue 生命周期一致了


## 状态管理 Pinia 
- 废除状态管理
- 消除了魔法注释
- 废除modules 不再统一管理， 用时注入

- createRouter


# Teleport