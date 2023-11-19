# vue cli5



## vue.config.js



```js
const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
    transpileDependencies: true,
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true
            },
        }
    },
    configureWebpack: {
        // 编译使用缓存vue cli5支持(webpack5)
        // vue cli5以下版本可使用 hard-source-webpack-plugin 
        cache: {
            type: 'filesystem',
            allowCollectingMemory: true
        },
        resolve: {
            // 路径别名，提高开发效率 (同时需要更改jsconfig.json中的path配置)
            // view组件中使用 import Header from '@c/PageHeader.vue'
            alias: {
                '@': path.resolve(__dirname, 'src'),
                '@a': path.resolve(__dirname, 'src/assets'),
                '@c': path.resolve(__dirname, 'src/components'),
                '@u': path.resolve(__dirname, 'src/use'),
                '@p': path.resolve(__dirname, 'src/plugins'),
                '@r': path.resolve(__dirname, 'src/router'),
                '@v': path.resolve(__dirname, 'src/views'),
                '@vd': path.resolve(__dirname, 'src/view-data')
            }
        }
    }
})
```



## jsconfig.json

```json
{
    "compilerOptions": {
        "target": "es5",
        "module": "esnext",
        "baseUrl": "./",
        "moduleResolution": "node",
        // 输入 @a 或 @c ... 可获得代码提示
        "paths": {
            "@/*": [ "src/*"],
            "@a/*": [ "src/assets/*"],
            "@c/*": [ "src/components/*"],
            "@u/*": [ "src/use/*"],
            "@p/*": [ "src/plugins/*"],
            "@r/*": [ "src/router/*"],
            "@v/*": [ "src/views/*"],
            "@vd/*": [ "src/view-data/*"],
        },
        "lib": [
            "esnext",
            "dom",
            "dom.iterable",
            "scripthost"
        ]
    }
}
```



