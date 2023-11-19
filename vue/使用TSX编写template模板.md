# 使用TSX编写template模板

我们之前呢是使用Template去写我们模板。现在可以扩展另一种风格TSX风格

vue2 的时候就已经支持jsx写法，只不过不是很友好，随着vue3对typescript的支持度，tsx写法越来越被接受

完整版用法 请看 [@vue/babel-plugin-jsx - npm](https://www.npmjs.com/package/@vue/babel-plugin-jsx) 

## 1. 安装插件

```bash
npm install @vitejs/plugin-vue-jsx -D
```

vite.config.ts 配置

```js

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
export default defineConfig({
  plugins: [vue(), vueJsx()],
})
```

注意：使用最新vite初始化项目已自动安装，无需手动安装



## 2. 使用TSX

返回一个渲染函数

optionsApi

setup 函数模式

ref temp;ate tsx并不会自定解包 要ref.value

v-show 支持

v-if 不支持 三元表达式替换

v-for 不支持 使用map代替

v-bind 使用 {}代替

props emit 支持

@不支持 使用on

插槽

### **tsx支持 v-model 的使用**

```tsx
import { ref } from 'vue'

let v = ref<string>('')

const renderDom = () => {
    return (
        <>
           <input v-model={v.value} type="text" />
           <div>
               {v.value}
           </div>
        </>
    )
}

export default renderDom
```



### v-if是不支持的

可使用三元表达式替换

```tsx
import { ref } from 'vue'
 
let flag = ref(false)
 
const renderDom = () => {
    return (
        <>
            {
                flag.value ? <div>景天</div> : <div>雪见</div>
            }
        </>
    )
}
 
export default renderDom
```



### v-for也是不支持的

使用Map替换

```tsx
import { ref } from 'vue'
 
let arr = [1,2,3,4,5]
 
const renderDom = () => {
    return (
        <>
            {
              arr.map(v=>{
                  return <div>${v}</div>
              })
            }
        </>
    )
}
 
export default renderDom
```



### v-bind使用

```tsx
import { ref } from 'vue'

let arr = [1, 2, 3, 4, 5]

const renderDom = () => {
    return (
        <>
            <div data-arr={arr}>1</div>
        </>
    )
}

export default renderDom
```



### v-on绑定事件 

所有的事件都按照react风格来：

- 所有事件有on开头
- 所有事件名称首字母大写

```tsx
const renderDom = () => {
    return (
        <>
            <button onClick={clickTap}>点击</button>
        </>
    )
}

const clickTap = () => {
    console.log('click');
}

export default renderDom
```



### Props 接受值

```tsx
import { ref } from 'vue'

type Props = {
    title:string
}

const renderDom = (props:Props) => {
    return (
        <>
            <div>{props.title}</div>
            <button onClick={clickTap}>点击</button>
        </>
    )
}

const clickTap = () => {
    console.log('click');
}

export default renderDom

```



### Emit派发

```tsx
type Props = {
    title: string
}

const renderDom = (props: Props,content:any) => {
    return (
        <>
            <div>{props.title}</div>
            <button onClick={clickTap.bind(this,content)}>点击</button>
        </>
    )
}

const clickTap = (ctx:any) => {

    ctx.emit('on-click',1)

}
```



### Slot

```tsx
const A = (props, { slots }) => (
  <>
    <h1>{ slots.default ? slots.default() : 'foo' }</h1>
    <h2>{ slots.bar?.() }</h2>
  </>
);

const App = {
  setup() {
    const slots = {
      bar: () => <span>B</span>,
    };
    return () => (
      <A v-slots={slots}>
        <div>A</div>
      </A>
    );
  },
};

// or

const App = {
  setup() {
    const slots = {
      default: () => <div>A</div>,
      bar: () => <span>B</span>,
    };
    return () => <A v-slots={slots} />;
  },
};

// or you can use object slots when `enableObjectSlots` is not false.
const App = {
  setup() {
    return () => (
      <>
        <A>
          {{
            default: () => <div>A</div>,
            bar: () => <span>B</span>,
          }}
        </A>
        <B>{() => "foo"}</B>
      </>
    );
  },
};


```

