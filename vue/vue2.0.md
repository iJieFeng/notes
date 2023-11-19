# vue2.0

## 起步

官网：https://cn.vuejs.org/

安装：

- cdn

  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>

​		<script src="https://unpkg.com/vue@next"></script>

- cli：

  ```json
  npm install -g @vue/cli
  npm install -g @vue/cli@4.5.9 
  npm uninstall vue-cli -g
  ```



  ```
## MMVM

jquery和框架的区别

- 数据与视图分离，解耦（开放封闭原则）
- 以数据驱动视图，只关心数据变化，dom操作被封装

mvc

m：model 数据模型

v：view 视图

c：controller 控制器

**MVVM理解**

Mode：模型、数据

View：视图、模板（视图和模型是分离的）

ViewModel：连接model和view

**MVVM三要素**

- 响应式：vue如何监听到data的变化？
- 模板引擎：vue的模板如何被解析，指令如何处理？
- 渲染：vue的模板如何被渲染成html？以及渲染过程

响应式：修改data属性后，vue立即监听到，data属性被代理到vm（this）上

vue如何实现响应式：Object.defineProperty()

​```js
// 传统写法，无法监听
var obj = {
    name: "张三",
    age: "18"
}
obj.name = "李四" // 无法监听到
console.log(obj.name) // 无法监听到

// 使用Object.defineProperty() 可以监听对象中属性的变化
var obj = {};
var _name = "张三";
Object.defineProperty(obj, "name", {
    get: function () {
    	console.log("get=>", _name);
    	return _name;
	},
    set: function (newVal) {
        console.log("set=>", newVal);
        _name = newVal;
     },
});
console.log(obj.name); // 获取值 可以监听到
obj.name = "李四"; // 修改值 可以监听到

// vue响应式
var vm = new Vue({
    el: "#app",
    data: {
        name: "张三",
        age: "18",
    },
}); 
// 利用Object.defineProperty() 模拟vue响应式
var vm = {};
var data = {
    name: "张三",
    age: "18",
};
var key, value;
for (key in data) {
    (function (key) {
        Object.defineProperty(vm, key, {
            get: function () {
                console.log("get=>", data[key]); // 监听
                return data[key];
            },
            set: function (newVal) {
              	console.log("set=>", newVal); // 监听
              	data[key] = newVal;
            },
        });
    })(key);
}
  ```



模板：

- 本质：字符串，有逻辑，如v-if v-for，与html格式很像，但是有很大区别，最终还是要转换为html来显示

- 模板必须转换为js代码，才能处理逻辑、变量，渲染成html

- vue解析模板，其实就是把模板转换成一个JS函数（render函数）

  

render函数：render函数执行返回vnode

![image-20220301114801619](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220301114801619.png)



render函数和vdom

- updateComponent中实现了vdom的patch
- 页面首次渲染执行updateComponent
- date中每次修改属性，执行updateComponent

![image-20220301122021120](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220301122021120.png)



vue整体流程

第一步：解析模板成render函数

第二部：响应式开始监听

第三部：首次渲染。显示页面，且绑定依赖

第四部：data属性变化，触发rerender



## VDOM

vdom，virtual dom即虚拟dom：用js模拟dom结构

| 真实dom                                                      | 虚拟dom                                                      |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| ![image-20220228120701487](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220228120701487.png) | ![image-20220228120735648](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220228120735648.png) |

为什么会有vdom：dom操作是'昂贵'的，将dom对比操作放在js层，提高效率

如何使用vdom：可了解snabbdom

**核心api**

- h函数 => 生成vnode节点

- patch函数 => 将vnode节点渲染到页面上

  path(container, vnode)  页面初次加载

  path(vnode, newVnode)  数据变化

**diff算法**

- diff算法是linux基础命令，比如diff one.txt two.txt。结果是展示出两个文件的不同。
- git diff查看一个文件的两个版本的区别

**vdom为何使用diff算法**

- dom操作是昂贵的，因此尽量减少dom操作
- vdom中应用diff算法是为了找出需要更新的节点
- diff算法的实现，关注patch。patch(container，vnode)，patch(vnode, newVnode)
- 核心逻辑。createElement和updateChildren

**diff实现过程**

1、patch(container，vnode)：将vnode转换成dom结构

2、patch(vnode, newVnode)：更新内容



## **生命周期**

created，mounted，updated，uploaded



## 基础语法

### **模板语法**

插值表达式({{}})，指令(v-)，修饰符

### **计算属性**

模板内的表达式非常便利，但是设计它们的初衷是用于简单运算的。在模板中放入太多的逻辑会让模板过重且难以维护。

```html
<!-- 不推荐写法 -->
<div id="example">
  {{ message.split('').reverse().join('') }}
</div>
<!-- 推荐写法 -->
<div id="example">
  <p>Original message: "{{ message }}"</p>
  <p>Computed reversed message: "{{ reversedMessage }}"</p>
</div>
```

```js
var vm = new Vue({
  el: '#example',
  data: {
    message: 'Hello'
  },
  computed: {
    // 计算属性的 getter
    reversedMessage: function () {
      // `this` 指向 vm 实例
      return this.message.split('').reverse().join('')
    }
  }
})
```

**计算属性vs方法**

**计算属性是基于它们的响应式依赖进行缓存的**。只在相关响应式依赖发生改变时它们才会重新求值。

相比之下，每当触发重新渲染时，调用方法将**总会**再次执行函数。

**计算属性 vs 监听属性**

```html
<div id="demo">{{ fullName }}</div>
```

```js
var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar',
    fullName: 'Foo Bar'
  },
  watch: {
    firstName: function (val) {
      this.fullName = val + ' ' + this.lastName
    },
    lastName: function (val) {
      this.fullName = this.firstName + ' ' + val
    }
  }
})
```

```js
var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar'
  },
  computed: {
    fullName: function () {
      return this.firstName + ' ' + this.lastName
    }
  }
})
```

**计算属性的 setter**

```js
// ...
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
// ...
```

### **watch**



### 样式绑定





## 组件

组件的封装和复用，提高开发效率和方便项目维护。

组件的封装包括封装视图、数据、变化逻辑。

组件的复用包括数据、属性传递、复用

### 组件注册

注册全局组件

```js
const app = Vue.createApp({...})

app.component('my-component-name', {
  /* ... */
})
```

局部注册

```js
const ComponentA = {
    /* ... */
}

