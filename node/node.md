# nodejs

安装node：https://nodejs.org/en/download/

历史版本 https://nodejs.org/en/download/releases/

设置npm源为淘宝镜像

```shell
npm config set registry https://registry.npm.taobao.org
```

使用nvm：nvm管理node版本

安装nvm：在github中搜索nvm-windows



初始化npm环境： npm init -y

```json
// package.json
{
  "name": "debugger",
  "version": "1.0.0",
  "description": "",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

vscode调试代码

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
},

// scripts内容 改为 app.js为自定义文件，需要跟main字段中的文件名保持一致
"scripts": {
    "test": "node app.js"
},

```

API文档地址 [#API]( http://nodejs.cn/api-v12/index.html)

## http请求概述

- DNS解析，建立TPC连接，发送http请求
- server接收到http请求，处理并返回
- 客户端接收到返回数据，处理数据（如渲染页面，执行js）



处理get请求:

- 客户端要向server端获取数据，如查询列表
- 通过querystring来传递数据，如a.html?a=100&b=200
- 浏览器直接访问，就是发送get请求



处理post请求

- 客户端要向服务端传递数据，如创建文章
- 通过post data传递数据
- 浏览器无法直接模拟，需要手写js，或者借助工具（如postman）







```js
const http = require('http')

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'content-type': 'text/html' })
    res.end('<h1>hello world</h1>')
})

server.listen(3000, () => {
    console.log('listening on 3000 port');
})

// 然后浏览器访问 http://localhost:3000/
```
