# keep-alive

默认情况下，一个组件实例在被替换掉后会被销毁。

如果想要在切换的时候保留它们的状态，可以用 `<KeepAlive>` 内置组件将这些动态组件包装起来

```vue
<keep-alive>
  <component :is="activeComponent" />
</keep-alive>
```



# include/exclude

`<KeepAlive>` 默认会缓存内部的所有组件实例，但我们可以通过 `include` 和 `exclude` prop 来定制该行为。

它会根据组件的 [`name`](https://cn.vuejs.org/api/options-misc.html#name) 选项进行匹配，所以组件如果想要条件性地被 `KeepAlive` 缓存，就必须显式声明一个 `name` 选项。

```vue
<template>
  <KeepAlive :include="['CompA']" :exclude="['CompB']">
    <component :is="current"></component>
  </KeepAlive>
</template>

<script>
import CompA from './CompA.vue'
import CompB from './CompB.vue'
  
export default {
  components: { CompA, CompB },
  data() {
    return {
      current: 'CompA'
    }
  }
}
</script>
```

> 提示：在 3.2.34 或以上的版本中，使用 `<script setup>` 的单文件组件会自动根据文件名生成对应的 `name` 选项，无需再手动声明。

`vue2` 中 **必须** 在组件中 **声明name**，否则不生效。

```vue
<!-- CompA -->
<script>
export default {
  name: 'CompA'
}
</script>

<!-- CompB -->
<script>
export default {
  name: 'CompB'
}
</script>
```



# activated/deactivated

当一个组件实例从 DOM 上移除但因为被 `<KeepAlive>` 缓存而仍作为组件树的一部分时，它将变为**不活跃**状态而不是被卸载。当一个组件实例作为缓存树的一部分插入到 DOM 中时，它将重新**被激活**。

一个持续存在的组件可以通过 [`activated`](https://cn.vuejs.org/api/options-lifecycle.html#activated) 和 [`deactivated`](https://cn.vuejs.org/api/options-lifecycle.html#deactivated) 选项来注册相应的两个状态的生命周期钩子：

```js
export default {
  activated() {
    // 在首次挂载、
    // 以及每次从缓存中被重新插入的时候调用
  },
  deactivated() {
    // 在从 DOM 上移除、进入缓存
    // 以及组件卸载时调用
  }
}
```





# 实例： 缓存创建表单组件的状态

1. 在定义router文件中，设置创建表单路由组件的meta属性 `keepAlive`为 true 

   ```js
   {
     path: '/**',
     name: 'CreateForm',
     component: () => import('@/create/form'),
     meta: {
       title: '创建表单',
       keepAlive: true
     }
   }
   ```

2. 在 `CreateForm` 组件中定义 name 

   ```vue
   <script>
   export default {
     name: 'CreateForm'
   }
   </script>
   ```

3. 缓存组件全局状态管理

   ```js
   <!-- store.js -->
   const state = {
     cachedComponents: []
   }
   
   const mutations = {
     ADD_CACHED_COMP: (state, component) => {
       if (state.cachedComponents.includes(component.name)) return
       if (!component.meta.keepAlive) {
         state.cachedComponents.push(component.name)
       }
     }
   }
   
   const actions = { 
     addCachedComp({ commit }, view) {
       commit('ADD_CACHED_VIEW', view)
     },
   }
   ```

4. 使用 `<KeepAlive>` 将 `<router-view />` 包装起来

   ```vue
   <template>
     <transition name="fade-transform" mode="out-in">
       <keep-alive :include="cachedComponents">
         <router-view :key="key" />
       </keep-alive>
     </transition>
   </template>
   
   <script>
   export default {
     name: 'App',
     computed: {
       cachedViews() {
         return this.$store.state.cachedComponents
       },
       key() {
         return this.$route.fullPath
       }
     }，
     watch: {
       $route() {
         this.addCachedComp()
       }
     },
     methods: {
       addCachedComp() {
         const { name, meta } = this.$route
         if (name && meta?.keepAlive) {
           this.$store.dispatch('addCachedComp', this.$route)
         }
       }
     }
   }
   </script>
   ```