const app = Vue.createApp({
    components: {
        'component-a': ComponentA,
    }
})
```

**局部注册的组件使用组件**

```js
const ComponentA = {
    /* ... */
}

const ComponentB = {
    components: {
        'component-a': ComponentA
    }
    // ...
}
```

**在模块系统中局部注册**

```js
import ComponentA from './ComponentA'
import ComponentC from './ComponentC'

export default {
  components: {
    ComponentA,
    ComponentC
  }
  // ...
}
```



### props

**传入一个对象的所有 property**

如果想要将一个对象的所有 property 都作为 prop 传入，可以使用不带参数的 `v-bind` (用 `v-bind` 代替 `:prop-name`)。例如，对于一个给定的对象 `post`：

```js
post: {
  id: 1,
  title: 'My Journey with Vue'
}
```

下面的模板：

```html
<blog-post v-bind="post"></blog-post>
```

等价于：

```html
<blog-post v-bind:id="post.id" v-bind:title="post.title"></blog-post>
```



### **单向数据流**

所有的 prop 都使得其父子 prop 之间形成了一个**单向下行绑定**：父级 prop 的更新会向下流动到子组件中，但是反过来则不行。这样会防止从子组件意外变更父级组件的状态，从而导致你的应用的数据流向难以理解。

每次父级组件发生变更时，子组件中所有的 prop 都将会刷新为最新的值。这意味着你**不**应该在一个子组件内部改变 prop。如果你这样做了，Vue 会在浏览器的控制台中发出警告。

这里有两种常见的试图变更一个 prop 的情形：

1. **这个 prop 用来传递一个初始值；这个子组件接下来希望将其作为一个本地的 prop 数据来使用**。在这种情况下，最好定义一个本地的 data property 并将这个 prop 作为其初始值：

```js
props: ['initialCounter'],
data() {
  return {
    counter: this.initialCounter
  }
}
```

2. **这个 prop 以一种原始的值传入且需要进行转换**。在这种情况下，最好使用这个 prop 的值来定义一个计算属性：

```js
props: ['size'],
computed: {
  normalizedSize() {
    return this.size.trim().toLowerCase()
  }
}
```

警告：注意在 JavaScript 中对象和数组是通过引用传入的，所以对于一个数组或对象类型的 prop 来说，在子组件中改变这个对象或数组本身**将会**影响到父组件的状态，且 Vue 无法为此向你发出警告。作为一个通用规则，应该避免修改任何 prop，包括对象和数组，因为这种做法无视了单向数据绑定，且可能会导致意料之外的结果。



### **Prop 验证**

我们可以为组件的 prop 指定验证要求，例如你知道的这些类型。如果有一个要求没有被满足，则 Vue 会在浏览器控制台中警告你。这在开发一个会被别人用到的组件时尤其有帮助。

为了定制 prop 的验证方式，你可以为 `props` 中的值提供一个带有验证要求的对象，而不是一个字符串数组。

```js
app.component('my-component', {
    props: {
        // 基础的类型检查 (`null` 和 `undefined` 值会通过任何类型验证)
        propA: Number,
        // 多个可能的类型
        propB: [String, Number],
        // 必填的字符串
        propC: {
            type: String,
            required: true
        },
        // 带有默认值的数字
        propD: {
            type: Number,
            default: 100
        },
        // 带有默认值的对象
        propE: {
            type: Object,
            // 对象或数组的默认值必须从一个工厂函数返回
            default() {
                return { message: 'hello' }
            }
        },
        // 自定义验证函数
        propF: {
            validator(value) {
                // 这个值必须与下列字符串中的其中一个相匹配
                return ['success', 'warning', 'danger'].includes(value)
            }
        },
        // 具有默认值的函数
        propG: {
            type: Function,
            // 与对象或数组的默认值不同，这不是一个工厂函数——这是一个用作默认值的函数
            default() {
                return 'Default function'
            }
        }
    }
})
```

当 prop 验证失败的时候，(开发环境构建版本的) Vue 将会产生一个控制台的警告。

提示

注意 prop 会在一个组件实例创建**之前**进行验证，所以实例的 property (如 `data`、`computed`等) 在 `default` 或 `validator` 函数中是不可用的。

组件间传值与校验



### 非 Prop 的 Attribute

一个非 prop 的 attribute 是指传向一个组件，但是该组件并没有相应 [props](https://v3.cn.vuejs.org/guide/component-props.html) 或 [emits](https://v3.cn.vuejs.org/guide/component-custom-events.html#定义自定义事件) 定义的 attribute。常见的示例包括 `class`、`style` 和 `id` attribute。可以通过 `$attrs` property 访问那些 attribute。

**Attribute 继承**

如果我们需要通过 `data-status` attribute 定义 `<date-picker>` 组件的状态，它将应用于根节点 (即 `div.date-picker`)。

```html
<!-- 具有非 prop 的 attribute 的 date-picker 组件-->
<date-picker data-status="activated"></date-picker>

<!-- 渲染后的 date-picker 组件 -->
<div class="date-picker" data-status="activated">
  <input type="datetime-local" />
</div>
```

同样的规则也适用于事件监听器：

```html
<date-picker @change="submitChange"></date-picker>
```

```js
app.component('date-picker', {
  created() {
    console.log(this.$attrs) // { onChange: () => {}  }
  }
})
```

当一个具有 `change` 事件的 HTML 元素作为 `date-picker` 的根元素时，这可能会有帮助。

```js
app.component('date-picker', {
  template: `
    <select>
      <option value="1">Yesterday</option>
      <option value="2">Today</option>
      <option value="3">Tomorrow</option>
    </select>
  `
})
```

在这种情况下，`change` 事件监听器将从父组件传递到子组件，它将在原生 `<select>` 的 `change` 事件上触发。我们不需要显式地从 `date-picker` 发出事件：

```html
<div id="date-picker" class="demo">
  <date-picker @change="showChange"></date-picker>
