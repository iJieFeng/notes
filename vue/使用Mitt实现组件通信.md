# 使用Mitt库实现组件通信

使用 [Mitt](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fdevelopit%2Fmitt) 库实现组件通信，类似的库还有  [tiny-emitter](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fscottcorgan%2Ftiny-emitter)

Mitt  通过emit派发， on 方法接收，off 方法移除，clear 清空所有

## 安装

```bash
npm install mitt -S
```



## 使用方式一：在原型中声明

### 1. 在main.ts 中注册挂载到全局

```js
import { createApp } from 'vue'
import App from './App.vue'
import mitt from 'mitt'
 
const Mit = mitt()
 
//TypeScript注册
// 由于必须要拓展ComponentCustomProperties类型才能获得类型提示
declare module "vue" {
    export interface ComponentCustomProperties {
        $Bus: typeof Mit
    }
}
 
const app = createApp(App)
 
//Vue3挂载全局API
app.config.globalProperties.$Bus = Mit
 
app.mount('#app')
```

### 2. A组件使用emit派发消息

```vue
<template>
	<div>
        <h1>我是A</h1>
        <button @click="emit1">emit1</button>
        <button @click="emit2">emit2</button>
    </div>
</template>

<script setup lang='ts'>
import { getCurrentInstance } from 'vue'
const instance = getCurrentInstance();
const emit1 = () => {
    instance?.proxy?.$Bus.emit('on-num', 100)
}
const emit2 = () => {
    instance?.proxy?.$Bus.emit('*****', 500)
}
</script>
```

### 3. B组件使用on接收消息

```vue
<template>
    <div>
        <h1>我是B</h1>
    </div>
</template>

<script setup lang='ts'>
import { getCurrentInstance } from 'vue'
const instance = getCurrentInstance() as ComponentInternalInstance
instance?.proxy?.$Bus.on('on-num', (num) => {
    console.log(num,'===========>B')
})
</script>
```


监听所有事件（ on("*") ）

```js
instance?.proxy?.$Bus.on('*',(type,num)=>{
    console.log(type,num,'===========>B')
})
```

移除监听事件（off）

```js
const Fn = (num: any) => {
    console.log(num, '===========>B')
}
instance?.proxy?.$Bus.on('on-num',Fn)//listen
instance?.proxy?.$Bus.off('on-num',Fn)//unListen
```

清空所有监听（clear）

```js
instance?.proxy?.$Bus.all.clear() 
```



## 使用方式二：在组件中引用

### 1. 新建 bus.ts 文件

```js
import mitt from "mitt";

const emiter = mitt();

export default emiter;
```

### 2. A组件使用emit派发消息

```vue
<template>
    <div>
        <p>这里是A组件</p>
        <button @click="sendMitt">$mitt发送数据</button>
    </div>
</template>

<script lang="ts" setup>
import emitter from '../../utils/bus'

const money = ref<number>(98);

const sendMitt = () => {
    emitter.emit('moneyEvent', money.value += 2);
}

</script>
```

### 3. B组件使用on接收消息

```vue
<template>
    <div class="about-container">
        <p>这里是B组件</p>
        <p>接收到的数据：{{ amount }}</p>
    </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount, onMounted } from 'vue';
import emitter from '../../utils/bus'

const amount = ref(0);

onMounted(() => {
    emitter.on('moneyEvent', (res: any) => {
        amount.value = res;
    });
})

onBeforeMount(() => {
    emitter.off('moneyEvent');
});

</script>
```

