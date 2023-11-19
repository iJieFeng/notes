## BOM

全称 Browser Object Model, 即浏览器对象模型，主要用于客户端浏览器的管理

### navigator 

浏览器信息

```js
const ua = navigator.userAgent
const isChrome = us.indexOf('Chrome')
console.log(isChrome)
```



### screen

屏幕信息

```js
console.log(screen.width)
console.log(screen.heigth)
```



### location

url信息

```js
location.href  // 完整路径
location.protocol // 协议
location.pathname // 路径
location.search // 参数
location.hash // #
```



### history

前进后退信息

```js
history.back() // 前进
history.forward() // 后退
```



