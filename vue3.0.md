# vue3.0

## 组合式 API

Composition API

### setup

#### 基本使用

- `setup`是在组件创建**之前**, `props` 被解析之后执行，是组合式 API 的入口。

- `setup`把vue2.0中的data，computed，methods，watch等整合到一起，使用这些方法和属性的时候要从vue的解构出来使用。这样可以把页面中的一个功能点整合到一起。

- `setup`返回一个对象，模板可以使用模板中的变量和方法。

- `setup` 选项是一个接收 `props` 和 `context` 的函数

  > WARNING
  >  在 `setup` 中你应该避免使用 `this`，因为它不会找到组件实例。`setup` 的调用发生在 `data` property、`computed` property 或 `methods` 被解析之前，所以它们无法>在 `setup` 中被获取。

```vue
<template>
  <div @click="increase">{{ count }}</div>
</template>
```

```js
import { ref } from "vue";

setup() {
    const count = ref(1)
    const increase = () => count.value++;
    return {
        count,
        increase
    }
}
```

#### 访问 Props

`setup` 函数的第一个参数是组件的 `props`。和标准的组件一致，一个 `setup` 函数的 `props` 是响应式的，并且会在传入新的 props 时同步更新。

```js
export default {
    props: {
        title: String
    },
    setup(props) {
        console.log(props.title)
    }
}
```

请注意如果你解构了 `props` 对象，解构出的变量将会丢失响应性。因此我们推荐通过 `props.xxx` 的形式来使用其中的 props。