</div>
```

```js
const app = Vue.createApp({
  methods: {
    showChange(event) {
      console.log(event.target.value) // 将打印所选选项的值
    }
  }
})
```

**禁用 Attribute 继承**

如果你**不**希望组件的根元素继承 attribute，可以在组件的选项中设置 `inheritAttrs: false`。

禁用 attribute 继承的常见场景是需要将 attribute 应用于根节点之外的其他元素。

通过将 `inheritAttrs` 选项设置为 `false`，你可以使用组件的 `$attrs` property 将 attribute 应用到其它元素上，该 property 包括组件 `props` 和 `emits` property 中未包含的所有属性 (例如，`class`、`style`、`v-on` 监听器等)。

使用 date-picker 组件示例，如果需要将所有非 prop 的 attribute 应用于 `input` 元素而不是根 `div` 元素，可以使用 `v-bind` 缩写来完成。

```js
app.component('date-picker', {
  inheritAttrs: false,
  template: `
    <div class="date-picker">
      <input type="datetime-local" v-bind="$attrs" />
    </div>
  `
})
```

有了这个新配置，`data-status` attribute 将应用于 `input` 元素！

```html
<!-- date-picker 组件使用非 prop 的 attribute -->
<date-picker data-status="activated"></date-picker>

<!-- 渲染后的 date-picker 组件 -->
<div class="date-picker">
  <input type="datetime-local" data-status="activated" />
</div>
```

**多个根节点上的 Attribute 继承**

与单个根节点组件不同，具有多个根节点的组件不具有自动 attribute [fallthrough (隐式贯穿)](https://en.wiktionary.org/wiki/fall-through#English) 行为。如果未显式绑定 `$attrs`，将发出运行时警告。

```html
<custom-layout id="custom-layout" @click="changeValue"></custom-layout>
```

```js
// 这将发出警告
app.component('custom-layout', {
  template: `
    <header>...</header>
    <main>...</main>
    <footer>...</footer>
  `
})
// 没有警告，$attrs 被传递到 <main> 元素
app.component('custom-layout', {
  template: `
    <header>...</header>
    <main v-bind="$attrs">...</main>
    <footer>...</footer>
  `
})
```



### 自定义事件

```js
this.$emit('myEvent')
```

```html
<my-component @myEvent="doSomething"></my-component>
```



### 插槽

```html
<todo-button>
    Add todo
</todo-button>
```

```html
<!-- todo-button 组件模板 -->
<button class="btn-primary">
    <slot></slot>
</button>

<!-- 当组件渲染的时候，`<slot></slot>` 将会被替换为“Add todo”。 -->
<!-- 渲染 HTML -->
<button class="btn-primary">
    Add todo
</button>
```

不过，字符串只是开始！插槽还可以包含任何模板代码，包括 HTML，或其他组件

```html
<todo-button>
    <!-- 添加一个 Font Awesome 图标 -->
    <i class="fas fa-plus"></i>
    Add todo
</todo-button>

<todo-button>
    <!-- 添加一个图标的组件 -->
    <font-awesome-icon name="plus"></font-awesome-icon>
    Add todo
</todo-button>
```

如果 `<todo-button>` 的 template 中**没有**包含一个 `<slot>` 元素，则该组件起始标签和结束标签之间的任何内容都会被抛弃。

```html
<!-- todo-button 组件模板 -->
<button class="btn-primary">
  Create a new item
</button>
```

```html
<todo-button>
  <!-- 以下文本不会渲染 -->
  Add todo
</todo-button>
```



**渲染作用域**

> 父级模板里的所有内容都是在父级作用域中编译的；子模板里的所有内容都是在子作用域中编译的。



**备用内容**

```html
<!-- <submit-button>组件 -->
<button type="submit">
    <slot>Submit</slot>
</button>

<!-- 现在当我们在一个父级组件中使用 `<submit-button>` 并且不提供任何插槽内容时：备用内容“Submit”将会被渲染 -->
<submit-button></submit-button>
<!-- 渲染后 -->
<button type="submit">
    Submit
</button>

<!-- 如果提供内容： 则这个提供的内容将会被渲染从而取代备用内容-->
<submit-button>
    Save
</submit-button>
<!-- 渲染后 -->
<button type="submit">
    Save
</button>
```



**具名插槽**

定义<base-layout>组件

```html
<div class="container">
    <slot name="header"></slot>
    <slot></slot>
    <slot name="footer"></slot>
</div>
```

使用<base-layout>组件

```html
<base-layout>
    <template v-slot:header>
        <h1>Here might be a page title</h1>
    </template>

    <template v-slot:default>
        <p>A paragraph for the main content.</p>
        <p>And another one.</p>
    </template>

    <template v-slot:footer>
        <p>Here's some contact info</p>
    </template>
</base-layout>
```

注意，**`v-slot` 只能添加在 `<template>` 上** ([只有一种例外情况](https://v3.cn.vuejs.org/guide/component-slots.html#独占默认插槽的缩写语法))



**作用域插槽**

定义<todo-list>组件

```html
<ul>
  <li v-for="( item, index ) in items">
    <slot :item="item"></slot>
  </li>
</ul>
```

可以根据自己的需要将任意数量的 attribute 绑定到 `slot` 上：

```html
<ul>
  <li v-for="( item, index ) in items">
    <slot :item="item" :index="index" :another-attribute="anotherAttribute"></slot>
  </li>
</ul>
```

绑定在 `<slot>` 元素上的 attribute 被称为**插槽 prop**。现在，在父级作用域中，我们可以使用带值的 `v-slot` 来定义我们提供的插槽 prop 的名字：

```html
<todo-list>
  <template v-slot:default="slotProps">
    <i class="fas fa-check"></i>
    <span class="green">{{ slotProps.item }}</span>
  </template>
</todo-list>
```



**解构插槽 Prop**

可以使用 [ES2015 解构](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Object_destructuring) 来传入具体的插槽 prop，如下：

```html
<todo-list v-slot="{ item }">
  <i class="fas fa-check"></i>
  <span class="green">{{ item }}</span>
</todo-list>
```

这样可以使模板更简洁，尤其是在该插槽提供了多个 prop 的时候。它同样开启了 prop 重命名等其它可能，例如将 `item` 重命名为 `todo`：

```html
<todo-list v-slot="{ item: todo }">
  <i class="fas fa-check"></i>
  <span class="green">{{ todo }}</span>
</todo-list>
```

你甚至可以定义备用内容，用于插槽 prop 是 undefined 的情形：

```html
<todo-list v-slot="{ item = 'Placeholder' }">
  <i class="fas fa-check"></i>
  <span class="green">{{ item }}</span>
</todo-list>
```



**具名插槽的缩写**

跟 `v-on` 和 `v-bind` 一样，`v-slot` 也有缩写，即把参数之前的所有内容 (`v-slot:`) 替换为字符 `#`。例如 `v-slot:header` 可以被重写为 `#header`：

