[https://zhuanlan.zhihu.com/p/191216161](https://zhuanlan.zhihu.com/p/191216161)

# 概述

在 Vue2.x 中，组件的主要逻辑是通过一些配置项来编写，包括一些内置的生命周期方法或者组件方法，例如下面的代码：

```js
export default {
  name: "test",
  components: {},
  props: {},
  data() {
    return {};
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {},
};
```

这中基于配置的组件写法成为 Options API（配置式 API），Vue3 的一大核心特性是引入了 Composition API（组合式 API）,这使得组件的大部分内容都可以通过 setup()方法进行配置

## Composition API 的本质

Composition API 可以和 Option API 混合使用（Option API 即 Vue2 中的 data,methods 等）
在 setup()中返回的变量会被注入到 data 中，方法会被注入到 methods 中

# setup

- setup()是组合 API 的入口函数
- `setup 是在beforeCreate之前执行的`。这意味着，除了 props ，你将无法访问组件中声明的任何属性-本地状态，计算属性或方法。
- setup()`只能是同步的，不能是异步的`，你可以在 onMounted 钩子中使用异步函数

```js
import { onMounted } from "vue";

setup() {
    onMounted(async () => {
      ...
    });
},
```

# 使用 ref 或 reactive 创建响应式对象

在 Vue2.x 中通过组件 data 的方法来定义一些当前组件的数据：

```js
data() {
  return {
    name: 'test',
    list: [],
  }
},
```

在 Vue3 中通过 ref 或者 reactive 创建响应式对象：

```js
import {ref,reactive} from 'vue'

setup(){
  const name = ref('test')
  const state = reactive({
    list: []
  })
  return {
      name,
      state
  }
}
```

ref 将给定的值创建一个响应式的数据对象并赋值初始值（int 或者 string），reactive 可以直接定义复杂响应式对象。

# toRaw 将响应式对象转化为普通对象

toRaw()函数可用于将 reactive 和 ref<Object>转为普通的对象
引入 toRaw()

```js
import { toRaw } from "vue";
```

示例：

```js
const obj = reactive({
  num: 1,
  count: 2,
});
let newObj = toRaw(obj);
console.log("newObj", newObj);
/*
{
  num: 1,
  count: 2,
}
*/
```

# setup()参数：props 和 context

## props

setup 函数中的 props 是响应式的，当传入新的 prop 时，它将被更新。 但是，因为 props 是响应式的，你不能使用 ES6 解构，它会消除 prop 的响应性。 如果需要解构 prop，可以在 setup 函数中使用 toRefs 函数来完成此操作：

```js
import { toRefs } from 'vue'
setup(props) {
  const { title } = toRefs(props)
  console.log(title.value)
}
 如果 title 是可选的 prop，则传入的 props 中可能没有 title 。在这种情况下，toRefs 将不会为 title 创建一个 ref 。你需要使用 toRef 替代它：
import { toRef } from 'vue'
setup(props) {
  const title = toRef(props, 'title')
  console.log(title.value)
}
```

## context

context 是一个普通 JavaScript 对象，暴露了其它可能在 setup 中有用的值。它不是响应式的，这意味着你可以安全地对 context 使用 ES6 解构。

```js
export default {
  setup(props, context) {
    // Attribute (非响应式对象，等同于 $attrs)
    console.log(context.attrs);

    // 插槽 (非响应式对象，等同于 $slots)
    console.log(context.slots);

    // 触发事件 (方法，等同于 $emit)
    console.log(context.emit);

    // 暴露公共 property (函数)
    console.log(context.expose);
  },
};
```

# Vue3 里的 methods

在 Vue2.x 中 methods 来定义一些当前组件内部方法：

```js
methods: {
  fetchData() {

  },
}
```

在 Vue3 中直接在 setup 方法中定义并 return：

```js
setup(){
  const fetchData = ()=>{
      console.log('fetchData')
  }

  return {
      fetchData
  }
}
```

# watch和watchEffect

## watch
```js
watch(source, callback, [options])
```
参数说明：
- source: 可以支持 string,Object,Function,Array; 用于指定要侦听的响应式变量
- callback: 执行的回调函数
- options：支持 deep、immediate 和 flush 选项。
### 示例
```js
import { ref, watch } from "vue";

const year = ref(0);
setTimeout(() => {
  year.value++;
}, 1000);
watch(year, (newVal, oldVal) => {
  console.log("新值:", newVal, "老值:", oldVal);
});
```
### 停止监听
```js 
const stopWatch = watch(...);
stopWatch();  //停止监听
```

## watchEffect
<https://segmentfault.com/a/1190000023669309>

watchEffect 不需要指定监听的属性，他会`自动的收集依赖`， 只要我们回调中引用到了 响应式的属性， 那么当这些属性变更的时候，这个回调都会执行，而 watch 只能监听指定的属性而做出变更(v3开始可以同时指定多个)。
watch 可以获取到新值与旧值（更新前的值），而 watchEffect 是拿不到的。
watchEffect 如果存在的话，在组件初始化的时候就会执行一次用以收集依赖（与computed同理），而后收集到的依赖发生变化，这个回调才会再次执行，而 watch 不需要，因为他一开始就指定了依赖。
### 示例
```js
import { watchEffect, ref } from 'vue'
setup () {
    const userID = ref(0)
    watchEffect(() => console.log(userID))
    setTimeout(() => {
      userID.value = 1
    }, 1000)

    /*
      * LOG
      * 0 
      * 1
    */

    return {
      userID
    }
 }
```

# computed 计算属性

Vue2.x 中：

```js
computed: {
    storeData () {
      return this.$store.state.storeData
    },
},
```

Vue3 中：

```js
import {computed} from 'vue'
setup(){
  const storeData = computed(() => store.state.storeData)

  return {
      storeData
  }
}
```
