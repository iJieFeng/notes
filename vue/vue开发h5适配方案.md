在开发移动端的时候需要适配各种机型，有大的，有小的，我们需要一套代码，在不同的分辨率适应各种机型。

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

移动设备具有各种不同的屏幕尺寸和分辨率，例如智能手机和平板电脑。为了提供更好的用户体验，网页需要根据设备的屏幕宽度进行自适应布局。如果不设置width=device-width，移动设备会按照默认的视口宽度（通常是较宽的桌面屏幕）来渲染网页，导致网页内容在移动设备上显示不正常，可能出现内容被截断或需要水平滚动的情况



**自适应**

`px`单位是相对单位固定的，无法进行自适应，不会随着屏幕尺寸的改变而改变。

`rem` 是根据 `html` 的font-size 进行缩放的，可以进行自适应，缺点就是需要计算每个屏幕大小所对应的font-size。

`vw` `vh` 是相对 `viewport` 视口的单位，配合meta标签可以直接使用，无需计算

- 1`vw`=1/100视口宽度
- 1`vh`=1/100视口高度

当前屏幕视口是375像素，1`vw`就是3.75像素

使用 `vw` 要根据 `px` 去换算 `vw`，计算很麻烦，可借助 `postcss` 实现自动转换



**`postCss`**

其中 [`vite`](https://cn.vitejs.dev/config/shared-options.html#css-postcss) 已经内置了 [`postCss`](https://www.postcss.com.cn/)

`postCss` 提供了把 `Css`  转换 `AST` 的能力，类似于Babel，为此我们可以编写一个插件用于将 `px`转换为 `vw`

1.  在根目录中新建一个 `plugins` 文件夹新建两个文件 `pxto-viewport.ts` 和  `type.ts`

   ```js
   // pxto-viewport.js
   import type { Options } from './type'
   import type { Plugin } from 'postcss'
   const defaultOptions = {
       viewPortWidth: 375,
       mediaQuery: false,
       unitToConvert:'px'
   }
   export const pxToViewport = (options: Options = defaultOptions): Plugin => {
       const opt = Object.assign({}, defaultOptions, options)
       return {
           postcssPlugin: 'postcss-px-to-viewport',
           //css节点都会经过这个钩子
           Declaration(node) {
               const value = node.value
               //匹配到px 转换成vw
               if (value.includes(opt.unitToConvert)) {
                   const num = parseFloat(value)
                   const transformValue = (num / opt.viewPortWidth) * 100
                   node.value = `${transformValue.toFixed(2)}vw` //转换之后的值
               }    
           },
       }
   }
   ```

   ```js
   // type.ts
   export interface Options {
       viewPortWidth?: number;
       mediaQuery?: boolean;
       unitToConvert?: string;
   }
   ```

2. 在 `tsconfig.node.json` 的includes 配置 `"plugins/**/*"`， `compilerOptions` 配置 `noImplicitAny:false`

3. 在 `vite.config.ts` 引入我们写好的插件

   ```js
   css:{
      postcss:{
          plugins:[
             pxToViewport()
          ]
      },
   },
   ```



设置全局的字体大小或全局背景颜色切换

1. 安装vueUse

   ```bash
   npm i  @vueuse/core
   ```

2. 定义`css`变量

   ```css
   :root {
     --size: 14px;
   }
   div {
       height: 50px;
       color: white;
       text-align: center;
       line-height: 50px;
       font-size: var(--size);
   }
   
   ```

3. 切换字体大小

   ```html
   <div>
       <button @click="change(36)">大</button>
       <button @click="change(24)">中</button>
       <button @click="change(14)">小</button>
   </div>
   ```

   ```js
   import { useCssVar } from '@vueuse/core'
   const change = (str: number) => {
     const color = useCssVar('--size')
     color.value = `${str}px`
   }
   
   ```

   `useCssVar` 的底层原理就是

   `document.documentElement.style.getPropertyValue('--size')`





**`postcss-px-to-viewport`**

1. 安装

   ```bash
   npm install postcss-px-to-viewport --save-dev
   ```

2.  根目录添加配置文件

   ```js
   // postcss.config.js
   module.exports = {
     plugins: {
       'postcss-px-to-viewport': {
         unitToConvert: 'px', // 需要转换的单位，默认为"px"
         viewportWidth: 1920, // 设计稿的视口宽度
         unitPrecision: 5, // 单位转换后保留的精度
         propList: ['*'], // 能转化为vw的属性列表
         viewportUnit: 'vw', // 希望使用的视口单位
         fontViewportUnit: 'vw', // 字体使用的视口单位
         selectorBlackList: [], // 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。
         minPixelValue: 1, // 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
         mediaQuery: false, // 媒体查询里的单位是否需要转换单位
         replace: true, //  是否直接更换属性值，而不添加备用属性
         exclude: undefined, // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
         include: undefined, // 如果设置了include，那将只有匹配到的文件才会被转换
         landscape: false, // 是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
         landscapeUnit: 'vw', // 横屏时使用的单位
         landscapeWidth: 1920 // 横屏时使用的视口宽度
       }
     }
   }
   ```



[移动端 适配解决方案 postcss-px-to-viewport](https://juejin.cn/post/7018433228591595550)

[移动端布局之postcss-px-to-viewport（兼容vant）](https://juejin.cn/post/6844904146865225742)

[postcss-px-to-viewport方案正确的使用姿势](https://juejin.cn/post/7209945218132181053)
