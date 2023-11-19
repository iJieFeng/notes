# vue3自动引入vue的api

## 安装插件 [unplugin-auto-import](https://www.npmjs.com/package/unplugin-auto-import) 

```bash
npm i -D unplugin-auto-import
```



## vite配置（vite.config.ts）

```ts
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      imports: ['vue'],
      dts: 'src/auto-imports.d.ts'
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})

```

配置完后 使用ref reactive watch 等 无需import 导入，可以直接使用



