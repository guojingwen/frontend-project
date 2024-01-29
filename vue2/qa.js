Vue.use(VueRouter)

new Vue({
  router: new VuerRouter({
    mode: '', // hash history
    routes: []
  })
})

/**
 * 1. .use  plugin.install(vue)   mixin  composent
 * 1. new VueRouter(options)  this.options
 * 1. mixin时 beforeCreate   .$router
 * 1. hashchange   popstate
 * 1. Vue.util.defineReactive  new Vue
 */

Vue.use(Vuex)  // .$store
Vue.use(new Vuex({
  state: {}, // getter, mapToState
  mutations: {}, // commit
  actions:{}, // dispatch
  modules: {} // user: {...}
}))
class Store {
  constructor(){

  }
  get state(){}
  commit(type, payload){}
  dispatch(type, payload){

  }
}
function install(Vue){
  Vue.mixin({
    beforeCreate(){
      Vue.prototype.$store = this.$options.store;
    }
  })
}
export default {
  Store,
  install
}

/**
 * vue direction
 * .direction('dname', function(){}) // bind update
 * .direction('dname', {
 *   bind(el), //
 *   inserted(el, binding, vnode, oldVnode){},
 *   update(){}
 *   componentUpdated(){}
 *   unbind(){}
 * }) // 
 * binding  v-name.modify:arg="expression"
 * name modifiers arg expression value oldValue
 * arg支持动态参数 [argument]
 */

/**
 * vue direction
 * v-directionName:modify:arg='expression'
 * vue.direction('dname', function() { // bind update
 * })
 * vue.direction('dname', {
 *  bind(el){} // 
 *  inserted(el, binding, vnode, oldVnode){ //
 *  }
 *  update(){} // 
 *  componentUpdated(){} //
 *  unbind(){} // 
 * })
 * binding
 * {name, modifiers, arg, expression, value, oldValue }
 *  */ 
/**
 * vue  指令和组件 
 * 组件 模块化 指令 封装手动操作dom
 */

/**
 * vue通信
 * $parent $root $ref $children $attrs $listeners
 * props  emit
 * _bus = new Vue()
 * EventEmmitter()  tabable
 * dispath broadcast
 * privode inject
 * Vuex
 * 
 */

/**
 * Vue的生命周期
 * beforeCreate  lifecycle event
 * created private store state
 * beforeMount mounted
 * beforeUpdate updated
 * beforeDestory destory
 * keep-alive activited deactivited
 */

 new Vue({
  el: '',
  template: ``
 })
 new Vue({
  template(){}
 }).$mount('el')

 /**
  * scoped Css
  * .test[data-v-xx] {}
  * 当前组件和子组件根节点
  * /deep/ ::v-deep
  */

 /**
  * watch 和 computed 的异同
  * 1. api
  *   computed 是函数或对象  对象  可以定义getter setter
  *   watch 是函数或对象 对象 {immidiate: true, deep: true, function() { }}
  * 2. 功能方面 coputed 是同步    有缓存
  *  watch没有缓存 支持异步
  * 3. 使用场景
  *  - 可以有多个对象合成一个对象 用watch
  *  - 处理副作用 异步操作
  *   
  * 
  *  
  */

/**
 * vue路由钩子有哪些
 * 1.  全局钩子 `beforeEach(to, from, next){}` next用法
 *     afterEach beforeResolve
 * 
 * 2. 路由配置  beforeEnter
 * 3. 页面钩子 beforeRouteEnter  Update Leave watch("$route")
 */

/**
 * Vue的nextTick其本质是对JavaScript执行原理EventLoop的一种应用
 * Promise MutationObserver setImmidiate  setTimeout
 * 
 */
/**
 * Vue组件于WebComponent异同
 * 互补  生命周期 时间发射 属性传递 组件服用
 * V组件更强大
 *  高效的声明式模版
 *  响应式的状态管理
 * 服务端渲染
 *  插槽
 * 
 */

/**
 * Vue异步组件
 * components:{
 *  'async-comp'(){
 *     return {
 *      
 *       loading
 *       error
 *      }
 *  }
 * }
 */

/**
 * Vue中的性能优化
 * 懒加载 路由懒加载 异步组件 三方组件库按需加载、图片懒加载
 * 长列表性能优化，存数据展示可以不用响应式  Object.freeze()
 * 无状态组件 functional
 * 事件销毁 定时器，dom监听
 * 将负载的运算切割到子组件里
 * key  v-if v-show  is keep-alive 的 中用
 * computed的缓存
 */