```html
<base-layout>
    <template #header>
        <h1>Here might be a page title</h1>
    </template>

    <template #default>
        <p>A paragraph for the main content.</p>
        <p>And another one.</p>
    </template>

    <template #footer>
        <p>Here's some contact info</p>
    </template>
</base-layout>
```



### Provide / Inject

```js
const app = Vue.createApp({})

app.component('todo-list', {
  data() {
    return {
      todos: ['Feed a cat', 'Buy tickets']
    }
  },
  provide: {
    user: 'John Doe'
  },
  template: `
    <div>
      {{ todos.length }}
      <!-- 模板的其余部分 -->
    </div>
  `
})

app.component('todo-list-statistics', {
  inject: ['user'],
  created() {
    console.log(`Injected property: ${this.user}`) // > 注入的 property: John Doe
  }
})
```

但是，如果我们尝试在此处 provide 一些组件的实例 property，这将是不起作用的

要访问组件实例 property，我们需要将 `provide` 转换为返回对象的函数：

```js
app.component('todo-list', {
  data() {
    return {
      todos: ['Feed a cat', 'Buy tickets']
    }
  },
  provide() {
    return {
      todoLength: this.todos.length
    }
  },
  template: `
    ...
  `
})
```

在上面的例子中，如果我们更改了 `todos` 的列表，这个变化并不会反映在 inject 的 `todoLength`property 中。这是因为默认情况下，`provide/inject` 绑定*并不是*响应式的。我们可以通过传递一个 `ref` property 或 `reactive` 对象给 `provide` 来改变这种行为。在我们的例子中，如果我们想对祖先组件中的更改做出响应，我们需要为 provide 的 `todoLength` 分配一个组合式 API `computed` property：

```js
app.component('todo-list', {
  // ...
  provide() {
    return {
      todoLength: Vue.computed(() => this.todos.length)
    }
  }
})

app.component('todo-list-statistics', {
  inject: ['todoLength'],
  created() {
    console.log(`Injected property: ${this.todoLength.value}`) // > 注入的 property: 5
  }
})
```



### 动态组件 & 异步组件

**在动态组件上使用 `keep-alive`**

```html
<!-- 失活的组件将会被缓存！-->
<keep-alive>
  <component :is="currentTabComponent"></component>
</keep-alive>
```

**异步组件**

在大型应用中，我们可能需要将应用分割成小一些的代码块，并且只在需要的时候才从服务器加载一个模块。为了实现这个效果，Vue 有一个 `defineAsyncComponent` 方法：

```js
const { createApp, defineAsyncComponent } = Vue

const app = createApp({})

const AsyncComp = defineAsyncComponent(
  () =>
    new Promise((resolve, reject) => {
      resolve({
        template: '<div>I am async!</div>'
      })
    })
)

app.component('async-example', AsyncComp)
```

如你所见，此方法接受一个返回 `Promise` 的工厂函数。从服务器检索组件定义后，应调用 Promise 的 `resolve` 回调。你也可以调用 `reject(reason)`，来表示加载失败。

你也可以在工厂函数中返回一个 `Promise`，把 webpack 2 及以上版本和 ES2015 语法相结合后，我们就可以这样使用动态地导入：

```js
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() =>
  import('./components/AsyncComponent.vue')
)

app.component('async-component', AsyncComp)
```

