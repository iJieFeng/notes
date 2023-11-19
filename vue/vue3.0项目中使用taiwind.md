# vue3.0 集成 taiwind

[Taiwind css 官方文档](https://www.tailwindcss.cn/) [Taiwind css 中文教程](https://www.w3cschool.cn/tailwind_css/tailwind_css-izj53p90.html?RECACHE=1) 

## 安装 Tailwind

```bash
npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
```



## 生成配置文件

```
npx tailwindcss init -p
```

这将会在您的项目根目录创建 ` tailwind.config.js  `和 `postcss.config.js` 

```js
// tailwind.config.js
module.exports = {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

```js
// postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```



## 修改配置文件

[配置 - Tailwind CSS 中文文档](https://www.tailwindcss.cn/docs/configuration)  

```js
// 2.6版本
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

```js
// 3.0版本
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

注意： taiwind 会把 h1~ h6、button、input等基础样式清空，需要保留基础样式的话，请按以下配置

```js
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  plugins: [],
  corePlugins: {
    preflight: true, // 保留基础样式
  },
}
```



## 引入 Tailwind

创建一个taiwind.css并在main.ts 引入

```css
/* ./src/assets/style/taiwind.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

```js
// src/main.js
import './assets/style/taiwind.css'
```



## vscode 插件

[Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) 

在class中输入空格后获得taiwind代码提示