如果你确实需要解构 `props` 对象，或者需要将某个 prop 传到一个外部函数中并保持响应性，那么你可以使用 [toRefs()](https://cn.vuejs.org/api/reactivity-utilities.html#torefs) 和 [toRef()](https://cn.vuejs.org/api/reactivity-utilities.html#toref) 这两个工具函数：

```js
import { toRefs, toRef } from 'vue'

export default {
    setup(props) {
        // 将 `props` 转为一个其中全是 ref 的对象，然后解构
        const { title } = toRefs(props)
        // `title` 是一个追踪着 `props.title` 的 ref
        console.log(title.value)

        // 或者，将 `props` 的单个属性转为一个 ref
        const title = toRef(props, 'title')
        }
}
```

#### Setup 上下文

传入 `setup` 函数的第二个参数是一个 **Setup 上下文**对象。上下文对象暴露了其他一些在 `setup` 中可能会用到的值

```js
export default {
    setup(props, context) {
        // 透传 Attributes（非响应式的对象，等价于 $attrs）
        console.log(context.attrs)

        // 插槽（非响应式的对象，等价于 $slots）
        console.log(context.slots)

        // 触发事件（函数，等价于 $emit）
        console.log(context.emit)

        // 暴露公共属性（函数）
        console.log(context.expose)
    }
}
```

该上下文对象是非响应式的，可以安全地解构：

```js
export default {
    setup(props, { attrs, slots, emit, expose }) {
        ...
    }
}
```

#### `<script setup>`

在 `setup()` [#](https://cn.vuejs.org/api/sfc-script-setup.html#script-setup) 函数中手动暴露大量的状态和方法非常繁琐。幸运的是，我们可以通过使用构建工具来简化该操作。当使用单文件组件（SFC）时，我们可以使用 `<script setup>` 来大幅度地简化代码。

> 在添加了setup的script标签中，我们不必声明和方法，这种写法会自动将所有顶级变量、函数，均会自动暴露给模板（template）使用

使用 script setup 语法糖，组件只需引入不用注册，属性和方法也不用返回，也不用写setup函数，也不用写export default ，甚至是自定义指令也可以在我们的template中自动获得。[基本语法](https://cn.vuejs.org/api/sfc-script-setup.html)

- ##### 顶层的绑定会被暴露给模板

```vue
<script setup>
    // 变量
    const msg = 'Hello!'

    // 函数
    function log() {
        console.log(msg)
    }
</script>

<template>
	<button @click="log">{{ msg }}</button>
</template>
```

import 导入的内容也会以同样的方式暴露。这意味着我们可以在模板表达式中直接使用导入的 helper 函数，而不需要通过 `methods` 选项来暴露它：

```vue
<script setup>
    import { capitalize } from './helpers'
</script>

<template>
	<div>{{ capitalize('hello') }}</div>
</template>
```



- 使用组件

`<script setup>` 范围里的值也能被直接作为自定义组件的标签名使用：

```vue
<script setup>
    import MyComponent from './MyComponent.vue'
</script>

<template>
	<MyComponent />
</template>
```

这里 `MyComponent` 应当被理解为像是在引用一个变量。如果你使用过 JSX，此处的心智模型是类似的。其 kebab-case 格式的 `` 同样能在模板中使用——不过，我们强烈建议使用 PascalCase 格式以保持一致性。同时这也有助于区分原生的自定义元素。

为导入的组件添加别名：

```js
import { FooBar as FooBarChild } from './components'
```



- 使用自定义指令

全局注册的自定义指令将正常工作。本地的自定义指令在 `` 中不需要显式注册，但他们必须遵循 `vNameOfDirective` 这样的命名规范：

```vue
<script setup>
    const vMyDirective = {
        beforeMount: (el) => {
            // 在元素上做些操作
        }
    }
</script>
<template>
	<h1 v-my-directive>This is a Heading</h1>
</template>
```

如果指令是从别处导入的，可以通过重命名来使其符合命名规范：

```vue
<script setup>
	import { myDirective as vMyDirective } from './MyDirective.js'
</script>
```



- defineProps() 和 defineEmits()

```vue
<script setup>
    const props = defineProps({
        foo: String
    })
    const emit = defineEmits(['change', 'delete'])
    // setup 代码
</script>
```

`defineProps` 和 `defineEmits` 都是只能在 `` 中使用的**编译器宏**。他们不需要导入，且会随着 `` 的处理过程一同被编译掉。

`defineProps` 接收与 `props` 选项相同的值，`defineEmits` 接收与 `emits` 选项相同的值。

`defineProps` 和 `defineEmits` 在选项传入后，会提供恰当的类型推导。

传入到 `defineProps` 和 `defineEmits` 的选项会从 setup 中提升到模块的作用域。因此，传入的选项不能引用在 setup 作用域中声明的局部变量。这样做会引起编译错误。但是，它*可以*引用导入的绑定，因为它们也在模块作用域内。



### 响应式：核心

vue3.0中通过 proxy 对数据进行封装，当数据变化时，触发模版等内容的更新，利用`ref`，`reactive`，`toRefs`，`toRef`实现双向绑定，类似vue2.0 data的作用，区别在于vue2.0是通过Object.defineProperty实现，vue3.0是通过Proxy实现

```js
// vue2.0实现响应式
Object.defineProperty(data, 'count', {
	get() { },
	set() { },
})
// vue3.0实现响应式
new Proxy(data, {
    get(key) { },
    set(key, value) { },
})
```

在vue2.0中的响应式对于对象和数组的检测是存在一定缺陷的，比如对象中新增的属性是没有响应式的，需要用到this.$set('obj', 'name', 2)去添加新属性。vue3.0使用proxy 就不会存在这些问题。

经过`ref`，`reactive`，`toRefs`，`toRef`处理的值需要通过`value`属性进行进行访问和修改，不能像v2.0那样直接修改。

#### **ref**()

接受一个内部值，返回一个响应式的、可更改的 ref 对象，此对象只有一个指向其内部值的属性 `.value`。

```js
const name = ref('dell')
// ref会把 'dell' 变成 proxy({value: 'dell'}) 这样的一个响应式引用
name.value = 'bill'
// ref 对象是可更改的，通过.value 赋予新的值，它也是响应式的。
```

如果将一个对象赋值给 ref，那么这个对象将通过 [reactive()](https://cn.vuejs.org/api/reactivity-core.html#reactive) 转为具有深层次响应式的对象。这也意味着如果对象中包含了嵌套的 ref，它们将被深层地解包。

若要避免这种深层次的转换，请使用 [`shallowRef()`](https://cn.vuejs.org/api/reactivity-advanced.html#shallowref) 来替代。



`模板Ref ` 在CompositionAPI语法下，获取真实的DOM元素节点

```js
const app = Vue.createApp({
    setup() {
        const { ref, onMounted } = Vue;
        const hello = ref(null);
        onMounted(() => {
            console.log(hello.value); // 得到DOM元素节点
        })
        return { hello }
    },
    template: `
        <div>
        	<div ref="hello">hello world</div>
        </div>
	`,
});
```





#### **reactive**()

创建一个响应式对象或数组

```js
const nameObj = reactive({name: 'dell', age: 28}) 
// reactive会把{ name: 'dell'} 变成 proxy({ name: 'dell'}) 
```

在 Vue 中，状态都是默认深层响应式的。这意味着即使在更改深层次的对象或数组，你的改动也能被检测到。

```js
const obj = reactive({
    nested: { count: 0 },
    arr: ['foo', 'bar']
})
function mutateDeeply() {
    // 以下都会按照期望工作
    obj.nested.count++
    obj.arr.push('baz')
}
```

仅对对象类型有效（对象、数组和 `Map`、`Set` 这样的[集合类型](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects#使用键的集合对象)），而对 `string`、`number` 和 `boolean` 这样的 [原始类型](https://developer.mozilla.org/zh-CN/docs/Glossary/Primitive) 无效。

当我们将响应式对象的属性赋值或解构至本地变量时，或是将该属性传入一个函数时，我们会失去响应性

```js
const state = reactive({ count: 0 })

// n 是一个局部变量，同 state.count
// 失去响应性连接
let n = state.count
// 不影响原始的 state
n++

// count 也和 state.count 失去了响应性连接
let { count } = state
// 不会影响原始的 state
count++
```

如果想让响应式对象的属性赋值或解构至本地变量时保持响应式，应该使用  [`toRefs`](https://cn.vuejs.org/api/reactivity-utilities.html#torefs) 

```js
const state = reactive({ count: 0 })

const refState = toRefs(state)
// count 也和 state.count 保持响应性连接
let { count } = refState

count++
console.log(state.count) // 2
```

如果想让响应式对象的属性处理为只读，不允许变更，使用  [readonly](https://cn.vuejs.org/api/reactivity-core.html#readonly)

```js
import { reactive, readonly } from "vue";
setup() {
	const nameObj = reactive([123])
    const copyNameObj = readonly(nameObj)
    setTimeout(() => {
        nameObj[0] = 456
        copyNameObj[0] = 456 //  warning! 更改该只读副本将会失败，并会得到一个警告
    }, 2000)
    return { nameObj, copyNameObj }
}
```



#### computed()

计算属性就是当依赖的属性的值发生变化的时候，才会触发他的更新，如果依赖的值，不发生变化的时候，使用的是缓存中的属性。

[computed ](https://cn.vuejs.org/api/reactivity-core.html#computed)接受一个 getter 函数，返回一个只读的响应式 [ref](https://cn.vuejs.org/api/reactivity-core.html#ref) 对象。该 ref 通过 `.value` 暴露 getter 函数的返回值。它也可以接受一个带有 `get` 和 `set` 函数的对象来创建一个可写的 ref 对象。

创建一个只读的计算属性 ref：

```js
const count = ref(1)
const plusOne = computed(() => count.value + 1)

console.log(plusOne.value) // 2

plusOne.value++ // 错误
```

创建一个可写的计算属性 ref：

```js
const count = ref(1)
const plusOne = computed({
    get: () => count.value + 1,
    set: (val) => {
        count.value = val - 1
    }
})
plusOne.value = 1
console.log(count.value) // 0
```

范例：

```vue
<template>
  <input
    style="padding: 6px; margin-bottom: 20px"
    id="inp"
    type="text"
    placeholder="搜索"
    v-model="keyWord"
  />
  <table width="600px" border cellpadding="10px 0" cellspacing="0">
    <thead>
      <tr>
        <th>商品名称</th>
        <th>单价</th>
        <th>数量</th>
        <th>总价</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in resultList" :key="index">
        <td align="center">{{ item.name }}</td>
        <td align="center">{{ item.price }}</td>
        <td align="center">
          <button @click="item.num > 1 ? item.num-- : null">-</button>
          {{ item.num }}
          <button @click="item.num < 99 ? item.num++ : null">+</button>
        </td>
        <td align="center">{{ item.price * item.num }}</td>
        <td align="center">
          <button @click="del(index)">删除</button>
        </td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="5" align="right">总额：{{ total }}</td>
      </tr>
    </tfoot>
  </table>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'

interface List {
  name: string
  price: number
  num: number
}

const list = reactive<List[]>([
  { name: '苹果', price: 500, num: 1 },
  { name: '香蕉', price: 200, num: 1 },
  { name: '橘子', price: 300, num: 1 }
])

const keyWord = ref<string>('')
const resultList = computed(() => {
  return list.filter((item) => item.name.includes(keyWord.value))
})

const total = computed(() => {
  return resultList.value.reduce((total: number, item: List) => {
    return total + item.price * item.num
  }, 0)
})

const del = (index: number) => {
  list.splice(index, 1)
}
</script>

<style scoped></style>
```



#### watchEffect()

[watchEffect](https://cn.vuejs.org/api/reactivity-core.html#watcheffect) 立即运行一个函数，同时响应式地追踪其依赖，并在依赖更改时重新执行。

立即执行，没有惰性；不需要传递要监听的数据，自动感知代码依赖； 不能获取之前数据的值，只能获取当前的值

第一个参数就是要运行的副作用函数。这个副作用函数的参数也是一个函数，用来注册清理回调。清理回调会在该副作用下一次执行前被调用，可以用来清理无效的副作用，例如等待中的异步请求 (参见下面的示例)。

第二个参数是一个可选的选项，可以用来调整副作用的刷新时机或调试副作用的依赖。

默认情况下，侦听器将在组件渲染之前执行。设置 `flush: 'post'` 将会使侦听器延迟到组件渲染之后再执行。详见[回调的触发时机](https://cn.vuejs.org/guide/essentials/watchers.html#callback-flush-timing)。在某些特殊情况下 (例如要使缓存失效)，可能有必要在响应式依赖发生改变时立即触发侦听器。这可以通过设置 `flush: 'sync'` 来实现。然而，该设置应谨慎使用，因为如果有多个属性同时更新，这将导致一些性能和数据一致性的问题。

返回值是一个用来停止该副作用的函数。

```js
const count = ref(0)

watchEffect(() => console.log(count.value))
// -> 输出 0

count.value++
// -> 输出 1
```

副作用清除：

```js
watchEffect(async (onCleanup) => {
    const { response, cancel } = doAsyncWork(id.value)
    // `cancel` 会在 `id` 更改时调用
    // 以便取消之前
    // 未完成的请求
    onCleanup(cancel)
    data.value = await response
})
```

停止侦听器：

```js
const stop = watchEffect(() => {})

// 当不再需要此侦听器时:
stop()
```



watchPostEffect() 

[`watchEffect()`](https://cn.vuejs.org/api/reactivity-core.html#watcheffect) 使用 `flush: 'post'` 选项时的别名。



watchSyncEffect()

[`watchEffect()`](https://cn.vuejs.org/api/reactivity-core.html#watcheffect) 使用 `flush: 'sync'` 选项时的别名。



范例

```vue
<template>
  <input
    style="padding: 6px; margin-bottom: 20px"
    id="inp"
    type="text"
    placeholder="watch"
    v-model="keyWord"
  />
  <button @click="stop">停止监听</button>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const keyWord = ref<string>('')
const stop = watchEffect(
  (oninvalidate) => {
    const inp: HTMLInputElement = document.getElementById('inp') as HTMLInputElement
    console.log('获取dom元素', inp)
    console.log(keyWord.value)
    oninvalidate(() => {
      console.log('before update')
    })
  },
  {
    flush: 'post'
  }
)
</script>

<style scoped></style>
```



#### watch()

[watch](https://cn.vuejs.org/api/reactivity-core.html#watch) 侦听一个或多个响应式数据源，并在数据源变化时调用所给的回调函数。

`watch()` 默认是懒侦听的，即仅在侦听源发生变化时才执行回调函数。

第一个参数是侦听器的**源**。这个来源可以是以下几种：

- 一个函数，返回一个值
- 一个 ref
- 一个响应式对象
- ...或是由以上类型的值组成的数组

第二个参数是在发生变化时要调用的回调函数。这个回调函数接受三个参数：新值、旧值，以及一个用于注册副作用清理的回调函数。该回调函数会在副作用下一次重新执行前调用，可以用来清除无效的副作用，例如等待中的异步请求。

当侦听多个来源时，回调函数接受两个数组，分别对应来源数组中的新值和旧值。

第三个可选的参数是一个对象，支持以下这些选项：

- **`immediate`**：在侦听器创建时立即触发回调。第一次调用时旧值是 `undefined`。
- **`deep`**：如果源是对象，强制深度遍历，以便在深层级变更时触发回调。参考[深层侦听器](https://cn.vuejs.org/guide/essentials/watchers.html#deep-watchers)。
- **`flush`**：调整回调函数的刷新时机。参考[回调的刷新时机](https://cn.vuejs.org/guide/essentials/watchers.html#callback-flush-timing)及 [`watchEffect()`](https://cn.vuejs.org/api/reactivity-core.html#watcheffect)。
- **`onTrack / onTrigger`**：调试侦听器的依赖。参考[调试侦听器](https://cn.vuejs.org/guide/extras/reactivity-in-depth.html#watcher-debugging)。

与 [`watchEffect()`](https://cn.vuejs.org/api/reactivity-core.html#watcheffect) 相比，`watch()` 使我们可以：

- 懒执行副作用；
- 更加明确是应该由哪个状态触发侦听器重新执行；
- 可以访问所侦听状态的前一个值和当前值。

侦听一个 getter 函数：

```js
const state = reactive({ count: 0 })
watch(
    () => state.count,
    (count, prevCount) => {
        /* ... */
    }
)
```

侦听一个 ref：

```js
const count = ref(0)
watch(count, (count, prevCount) => {
    /* ... */
})
```

当侦听多个来源时，回调函数接受两个数组，分别对应来源数组中的新值和旧值：

```json
watch([fooRef, barRef], ([foo, bar], [prevFoo, prevBar]) => {
    /* ... */
})
```



### 响应式：工具

#### **toRef** 

[toRef](https://cn.vuejs.org/api/reactivity-utilities.html#toref) 基于响应式对象上的一个属性，创建一个对应的 ref。这样创建的 ref 与其源属性保持同步：改变源属性的值将更新 ref 的值，反之亦然。

```js
const state = reactive({
  foo: 1,
  bar: 2
})

// 双向 ref，会与源属性同步
const fooRef = toRef(state, 'foo')

// 更改该 ref 会更新源属性
fooRef.value++
console.log(state.foo) // 2

// 更改源属性也会更新该 ref
state.foo++
console.log(fooRef.value) // 3
```

请注意，这不同于：

```js
const fooRef = ref(state.foo)
```

上面这个 ref **不会**和 `state.foo` 保持同步，因为这个 `ref()` 接收到的是一个纯数值。

`toRef()` 这个函数在你想把一个 prop 的 ref 传递给一个组合式函数时会很有用：

```vue
<script setup>
    import { toRef } from 'vue'

    const props = defineProps(/* ... */)

    // 将 `props.foo` 转换为 ref，然后传入
    // 一个组合式函数
    useSomeFeature(toRef(props, 'foo'))

    // getter 语法——推荐在 3.3+ 版本使用
    useSomeFeature(toRef(() => props.foo))
</script>
```

当 `toRef` 与组件 props 结合使用时，关于禁止对 props 做出更改的限制依然有效。尝试将新的值传递给 ref 等效于尝试直接更改 props，这是不允许的。在这种场景下，你可能可以考虑使用带有 `get` 和 `set` 的 [`computed`](https://cn.vuejs.org/api/reactivity-core.html#computed) 替代。详情请见[在组件上使用 `v-model`](https://cn.vuejs.org/guide/components/events.html#usage-with-v-model) 指南。

即使源属性当前不存在，`toRef()` 也会返回一个可用的 ref。这让它在处理可选 props 的时候格外实用，相比之下 [`toRefs`](https://cn.vuejs.org/api/reactivity-utilities.html#torefs) 就不会为可选 props 创建对应的 refs。



#### **toRefs**

[toRefs ](https://cn.vuejs.org/api/reactivity-utilities.html#torefs)将一个响应式对象转换为一个普通对象，这个普通对象的每个属性都是指向源对象相应属性的 ref。每个单独的 ref 都是使用 [`toRef()`](https://cn.vuejs.org/api/reactivity-utilities.html#toref) 创建的。

```js
const toRefs = <T extends object>(object: T) => {
  const map: any = {}
  for (const key in object) {
    map[key] = toRef(object, key)
  }
  return map
}
```

当从组合式函数中返回响应式对象时，`toRefs` 相当有用。使用它，消费者组件可以解构/展开返回的对象而不会失去响应性：

```js
function useFeatureX() {
  const state = reactive({
    foo: 1,
    bar: 2
  })

  // ...基于状态的操作逻辑

  // 在返回时都转为 ref
  return toRefs(state)
}

// 可以解构而不会失去响应性
const { foo, bar } = useFeatureX()
```

`toRefs` 在调用时只会为源对象上可以枚举的属性创建 ref。如果要为可能还不存在的属性创建 ref，请改用 [`toRef`](https://cn.vuejs.org/api/reactivity-utilities.html#toref)



#### toRaw

根据一个 Vue 创建的代理返回其原始对象。

`toRaw()` 可以返回由 [`reactive()`](https://cn.vuejs.org/api/reactivity-core.html#reactive)、[`readonly()`](https://cn.vuejs.org/api/reactivity-core.html#readonly)、[`shallowReactive()`](https://cn.vuejs.org/api/reactivity-advanced.html#shallowreactive) 或者 [`shallowReadonly()`](https://cn.vuejs.org/api/reactivity-advanced.html#shallowreadonly) 创建的代理对应的原始对象。

- 这是一个可以用于临时读取而不引起代理访问/跟踪开销，或是写入而不触发更改的特殊方法。不建议保存对原始对象的持久引用，请谨慎使用。

- **示例**

  ```js
  const foo = {}
  const reactiveFoo = reactive(foo)
  
  console.log(toRaw(reactiveFoo) === foo) // true
  ```



#### markRaw()

将一个对象标记为不可被转为代理。返回该对象本身。

```js
const foo = markRaw({})
console.log(isReactive(reactive(foo))) // false

// 也适用于嵌套在其他响应性对象
const bar = reactive({ foo })
console.log(isReactive(bar.foo)) // false
```

`markRaw()` 和类似 `shallowReactive()` 这样的浅层式 API 使你可以有选择地避开默认的深度响应/只读转换，并在状态关系谱中嵌入原始的、非代理的对象。它们可能出于各种各样的原因被使用：

- 有些值不应该是响应式的，例如复杂的第三方类实例或 Vue 组件对象。
- 当呈现带有不可变数据源的大型列表时，跳过代理转换可以提高性能。

这应该是一种进阶需求，因为只在根层访问能到原始值，所以如果把一个嵌套的、没有标记的原始对象设置成一个响应式对象，然后再次访问它，你获取到的是代理的版本。这可能会导致**对象身份风险**，即执行一个依赖于对象身份的操作，但却同时使用了同一对象的原始版本和代理版本：

```js
const foo = markRaw({
  nested: {}
})

const bar = reactive({
  // 尽管 `foo` 被标记为了原始对象，但 foo.nested 却没有
  nested: foo.nested
})

console.log(foo.nested === bar.nested) // false
```

识别风险一般是很罕见的。然而，要正确使用这些 API，同时安全地避免这样的风险，需要你对响应性系统的工作方式有充分的了解。

 



### 生命周期钩子

- [onMounted()](https://cn.vuejs.org/api/composition-api-lifecycle.html#onmounted)
- [onUpdated()](https://cn.vuejs.org/api/composition-api-lifecycle.html#onupdated)
- [onUnmounted()](https://cn.vuejs.org/api/composition-api-lifecycle.html#onunmounted)
- [onBeforeMount()](https://cn.vuejs.org/api/composition-api-lifecycle.html#onbeforemount)
- [onBeforeUpdate()](https://cn.vuejs.org/api/composition-api-lifecycle.html#onbeforeupdate)
- [onBeforeUnmount()](https://cn.vuejs.org/api/composition-api-lifecycle.html#onbeforeunmount)
- [onErrorCaptured()](https://cn.vuejs.org/api/composition-api-lifecycle.html#onerrorcaptured)
- [onRenderTracked()](https://cn.vuejs.org/api/composition-api-lifecycle.html#onrendertracked)
- [onRenderTriggered()](https://cn.vuejs.org/api/composition-api-lifecycle.html#onrendertriggered)
- [onActivated()](https://cn.vuejs.org/api/composition-api-lifecycle.html#onactivated)
- [onDeactivated()](https://cn.vuejs.org/api/composition-api-lifecycle.html#ondeactivated)
- [onServerPrefetch()](https://cn.vuejs.org/api/composition-api-lifecycle.html#onserverprefetch)

beforeCreate => use setup()

created => use setup()

beforeMount => onBeforeMount

mounted => onMounted

beforeUpdate => onBeforeUpdate

updated => onUpdated

beforeUnmount => onBeforeUnmount

unmounted => onUnmounted

onRenderTracked  -  每次渲染后重新收集响应式依赖触发

onRenderTriggered - 每次触发页面重新渲染时自动执行

```js
import {onBeforeMount, onMounted} from "vue"
setup() {
    onBeforeMount(() => {
        console.log('onBeforeMount')
    })
    onMounted(() => {
        console.log('onMounted')
    })
}
```



### 依赖注入

通常情况下，当我们需要从父组件向子组件传递数据时，会使用 [props](https://cn.vuejs.org/guide/components/props.html)。想象一下这样的结构：有一些多层级嵌套的组件，形成了一颗巨大的组件树，而某个深层的子组件需要一个较远的祖先组件中的部分数据。在这种情况下，如果仅使用 props 则必须将其沿着组件链逐级传递下去，这会非常麻烦：

![Prop 逐级透传的过程图示](https://cn.vuejs.org/assets/prop-drilling.11201220.png)

注意，虽然这里的 `` 组件可能根本不关心这些 props，但为了使 `` 能访问到它们，仍然需要定义并向下传递。如果组件链路非常长，可能会影响到更多这条路上的组件。这一问题被称为“prop 逐级透传”，显然是我们希望尽量避免的情况。

`provide` 和 `inject` 可以帮助我们解决这一问题。 [[1\]](https://cn.vuejs.org/guide/components/provide-inject.html#footnote-1) 一个父组件相对于其所有的后代组件，会作为**依赖提供者**。任何后代的组件树，无论层级有多深，都可以**注入**由父组件提供给整条链路的依赖。

![Provide/inject 模式](https://cn.vuejs.org/assets/provide-inject.3e0505e4.png)

#### provide()[#](https://cn.vuejs.org/guide/components/provide-inject.html#prop-drilling)

要为组件后代提供数据，需要使用到 [`provide()`](https://cn.vuejs.org/api/composition-api-dependency-injection.html#provide) 函数：

`provide()`提供一个值，可以被后代组件注入。

`provide()` 接受两个参数：第一个参数是要注入的 key，可以是一个字符串或者一个 symbol，第二个参数是要注入的值。

与注册生命周期钩子的 API 类似，`provide()` 必须在组件的 `setup()` 阶段同步调用。

```vue
<script setup>
    import { provide } from 'vue'

    provide(/* 注入名 */ 'message', /* 值 */ 'hello!')
</script>
```



#### Inject() [#](https://cn.vuejs.org/guide/components/provide-inject.html#app-level-provide)

要注入上层组件提供的数据，需使用 [`inject()`](https://cn.vuejs.org/api/composition-api-dependency-injection.html#inject) 函数：

```vue
<script setup>
    import { inject } from 'vue'

    const message = inject('message')
</script>
```



[带有响应性的 provide + inject 完整示例](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHNjcmlwdCBzZXR1cD5cbmltcG9ydCB7IHJlZiwgcHJvdmlkZSB9IGZyb20gJ3Z1ZSdcbmltcG9ydCBDaGlsZCBmcm9tICcuL0NoaWxkLnZ1ZSdcblxuLy8gYnkgcHJvdmlkaW5nIGEgcmVmLCB0aGUgR3JhbmRDaGlsZFxuLy8gY2FuIHJlYWN0IHRvIGNoYW5nZXMgaGFwcGVuaW5nIGhlcmUuXG5jb25zdCBtZXNzYWdlID0gcmVmKCdoZWxsbycpXG5wcm92aWRlKCdtZXNzYWdlJywgbWVzc2FnZSlcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxpbnB1dCB2LW1vZGVsPVwibWVzc2FnZVwiPlxuICA8Q2hpbGQgLz5cbjwvdGVtcGxhdGU+IiwiaW1wb3J0LW1hcC5qc29uIjoie1xuICBcImltcG9ydHNcIjoge1xuICAgIFwidnVlXCI6IFwiaHR0cHM6Ly9zZmMudnVlanMub3JnL3Z1ZS5ydW50aW1lLmVzbS1icm93c2VyLmpzXCJcbiAgfVxufSIsIkNoaWxkLnZ1ZSI6IjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgR3JhbmRDaGlsZCBmcm9tICcuL0dyYW5kQ2hpbGQudnVlJ1xuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPEdyYW5kQ2hpbGQgLz5cbjwvdGVtcGxhdGU+IiwiR3JhbmRDaGlsZC52dWUiOiI8c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgaW5qZWN0IH0gZnJvbSAndnVlJ1xuXG5jb25zdCBtZXNzYWdlID0gaW5qZWN0KCdtZXNzYWdlJylcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxwPlxuICAgIE1lc3NhZ2UgdG8gZ3JhbmQgY2hpbGQ6IHt7IG1lc3NhZ2UgfX1cbiAgPC9wPlxuPC90ZW1wbGF0ZT4ifQ==)



#### 和响应式数据配合使用

```vue
<!-- 在供给方组件内 -->
<script setup>
    import { provide, ref } from 'vue'
    const location = ref('North Pole')
    function updateLocation() {
        location.value = 'South Pole'
    }
    provide('location', {
        location,
        updateLocation
    })
</script>
```

```vue
<!-- 在注入方组件 -->
<script setup>
    import { inject } from 'vue'
    const { location, updateLocation } = inject('location')
</script>

<template>
	<button @click="updateLocation">{{ location }}</button>
</template>
```

```js
const app = Vue.createApp({
    setup() {
        const { provide, ref, readonly } = Vue;
   	    const name = ref('dell');
        provide('name', readonly(name));
        provide('changeName', (value) => {
            name.value = value;
        });
        return {}
    },
    template: `
	    <div>
		    <child />
	    </div>
      `,
});

app.component('child', {
    setup() {
         const { inject } = Vue;
         const name = inject('name');
         const changeName = inject('changeName');
         const handleClick = () => {
             changeName('lee');
         }
         return { name, handleClick }
     },
    template: '<div @click="handleClick">{{name}}</div>'
})
```

最后，如果你想确保提供的数据不能被注入方的组件更改，你可以使用 [`readonly()`](https://cn.vuejs.org/api/reactivity-core.html#readonly) 来包装提供的值。

```vue
<script setup>
    import { ref, provide, readonly } from 'vue'
    const count = ref(0)
    provide('read-only-count', readonly(count))
</script>
```



## 全局 API

Global API

### 应用实例

- [createApp()](https://cn.vuejs.org/api/application.html#createapp)
- [createSSRApp()](https://cn.vuejs.org/api/application.html#createssrapp)
- [app.mount()](https://cn.vuejs.org/api/application.html#app-mount)
- [app.unmount()](https://cn.vuejs.org/api/application.html#app-unmount)
- [app.provide()](https://cn.vuejs.org/api/application.html#app-provide)
- [app.component()](https://cn.vuejs.org/api/application.html#app-component)
- [app.directive()](https://cn.vuejs.org/api/application.html#app-directive)
- [app.use()](https://cn.vuejs.org/api/application.html#app-use)
- [app.mixin()](https://cn.vuejs.org/api/application.html#app-mixin)
- [app.version](https://cn.vuejs.org/api/application.html#app-version)
- [app.config](https://cn.vuejs.org/api/application.html#app-config)
- [app.config.errorHandler](https://cn.vuejs.org/api/application.html#app-config-errorhandler)
- [app.config.warnHandler](https://cn.vuejs.org/api/application.html#app-config-warnhandler)
- [app.config.performance](https://cn.vuejs.org/api/application.html#app-config-performance)
- [app.config.compilerOptions](https://cn.vuejs.org/api/application.html#app-config-compileroptions)
- [app.config.globalProperties](https://cn.vuejs.org/api/application.html#app-config-globalproperties)
- [app.config.optionMergeStrategies](https://cn.vuejs.org/api/application.html#app-config-optionmergestrategies)



### nextTick()[#](https://cn.vuejs.org/api/general.html#nexttick)

等待下一次 DOM 更新刷新的工具方法。

- **详细信息**

  当你在 Vue 中更改响应式状态时，最终的 DOM 更新并不是同步生效的，而是由 Vue 将它们缓存在一个队列中，直到下一个“tick”才一起执行。这样是为了确保每个组件无论发生多少状态改变，都仅执行一次更新。

  `nextTick()` 可以在状态改变后立即使用，以等待 DOM 更新完成。你可以传递一个回调函数作为参数，或者 await 返回的 Promise。

  ```vue
  <script setup>
      import { ref, nextTick } from 'vue'
  
      const count = ref(0)
  
      async function increment() {
          count.value++
  
          // DOM 还未更新
          console.log(document.getElementById('counter').textContent) // 0
  
          await nextTick()
          // DOM 此时已经更新
          console.log(document.getElementById('counter').textContent) // 1
      }
  </script>
  
  <template>
  	<button id="counter" @click="increment">{{ count }}</button>
  </template>
  ```

- **参考**：[`this.$nextTick()`](https://cn.vuejs.org/api/component-instance.html#nexttick)

### defineComponent()[#](https://cn.vuejs.org/api/general.html#definecomponent)

在定义 Vue 组件时提供类型推导的辅助函数。

- **详细信息**

  第一个参数是一个组件选项对象。返回值将是该选项对象本身，因为该函数实际上在运行时没有任何操作，仅用于提供类型推导。

  注意返回值的类型有一点特别：它会是一个构造函数类型，它的实例类型是根据选项推断出的组件实例类型。这是为了能让该返回值在 TSX 中用作标签时提供类型推导支持。

  你可以像这样从 `defineComponent()` 的返回类型中提取出一个组件的实例类型 (与其选项中的 `this` 的类型等价)：

  ### webpack Treeshaking 的注意事项[#](https://cn.vuejs.org/api/general.html#note-on-webpack-treeshaking)

  因为 `defineComponent()` 是一个函数调用，所以它可能被某些构建工具认为会产生副作用，如 webpack。即使一个组件从未被使用，也有可能不被 tree-shake。

  为了告诉 webpack 这个函数调用可以被安全地 tree-shake，我们可以在函数调用之前添加一个 `/*#__PURE__*/` 形式的注释：

  ```js
  export default /*#__PURE__*/ defineComponent(/* ... */)
  ```

  请注意，如果你的项目中使用的是 Vite，就不需要这么做，因为 Rollup (Vite 背后在生产环境使用的打包器) 可以智能地确定 `defineComponent()` 实际上并没有副作用，所以无需手动注释。

- **参考**：[指南 - 配合 TypeScript 使用 Vue](https://cn.vuejs.org/guide/typescript/overview.html#general-usage-notes)



### defineAsyncComponent()[#](https://cn.vuejs.org/api/general.html#defineasynccomponent)

定义一个异步组件，它在运行时是懒加载的。参数可以是一个异步加载函数，或是对加载行为进行更具体定制的一个选项对象。



### defineCustomElement()[#](https://cn.vuejs.org/api/general.html#definecustomelement)

这个方法和 [`defineComponent`](https://cn.vuejs.org/api/general.html#definecomponent) 接受的参数相同，不同的是会返回一个原生[自定义元素](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements)类的构造器。

- **详细信息**

  除了常规的组件选项，`defineCustomElement()` 还支持一个特别的选项 `styles`，它应该是一个内联 CSS 字符串的数组，所提供的 CSS 会被注入到该元素的 shadow root 上。

  返回值是一个可以通过 [`customElements.define()`](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define) 注册的自定义元素构造器。

- **示例**

  ```js
  import { defineCustomElement } from 'vue'
  
  const MyVueElement = defineCustomElement({
    /* 组件选项 */
  })
  
  // 注册自定义元素
  customElements.define('my-vue-element', MyVueElement)
  ```

- **参考：**

  - [指南 - 使用 Vue 构建自定义元素](https://cn.vuejs.org/guide/extras/web-components.html#building-custom-elements-with-vue)
  - 另外请注意在使用单文件组件时 `defineCustomElement()` 需要[特殊的配置](https://cn.vuejs.org/guide/extras/web-components.html#sfc-as-custom-element)。



## 内置组件



### Teleport

传送模板

[`<Teleport>#`](https://cn.vuejs.org/guide/built-ins/teleport.html#basic-usage) 是一个内置组件，它可以将一个组件内部的一部分模板“传送”到该组件的 DOM 结构外层的位置去。

 `<Teleport>` 接收一个 `to` prop 来指定传送的目标。`to` 的值可以是一个 CSS 选择器字符串，也可以是一个 DOM 元素对象。这段代码的作用就是告诉 Vue“把以下模板片段**传送到 `body`** 标签下”。

```vue
<button @click="open = true">Open Modal</button>

<Teleport to="body">
    <div v-if="open" class="modal">
        <p>Hello from the modal!</p>
        <button @click="open = false">Close</button>
    </div>
</Teleport>
```

我们也可以将`<Teleport>` 和 [`<Transition>`](https://cn.vuejs.org/guide/built-ins/transition.html) 结合使用来创建一个带动画的模态框。你可以看看[这个示例](https://cn.vuejs.org/examples/#modal)。

> TIP
>
> 挂载时，传送的 `to` 目标必须已经存在于 DOM 中。理想情况下，这应该是整个 Vue 应用 DOM 树外部的一个元素。如果目标元素也是由 Vue 渲染的，你需要确保在挂载 `` 之前先挂载该元素。



### Suspense

异步组件

[`<Suspense>#`](https://cn.vuejs.org/guide/built-ins/suspense.html#suspense) 是一个内置组件，用来在组件树中协调对异步依赖的处理。它让我们可以在组件树上层等待下层的多个嵌套异步依赖项解析完成，并可以在等待时渲染一个加载状态。

`<Suspense>` 组件有两个插槽：`#default` 和 `#fallback`。两个插槽都只允许**一个**直接子节点。在可能的时候都将显示默认槽中的节点。否则将显示后备槽中的节点。

```vue
<Suspense>
    <!-- 具有深层异步依赖的组件 -->
    <template #default>
     	<Dashboard1 />
     	<Dashboard2 />
    </template>
   
    <!-- 在 #fallback 插槽中显示 “正在加载中” -->
    <template #fallback>
		Loading...
    </template>
</Suspense>
```

在初始渲染时，`<Suspense>` 将在内存中渲染其默认的插槽内容。如果在这个过程中遇到任何异步依赖，则会进入**挂起**状态。在挂起状态期间，展示的是后备内容。当所有遇到的异步依赖都完成后，`<Suspense>` 会进入**完成**状态，并将展示出默认插槽的内容。

如果在初次渲染时没有遇到异步依赖，`<Suspense>` 会直接进入完成状态。

进入完成状态后，只有当默认插槽的根节点被替换时，`<Suspense>` 才会回到挂起状态。组件树中新的更深层次的异步依赖**不会**造成 `<Suspense>` 回退到挂起状态。

发生回退时，后备内容不会立即展示出来。相反，`<Suspense>` 在等待新内容和异步依赖完成时，会展示之前 `#default` 插槽的内容。这个行为可以通过一个 `timeout` prop 进行配置：在等待渲染新内容耗时超过 `timeout` 之后，`<Suspense>` 将会切换为展示后备内容。若 `timeout` 值为 `0` 将导致在替换默认内容时立即显示后备内容。



错误处理[#](https://cn.vuejs.org/guide/built-ins/suspense.html#error-handling)

`<Suspense>` 组件自身目前还不提供错误处理，不过你可以使用 [`errorCaptured`](https://cn.vuejs.org/api/options-lifecycle.html#errorcaptured) 选项或者 [`onErrorCaptured()`](https://cn.vuejs.org/api/composition-api-lifecycle.html#onerrorcaptured) 钩子，在使用到 `` 的父组件中捕获和处理异步错误。



## 组合式函数

把一些逻辑上重复的代码提取到一个函数中。

### useMousePosition()

封装鼠标点击位置的函数

```js
import { ref, onMounted, onUnmounted } from "vue";
function useMousePosition() {
    const x = ref(0);
    const y = ref(0);
    const onMouseMove = (e: MouseEvent) => {
        x.value = e.pageX;
        y.value = e.pageY;
    };
    onMounted(() => {
        document.addEventListener("click", onMouseMove);
    });
    onUnmounted(() => {
        document.removeEventListener("click", onMouseMove);
    });
    return { x, y };
}
export default useMousePosition;
```



### useURLLoader()

异步请求加载状态的函数

```js
// hooks/useURLLoader.js
import { ref } from "vue";
import axios from "axios";

function useURLLoader(url: string) {
  const result = ref(null);
  const loading = ref(true);
  const loaded = ref(false);
  const error = ref(null);
  axios
    .get(url)
    .then((res) => {
      result.value = res.data;
      loading.value = false;
      loaded.value = true;
    })
    .catch((err) => {
      error.value = err;
      loading.value = false;
    });
  return { result, loading, loaded, error };
}

export default useURLLoader;
```

在需要用到此方法的页面中调用

```js
import useMousePosition from "./hooks/useMousePosition";
import useURLLoader from "./hooks/useURLLoader";
setup() {
    const { x: mouseX, y: mouseY } = useMousePosition();
    const { result, loading, loaded } = useURLLoader(
      "https://dog.ceo/api/breeds/image/random"
    );
    return { mouseX, mouseY, result, loading, loaded }
}
```



### useClickOutside()

是否点击一个元素的外部

```js
import { ref, onMounted, onUnmounted, Ref } from 'vue'
const useClickOutside = (elementRef: Ref<null | HTMLElement>) => {
    const isClickOutside = ref(false)
    const handler = (e: MouseEvent) => {
        if(elementRef.value) {
            if(elementRef.value.contains(e.target as HTMLElement)) {
                isClickOutside.value = false
            } else {
                isClickOutside.value = true
            }
        }
    }
    onMounted(() => {
        document.addEventListener('click', handler)
    })
    onUnmounted(() => {
        document.removeEventListener('click', handler)
    })
    return isClickOutside
}
export default useClickOutside

```