当[在局部注册组件](https://v3.cn.vuejs.org/guide/component-registration.html#局部注册)时，你也可以使用 `defineAsyncComponent`：

```js
import { createApp, defineAsyncComponent } from 'vue'

createApp({
  // ...
  components: {
    AsyncComponent: defineAsyncComponent(() =>
      import('./components/AsyncComponent.vue')
    )
  }
})
```

**与 Suspense 一起使用**

异步组件在默认情况下是*可挂起*的。这意味着如果它在父链中有一个 `<Suspense>`，它将被视为该 `<Suspense>` 的异步依赖。在这种情况下，加载状态将由 `<Suspense>` 控制，组件自身的加载、错误、延迟和超时选项都将被忽略。

通过在其选项中指定 `suspensible: false`，异步组件可以退出 `Suspense` 控制，并始终控制自己的加载状态。

你可以在 [API 参考](https://v3.cn.vuejs.org/api/global-api.html#参数-4)查看更多可用的选项。







## 动画





## 过滤器

Vue.js 允许你自定义过滤器，可被用于一些常见的文本格式化。过滤器可以用在两个地方：**双花括号插值和 `v-bind` 表达式** (后者从 2.1.0+ 开始支持)。过滤器应该被添加在 JavaScript 表达式的尾部，由“管道”符号指示：

```html
<!-- 在双花括号中 -->
{{ message | capitalize }}

<!-- 在 `v-bind` 中 -->
<div v-bind:id="rawId | formatId"></div>
```

你可以在一个组件的选项中定义本地的过滤器：

```js
filters: {
  capitalize: function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  }
}
```

或者在创建 Vue 实例之前全局定义过滤器：

```js
Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

new Vue({
  // ...
})
```

当全局过滤器和局部过滤器重名时，会采用局部过滤器。

下面这个例子用到了 `capitalize` 过滤器：

John

过滤器函数总接收表达式的值 (之前的操作链的结果) 作为第一个参数。在上述例子中，`capitalize` 过滤器函数将会收到 `message` 的值作为第一个参数。

过滤器可以串联：

```html
{{ message | filterA | filterB }}
```

在这个例子中，`filterA` 被定义为接收单个参数的过滤器函数，表达式 `message` 的值将作为参数传入到函数中。然后继续调用同样被定义为接收单个参数的过滤器函数 `filterB`，将 `filterA` 的结果传递到 `filterB` 中。

过滤器是 JavaScript 函数，因此可以接收参数：

```html
{{ message | filterA('arg1', arg2) }}
```

这里，`filterA` 被定义为接收三个参数的过滤器函数。其中 `message` 的值作为第一个参数，普通字符串 `'arg1'` 作为第二个参数，表达式 `arg2` 的值作为第三个参数。



## mixin

minxin（混入）：使用mixin目的是为了复用代码，一个混入对象可以包含<span style="color:yellow;">任意组件选项</span>。当组件使用混入对象时，所有混入对象的选项将被“混合”进入该组件本身的选项

注：

1、当组件和混入对象含有同名选项时，组件数据优先。

2、同名钩子函数都将被调用，混入对象的钩子将在组件自身钩子**之前**调用。

3、值为对象的选项，例如 `methods`、`components` 和 `directives`，将被合并为同一个对象。两个对象键名冲突时，取组件对象的键值对。

局部使用

```js
// 1、定义混用对象 mixins/commonCardMixin.js
import CommonCard from "../components/CommonCard";
export default {
  components: {
    CommonCard,
  },
  data() {
    return {
      message: "hello world",
    };
  },
};

// 2、在组件中引入并注册 mixins: [commonCardMixin]
import commonCardMixin from "../../mixins/commonCardMixin";
export default {
  mixins: [commonCardMixin],
  data() {
    return {
      msg: "CNM",
    };
  },
  created() {
    console.log(this.msg); // => CNM
    console.log(this.message); // => hello world
  }
};
```

全局使用

```js
// 2、在组件中引入并使用// 1、定义混用对象 mixins/commonMixin.js
export default {
  methods: {
    checkZeroInt(...arg) {
      const regexp = /^(0|\+?[1-9][0-9]{0,3})$/g
      if (arg.length === 3) {
        let object = arg[0],
          target = arg[1],
          value = arg[2]
        let number = !regexp.test(value) ? '' : value
        this.$set(object, target, number)
      } else {
        let target = arg[0],
          value = arg[1]
        let number = !regexp.test(value) ? '' : value
        this.$data[target] = number
      }
    }
  }
}

// 2、在main.js中引入并注册 Vue.mixin(Mixin)
import Mixin from '@/mixins/commonMixin'
Vue.mixin(Mixin)

// 3、在组件中可直接使用
```



## 自定义指令

注册一个全局自定义指令

```js
// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})
```

注册局部指令，组件中定义 `directives` 的选项：

```js
directives: {
  focus: {
    // 指令的定义
    inserted: function (el) {
      el.focus()
    }
  }
}
```

在组件模板中任何元素上使用

```html
<input v-focus>
```



**钩子函数**

一个指令定义对象可以提供如下几个钩子函数 (均为可选)：

- `bind`：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
- `inserted`：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
- `update`：所在组件的 VNode 更新时调用，**但是可能发生在其子 VNode 更新之前**。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新

- `componentUpdated`：指令所在组件的 VNode **及其子 VNode** 全部更新后调用。
- `unbind`：只调用一次，指令与元素解绑时调用。



**钩子函数参数**

指令钩子函数会被传入以下参数：

- `el`：指令所绑定的元素，可以用来直接操作 DOM。

- ```
  binding
  ```

  ：一个对象，包含以下 property：

  - `name`：指令名，不包括 `v-` 前缀。
  - `value`：指令的绑定值，例如：`v-my-directive="1 + 1"` 中，绑定值为 `2`。
  - `oldValue`：指令绑定的前一个值，仅在 `update` 和 `componentUpdated` 钩子中可用。无论值是否改变都可用。
  - `expression`：字符串形式的指令表达式。例如 `v-my-directive="1 + 1"` 中，表达式为 `"1 + 1"`。
  - `arg`：传给指令的参数，可选。例如 `v-my-directive:foo` 中，参数为 `"foo"`。
  - `modifiers`：一个包含修饰符的对象。例如：`v-my-directive.foo.bar` 中，修饰符对象为 `{ foo: true, bar: true }`。

- `vnode`：Vue 编译生成的虚拟节点。移步 [VNode API](https://cn.vuejs.org/v2/api/#VNode-接口) 来了解更多详情。

- `oldVnode`：上一个虚拟节点，仅在 `update` 和 `componentUpdated` 钩子中可用。

除了 `el` 之外，其它参数都应该是只读的，切勿进行修改。如果需要在钩子之间共享数据，建议通过元素的 [`dataset`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/dataset) 来进行。



**动态指令参数**

指令的参数可以是动态的。例如，在 `v-mydirective:[argument]="value"` 中，`argument` 参数可以根据组件实例数据进行更新！这使得自定义指令可以在应用中被灵活使用。

例如你想要创建一个自定义指令，用来通过固定布局将元素固定在页面上。我们可以像这样创建一个通过指令值来更新竖直位置像素值的自定义指令：

```js
<div id="baseexample">
  <p>Scroll down the page</p>
  <p v-pin="200">Stick me 200px from the top of the page</p>
</div>
Vue.directive('pin', {
  bind: function (el, binding, vnode) {
    el.style.position = 'fixed'
    el.style.top = binding.value + 'px'
  }
})

new Vue({
  el: '#baseexample'
})
```

这会把该元素固定在距离页面顶部 200 像素的位置。但如果场景是我们需要把元素固定在左侧而不是顶部又该怎么办呢？这时使用动态参数就可以非常方便地根据每个组件实例来进行更新。

```js
<div id="dynamicexample">
  <h3>Scroll down inside this section ↓</h3>
  <p v-pin:[direction]="200">I am pinned onto the page at 200px to the left.</p>
</div>
Vue.directive('pin', {
  bind: function (el, binding, vnode) {
    el.style.position = 'fixed'
    var s = (binding.arg == 'left' ? 'left' : 'top')
    el.style[s] = binding.value + 'px'
  }
})

new Vue({
  el: '#dynamicexample',
  data: function () {
    return {
      direction: 'left'
    }
  }
})
```

结果：

<iframe height="200" class="demo" scrolling="no" title="Dynamic Directive Arguments" src="https://codepen.io/team/Vue/embed/rgLLzb/?height=300&amp;theme-id=32763&amp;default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true" style="border: 1px solid rgb(238, 238, 238); border-radius: 2px; padding: 25px 35px; margin: 1em 0px 40px; user-select: none; overflow-x: auto; color: rgb(48, 68, 85); font-family: &quot;Source Sans Pro&quot;, &quot;Helvetica Neue&quot;, Arial, sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial; width: 700px;"></iframe>

**函数简写**

在很多时候，你可能想在 `bind` 和 `update` 时触发相同行为，而不关心其它的钩子。比如这样写：

```
Vue.directive('color-swatch', function (el, binding) {
  el.style.backgroundColor = binding.value
})
```



**对象字面量**

如果指令需要多个值，可以传入一个 JavaScript 对象字面量。记住，指令函数能够接受所有合法的 JavaScript 表达式。

```
<div v-demo="{ color: 'white', text: 'hello!' }"></div>
Vue.directive('demo', function (el, binding) {
  console.log(binding.value.color) // => "white"
  console.log(binding.value.text)  // => "hello!"
```





## 插件

插件通常用来为 Vue 添加全局功能。插件的功能范围没有严格的限制——一般有下面几种：

1. 添加全局方法或者 property。如：[vue-custom-element](https://github.com/karol-f/vue-custom-element)
2. 添加全局资源：指令/过滤器/过渡等。如 [vue-touch](https://github.com/vuejs/vue-touch)
3. 通过全局混入来添加一些组件选项。如 [vue-router](https://github.com/vuejs/vue-router)
4. 添加 Vue 实例方法，通过把它们添加到 `Vue.prototype` 上实现。
5. 一个库，提供自己的 API，同时提供上面提到的一个或多个功能。如 [vue-router](https://github.com/vuejs/vue-router)



**使用插件**

通过全局方法 `Vue.use()` 使用插件。它需要在你调用 `new Vue()` 启动应用之前完成：

```js
// 调用 `MyPlugin.install(Vue)`
Vue.use(MyPlugin)

new Vue({
  // ...组件选项
})
```

也可以传入一个可选的选项对象：

```js
Vue.use(MyPlugin, { someOption: true })
```

`Vue.use` 会自动阻止多次注册相同插件，届时即使多次调用也只会注册一次该插件。

Vue.js 官方提供的一些插件 (例如 `vue-router`) 在检测到 `Vue` 是可访问的全局变量时会自动调用 `Vue.use()`。然而在像 CommonJS 这样的模块环境中，你应该始终显式地调用 `Vue.use()`：

```js
// 用 Browserify 或 webpack 提供的 CommonJS 模块环境时
var Vue = require('vue')
var VueRouter = require('vue-router')

// 不要忘了调用此方法
Vue.use(VueRouter)
```

[awesome-vue](https://github.com/vuejs/awesome-vue#components--libraries) 集合了大量由社区贡献的插件和库。



**开发插件**

Vue.js 的插件应该暴露一个 `install` 方法。这个方法的第一个参数是 `Vue` 构造器，第二个参数是一个可选的选项对象：

```js
MyPlugin.install = function (Vue, options) {
  // 1. 添加全局方法或 property
  Vue.myGlobalMethod = function () {
    // 逻辑...
  }

  // 2. 添加全局资源
  Vue.directive('my-directive', {
    bind (el, binding, vnode, oldVnode) {
      // 逻辑...
    }
    ...
  })

  // 3. 注入组件选项
  Vue.mixin({
    created: function () {
      // 逻辑...
    }
    ...
  })

  // 4. 添加实例方法
  Vue.prototype.$myMethod = function (methodOptions) {
    // 逻辑...
  }
}
```



## vue-router

Vue Router 是 [Vue.js](https://vuejs.org/) 的官方路由。它与 Vue.js 核心深度集成，让用 Vue.js 构建单页应用变得轻而易举。功能包括：

- 嵌套路由映射
- 动态路由选择
- 模块化、基于组件的路由配置
- 路由参数、查询、通配符
- 展示由 Vue.js 的过渡系统提供的过渡效果
- 细致的导航控制
- 自动激活 CSS 类的链接
- HTML5 history 模式或 hash 模式
- 可定制的滚动行为
- URL 的正确编码

### 安装

**npm**

```sh
npm install vue-router --save
```

**yarn**

```sh
yarn add vue-router --save
```



### 使用

用 Vue + Vue Router 创建单页应用非常简单：通过 Vue.js，我们已经用组件组成了我们的应用。当加入 Vue Router 时，我们需要做的就是将我们的组件映射到路由上，让 Vue Router 知道在哪里渲染它们。

`router-link` 可以在不重新加载页面的情况下更改 URL，处理 URL 的生成以及编码。

`router-view` 将显示与 url 对应的组件。你可以把它放在任何地方，以适应你的布局。

```html
<script src="https://unpkg.com/vue@3"></script>
<script src="https://unpkg.com/vue-router@4"></script>

<div id="app">
    <h1>Hello App!</h1>
    <p>
        <!--使用 router-link 组件进行导航 -->
        <!--通过传递 `to` 来指定链接 -->
        <!--`<router-link>` 将呈现一个带有正确 `href` 属性的 `<a>` 标签-->
        <router-link to="/">Go to Home</router-link>
        <router-link to="/about">Go to About</router-link>
    </p>
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
</div>
```

```js
import VueRouter from "vue-router";

// 1. 导入路由组件
import Home from "./views/Home.vue";
import About from "./views/About.vue";

// 2. 定义路由，每个路由都需要映射到一个组件
const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/about",
    name: "about",
    component: About,
  },
];

// 3. 创建路由实例
// history 模式
const routerHistory = VueRouter.createWebHistory();
// hash 模式
// const routerHashHistory = VueRouter.createWebHashHistory();
const router = VueRouter.createRouter({
  history: routerHistory,
  routes,
});

// 4. 导出并挂载在main.ts的根实例中
// main.ts app.use(router)
export default router;
```

你可以在同一个路由中设置有多个 *路径参数*，它们会映射到 `$route.params` 上的相应字段。例如：

| 匹配模式                       | 匹配路径                 | $route.params                            |
| :----------------------------- | ------------------------ | ---------------------------------------- |
| /users/:username               | /users/eduardo           | `{ username: 'eduardo' }`                |
| /users/:username/posts/:postId | /users/eduardo/posts/123 | `{ username: 'eduardo', postId: '123' }` |

除了 `$route.params` 之外，`$route` 对象还公开了其他有用的信息，如 `$route.query`（如果 URL 中存在参数）、`$route.hash` 等。你可以在 [API 参考](https://router.vuejs.org/zh/api/#routelocationnormalized)中查看完整的细节。

- 返回上一页

```js
//go(-1): 原页面表单中的内容会丢失；
this.$router.go(-1)：后退+刷新；
this.$router.go(0)：刷新；
this.$router.go(1) ：前进
//back(): 原页表表单中的内容会保留；
this.$router.back():后退 ；
this.$router.back(0) 刷新；
this.$router.back(1)：前进
```



## vuex

### 概述

vuex是实现组件全局状态（数据）管理的一种机制，可以方便的实现组件之间数据的共享。

- 集中管理共享数据，易于开发和后期维护
- 能够高效实现组件之间的数据共享，提升开发效率
- 存储在vuex中的数据是响应式的，能够实现保持数据与页面的同步

### state 

state是提供唯一的公共数据源，所有共享的数据都要统一放到store的state中进行储存。

用法：

> 在state中定义全局数据

```js
// stroe/index.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 定义全局数据
    count: 0,
  },
  mutations: {},
  actions: {},
  modules: {},
})
```

> 组件中使用state中定义的全局数据

使用this.$store.state

```js
this.$store.state.count
```

使用mapState 函数

```js
// 1从vuex中按需导入mapState 函数
import { mapState } from 'vuex'
// 2.通过mapState函数，将当前组件需要的全局数据，映射为当前组件的computed计算属性
computed:{
    ...mapState(['count'])
}
```

### mutations

mutations 用于变更Store中的数据，mutations中只允许写同步的代码，不允许写异步的的代码，mutations和commit做关联。

用法：

> 在mutations中定义的改变全局变量的方法

```js
// store/index.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 定义全局数据
    count: 1,
  },
  mutations: {
    // 定义改变全局数据的方法（同步）
    add(state) {
      state.count++
    },
    // 定义改变全局数据的方法（同步），并接收参数
    sub(state, value) {
      state.count -= value;
    }
  },
  actions: {},
  modules: {},
})
```

> 组件触发mutations

调用commit函数，触发mutation中定义的改变全局变量的方法，this.$store.commit('方法名',参数) 参数为非必传

```js
methods:{
  addHandler(){
     this.$store.commit('add')
  },
  subHandler(){
     this.$store.commit('sub',10)
  }
}
```

通过mapMutations函数，将指定的mutations函数，映射为当前组件的methods方法

```vue
<template>
	<div></div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
    methods:{
        ...mapMutations(['add','sub'])
        // 直接调用从mapMutations解构出来的方法
        this.add()
        // 直接调用从mapMutations解构出来的方法，并传递参数
        this.sub(10)
	}
};
</script>
```

### actions

actions用于处理异步任务，actions和dispatch做关联

如果通过异步操作变更数据，必须通过actions，而不能使用mutations，但是在actions中还是要通过触发mutations的方式间接变更数据

用法：

> 在actions定义异步的任务，在异步任务内使用commit函数触发mutations中定义的改变全局变量的方法

```js
// store/index.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 1,
  },
  mutations: {
    add(state) {
      state.count++
       // 不要在mutations中执行异步的操作，要想执行异步的操作的话，使用actions
      /* setTimeout(()=>{
        state.count++;
      },1000) */
    },
    subN(state,N){
      state.count-=N
  }
  },
  
  actions: {
      // 异步任务不能直接改变state中的数据，要想改变state中的数据，必须通过context.commit()调用mutations定义改变state数据的方法
      // 定义异步任务
      addAsync(context){
          setTimeout(()=>{
              context.commit('add') 
          },3000)
      },
      // 定义异步任务，并接收参数
      subNAsync(context,N){
          setTimeout(()=>{
              context.commit('subN',N) 
          },3000)
      }
  },
  modules: {},
})
```

> 组件触发actions

调用 dispatch 函数触发异步任务，this.$store.dispatch('方法名',参数)，其中参数为非必传

```js
methods:{
  addAsyncHandler(){
     this.$store.dispatch('addAsync')
  },
  addNAsyncHandler(){
     this.$store.dispatch('subNAsync',10)
  }
}
```

通过mapMutations函数，将指定的actions函数，映射为当前组件的methods方法

```vue
<template>
	<div></div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
    methods:{
        ...mapActions(['addAsync','subNAsync'])
    	// 直接调用从mapActions解构出来的方法
    	this.addAsync()
    	// 直接调用从mapActions解构出来的方法，并传递参数
    	this.subNAsync(10)
	}
};
</script>
```



### getter

getter用于对store中的数据进行加工处理形成新的数据，getter不会改变store中的原数据

- getter 可以对store中已有的数据进行加工处理后形成新的数据，类似vue的计算属性
- store中的数据变化，getter的数据也会跟着变化

用法：

> 定义getters

```js
/*
stroe/index.js
*/
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
  },
  getters:{
      showNum:state=>{
          return '当前的最新数据是【'+ state.count + '】'
      }
  }
  mutations: {},
  actions: {},
  modules: {},
})
```



### **vue2.0中使用vuex**

```js
// 1、安装vuex的依赖包 npm install vuex --save
/*
stroe/index.js
*/
// 2、导入vuex包
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

// 3、创建store对象
export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {},
});

/*
main.js
*/
// 4、将store 对象挂载到vue实例中
import Vue from "vue";
import App from "./App.vue";
import store from "./store";

Vue.config.productionTip = false;

new Vue({
  store, // 将store 对象挂载到vue 实例中
  render: (h) => h(App),
}).$mount("#app");

```





### **vue3.0中使用vuex**

安装vuex的依赖包 

```json
npm install vuex --save
```

在工程目录src下，新建stroe/index.js文件

```js
import { createStore } from "vuex";
const store = createStore({
    state: {
        // 定义全局数据
        name: 'feng'
    },
    mutations: {},
    actions: {},
    modules: {}
})
export default store
```

在main.js中使用

```js
import { createApp } from 'vue'
import App from './App.vue'
import router from './route'
import store from './store'
createApp(App).use(router).use(store).mount('#app')
```

在组件中使用vuex中在state定义全局数据 **this.$store.state.name**

```vue
<template>
	<div>{{ myName }}</div>
</template>

<script>
    export default {
        computed: {
            myName() {
                return this.$store.state.name;
            },
        },
    };
</script>
```

想要修改vuex中在state定义全局数据 ，vuex规定必须通过**mutations**去修改

**this.$store.commit('SET_NAME','ffff')**

```js
// stroe/index.js
state: {
    // 定义全局数据
    name: 'feng'
},
mutations: {
    SET_NAME(state, name){
        state.name = name
	}
},
```

```vue
<template>
	<div>{{ myName }}</div>
	<button @click="change">修改</button>
</template>

<script>
    export default {
        name: "Home",
        computed: {
            myName() {
                return this.$store.state.name;
            },
        },
        methods: {
            change() {
                this.$store.commit("SET_NAME", "ffffff");
            },
        },
    };
</script>
```





## 风格指南

### 组件名

**组件名应该始终是多个单词的**，这样做可以避免跟现有的以及未来的 HTML 元素相冲突，因为所有的 HTML 元素名称都是单个单词的。

```js
Vue.component('todo-item', {
  // ...
})
```

```js
export default {
  name: 'TodoItem',
  // ...
}
```



### 组件数据

当在组件中使用 `data` property 的时候 (除了 `new Vue` 外的任何地方)，它的值必须是返回一个对象的函数。

这样做使得每个组件的data都是私有的，不会相互影响。

```js
// In a .vue file
export default {
  data () {
    return {
      foo: 'bar'
    }
  }
}
```



### props定义

**Prop 定义应该尽量详细。**

细致的 [prop 定义](https://cn.vuejs.org/v2/guide/components-props.html#Prop-验证)有两个好处：

- 它们写明了组件的 API，所以很容易看懂组件的用法；
- 在开发环境下，如果向一个组件提供格式不正确的 prop，Vue 将会告警，以帮助你捕获潜在的错误来源。

```js
props: {
  status: String
}
// 更好的做法！
props: {
  status: {
    type: String,
    required: true,
    validator: function (value) {
      return [
        'syncing',
        'synced',
        'version-conflict',
        'error'
      ].indexOf(value) !== -1
    }
  }
}
```



###  v-for

**总是用 `key` 配合 `v-for`。**以便维护内部组件及其子树的状态。如果数组中某一个元素发生改变，v-for可凭借`key`找到一个页面元素，只更新一个页面元素即可。其余页面元素保持不变——效率高！

```html
<ul>
  <li
    v-for="todo in todos"
    :key="todo.id"
  >
    {{ todo.text }}
  </li>
</ul>
```



### v-for和v-if

**永远不要把 `v-if` 和 `v-for` 同时用在同一个元素上。**

**当 Vue 处理指令时，`v-for` 比 `v-if` 具有更高的优先级**

一般我们在两种常见的情况下会倾向于这样做：

- 为了过滤一个列表中的项目 (比如 `v-for="user in users" v-if="user.isActive"`)。在这种情形下，请将 `users` 替换为一个计算属性 (比如 `activeUsers`)，让其返回过滤后的列表。

  ```html
  <ul>
    <li
      v-for="user in activeUsers"
      :key="user.id"
    >
      {{ user.name }}
    </li>
  </ul>
  ```

  ```js
  computed: {
    activeUsers: function () {
      return this.users.filter(function (user) {
        return user.isActive
      })
    }
  }
  ```

  

- 为了避免渲染本应该被隐藏的列表 (比如 `v-for="user in users" v-if="shouldShowUsers"`)。这种情形下，请将 `v-if` 移动至容器元素上 (比如 `ul`、`ol`)。

  ```html
  <ul v-if="shouldShowUsers">
    <li
      v-for="user in users"
      :key="user.id"
    >
      {{ user.name }}
    </li>
  </ul>
  ```

  

### 组件样式

**对于应用来说，顶级 `App` 组件和布局组件中的样式可以是全局的，但是其它所有组件都应该是有作用域的。**

这条规则只和[单文件组件](https://cn.vuejs.org/v2/guide/single-file-components.html)有关。你*不一定*要使用 [`scoped` attribute](https://vue-loader.vuejs.org/zh-cn/features/scoped-css.html)。设置作用域也可以通过 [CSS Modules](https://vue-loader.vuejs.org/zh-cn/features/css-modules.html)，那是一个基于 class 的类似 [BEM](http://getbem.com/) 的策略，当然你也可以使用其它的库或约定。

**不管怎样，对于组件库，我们应该更倾向于选用基于 class 的策略而不是 `scoped` attribute。**

这让覆写内部样式更容易：使用了常人可理解的 class 名称且没有太高的选择器优先级，而且不太会导致冲突。

如果你和其他开发者一起开发一个大型工程，或有时引入三方 HTML/CSS (比如来自 Auth0)，设置一致的作用域会确保你的样式只会运用在它们想要作用的组件上。

不止要使用 `scoped` attribute，使用唯一的 class 名可以帮你确保那些三方库的 CSS 不会运用在你自己的 HTML 上。比如许多工程都使用了 `button`、`btn` 或 `icon` class 名，所以即便你不使用类似 BEM 的策略，添加一个 app 专属或组件专属的前缀 (比如 `ButtonClose-icon`) 也可以提供很多保护。

```html
<template>
  <button class="button button-close">X</button>
</template>

<!-- 使用 `scoped` attribute -->
<style scoped>
.button {
  border: none;
  border-radius: 2px;
}

.button-close {
  background-color: red;
}
</style>
```

```html
<template>
  <button :class="[$style.button, $style.buttonClose]">X</button>
</template>

<!-- 使用 CSS Modules -->
<style module>
.button {
  border: none;
  border-radius: 2px;
}

.buttonClose {
  background-color: red;
}
</style>
```

```html
<template>
  <button class="c-Button c-Button--close">X</button>
</template>

<!-- 使用 BEM 约定 -->
<style>
.c-Button {
  border: none;
  border-radius: 2px;
}

.c-Button--close {
  background-color: red;
}
</style>
```



### property 名

**使用模块作用域保持不允许外部访问的函数的私有性。如果无法做到这一点，就始终为插件、混入等不考虑作为对外公共 API 的自定义私有 property 使用 `$_` 前缀。并附带一个命名空间以回避和其它作者的冲突 (比如 `$_yourPluginName_`)。**

Vue 使用 `_` 前缀来定义其自身的私有 property，所以使用相同的前缀 (比如 `_update`) 有覆写实例 property 的风险。即便你检查确认 Vue 当前版本没有用到这个 property 名，也不能保证和将来的版本没有冲突。

对于 `$` 前缀来说，其在 Vue 生态系统中的目的是暴露给用户的一个特殊的实例 property，所以把它用于*私有* property 并不合适。

不过，我们推荐把这两个前缀结合为 `$_`，作为一个用户定义的私有 property 的约定，以确保不会和 Vue 自身相冲突。

```js
var myGreatMixin = {
  // ...
  methods: {
    $_myGreatMixin_update: function () {
      // ...
    }
  }
}
```

```js
// 甚至更好！
var myGreatMixin = {
  // ...
  methods: {
    publicMethod() {
      // ...
      myPrivateFunction()
    }
  }
}

function myPrivateFunction() {
  // ...
}

export default myGreatMixin
```
