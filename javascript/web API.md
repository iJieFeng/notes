# 事件



## 事件绑定

target.addEventListener(type, listener, useCapture);

```html
<div>
    <a href="#" id="a1">链接a</a>
    <button id="btn1">激活</button>
</div>
```

```js
// 封装事件绑定监听
function bindEvent(elem, type, event) {
    elem.addEventListener(type, event);
}

const btn1 = document.getElementById('btn1')
const a1 = document.getElementById('a1')

bindEvent(btn, "click", event=>{
    console.log(event.target) // 点击的目标元素
})
bindEvent(a1, "click", event=>{
    event.preventDefault()  // 阻止默认行为,点击a标签不会发生跳转
})
```



## 事件冒泡

addEventListener接受三个参数，第一个是事件类型，第二个是回调函数，第三个是是否采用事件捕获（默认false）

当addEventListener第三个参数设置为false时，即为事件冒泡 => 基于DOM树形结构，事件会顺着触发元素向上冒泡（为多层嵌套的元素绑定事件,触发当前元素方法会从当前元素 **由里向外** 逐级触发元素的方法。）

阻止事件冒泡：stopPropagation()

```html
<div id="d3" style="background: #faa;width: 300px;height: 300px;">
    <div id="d2" style="background: #afa;width: 200px;height: 200px;">
        <div id="d1" style="background: #aff;width: 100px;height: 100px;">
            <button id="btn1">激活</button>
            <button id="btn2">取消</button>
        </div>
    </div>
</div>
```

```js
function bindEvent(elem, type, event, bool) {
    elem.addEventListener(type, event, bool);
}

const btn2 = document.getElementById("btn2");
const d1 = document.getElementById("d1");
const d2 = document.getElementById("d2");
const d3 = document.getElementById("d3");

bindEvent(d3, "click", (event) => {
    console.log("取消3");
});
bindEvent(d2, "click", (event) => {
    console.log("取消2");
});
bindEvent(d1, "click", (event) => {
    console.log("取消1");
});
bindEvent(btn2, "click", (event) => {
    console.log("取消");
});
 // 点击btn2 依次打印: 取消 => 取消1 => 取消2 => 取消3

// 阻止事件冒泡
bindEvent(btn2, "click", (event) => {
    event.stopPropagation() 
    console.log("取消");
});
// 点击btn2 打印: 取消
```



## 事件捕获

当addEventListener第三个参数设置为true时，即为事件捕获 => 基于DOM树形结构，事件会顺着触发元素向下捕获（为多层嵌套的元素绑定事件,触发当前元素方法会从当前元素 **由外向里** 逐级触发元素的方法。）

```js
bindEvent(d3, "click", (event) => {
    console.log("取消3");
}, true);
bindEvent(d2, "click", (event) => {
    console.log("取消2");
}, true);
bindEvent(d1, "click", (event) => {
    console.log("取消1");
}, true);
bindEvent(btn2, "click", (event) => {
    console.log("取消");
}, true);
// 点击btn2 依次打印: 取消3 => 取消2 => 取消1 => 取消
```



## 事件代理

利用事件冒泡机制，子元素的方法放在父元素触发。

由于父元素中所有的子元素都会触发父元素的方法，需要用event.target获取触发元素。

用matches来判断是否是触发元素。

适用于for循环为每个子元素绑定方法的场景。

```html
<div id="div4">
    <a href="#">链接1</a><br />
    <a href="#">链接2</a><br />
    <a href="#">链接3</a><br />
    <a href="#">链接4</a><br />
    <button>点击加载更多</button>
</div>
```

```js
const div4 = document.getElementById("div4");
bindEvent(div4, "click", (event) => {
    event.preventDefault();
    if (event.target.nodeName === "A") {
        alert(event.target.innerHTML + "click");
    }
});
```



# AJAX



## XMLHttpRequest

```js
// 手写简易ajax请求
// get 请求
function getAjaxRequest() {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', 'https://api.apiopen.top/getJoke', true) // true 为异步 false 为同步
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log(xhr.response);
            } else {
                console.log(xhr.status);
            }
        }
    }
    xhr.send()
}

// promise封装
function ajax(method, url, params) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.response));
                } else {
                    reject(new Error("error"));
                }
            }
        };
        xhr.send((params && JSON.stringify(params)) || null);
    });
}
// .then 调用
ajax("get", "/data.json")
.then((res) => {
    console.log(res)
})
.catch((err) => {
    console.log(err);
});
// anync await调用
let res = await ajax("get", "/data.json").catch((err) => {
    console.log(err);
});
d1.innerHTML = (res && res.name) || "";
```



## 状态码

xhr.status

2xx - 表示成功处理请求，如 200

- 200 
- ​		

3xx - 需要重定向，浏览器直接跳转，如 301 302 304

- 301
- 302
- 303
- 304

4xx - 客户端请求错误，如404 403

- 404
- 403

5xx - 服务端错误，如500

- 500
- 



## 同源策略和跨域

ajax请求时，浏览器要求当前页面和服务器必须同源（安全），即：协议、域名、端口必须一致

如：前端：http://a.com:8080; server：https//b.com/api/xxx 此时前端无法请求，不符合同源策略



图片、css、js可无视同源策略

<img src=跨域的图片地址 /> 

<link href=跨域的css地址 /> 

<script src=跨域的js地址 ></script>

利用script无视同源策略可实现 **CDN** 和 **JSONP**



跨域：前端可以实现跨域，但必须经过server端允许和配合，未经server允许就实现跨域，说明浏览器有漏洞，危险信号。

实现跨域的几种方式：JSONP，CORS，代理

JSONP

- script标签可绕过跨域限制
- 服务器可以任意动态拼接数据返回
- 通过script可以获得跨域数据，只要服务端愿意返回

```html
<!-- 此页面的服务器是http://127.0.0.1:5500 -->
<script>
    window.getData = function (data) {
        // 跨域得到的数据
        console.log(data)
    }
</script>
<!-- 通过JSONP方式请求http://127.0.0.1:5501的数据 -->
<script src="http://127.0.0.1:5501/data.js"></script>
```



CORS

服务器配置http header

```java
response.setHeader("Access-Control-Allow-Origin", "http://loaclhost:8081"); // 第二个参数为 * ，表示所有
response.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
response.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
response.setHeader("Access-Control-Allow-Credentials", "true");
```



##  jquery

```js
$(function(){
    //请求参数
    var list = {};
    //
    $.ajax({
        //请求方式
        type : "POST",
        //请求的媒体类型
        contentType: "application/json;charset=UTF-8",
        //请求地址
        url : "http://127.0.0.1/admin/list/",
        //数据，json字符串
        data : JSON.stringify(list),
        //请求成功
        success : function(result) {
            console.log(result);
        },
        //请求失败，包含具体的错误信息
        error : function(e){
            console.log(e.status);
            console.log(e.responseText);
        }
    });
});
```



## fetch

https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch

```js
// 基本的fetch请求
fetch('http://example.com/movies.json')
  .then(response => response.json())
  .then(data => console.log(data));


// Example POST method implementation:
async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

postData('https://example.com/answer', { answer: 42 })
    .then(data => {
    console.log(data); // JSON data parsed by `data.json()` call
});
```



## axios

http://www.axios-js.com/

- get 请求

```js
// 为给定 ID 的 user 创建请求
axios.get('/user?ID=12345')
    .then(function (response) {
    	console.log(response);
	})
    .catch(function (error) {
    	console.log(error);
	});

// 上面的请求也可以这样做
axios.get('/user', {
    params: {
        ID: 12345
    }
})
    .then(function (response) {
    console.log(response);
})
    .catch(function (error) {
    console.log(error);
})
```

- post 请求

```js
axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
})
    .then(function (response) {
    console.log(response);
})
    .catch(function (error) {
    console.log(error);
});


```

-  执行多个并发请求

```js
function getUserAccount() {
    return axios.get('/user/12345');
}

function getUserPermissions() {
    return axios.get('/user/12345/permissions');
}

axios.all([getUserAccount(), getUserPermissions()])
    .then(axios.spread(function (acct, perms) {
    // 两个请求现在都执行完成
}));
```

- axios API

```js
// 发送 POST 请求
axios({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
});
// 获取远端图片
axios({
  method:'get',
  url:'http://bit.ly/2mTM3nY',
  responseType:'stream'
})
  .then(function(response) {
  response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
});

```

- 请求配置

```js

```

- 响应结构

```js

```

- 默认值配置

```js

```

- 拦截器

```js

```

- 错误处理

```js

```





# 存储



## cookie

本身用于浏览器和server通讯，被借用到本地存储来。

- 存储大小，最大4KB
- http请求时需要发送到服务器端，增加请求数据



## loaclStorage

语法：getItem setItem

- 用于本地存储
- 最大存储5M
- 数据会永久存储，除非代码或手动删除



## sessionStorage

语法：getItem setItem

- 用于本地存储
- 最大存储5M
- 数据只存在于当前会话，浏览器关闭则清空





# 运行环境

运行环境即浏览器（server端有node.js）

下载网页代码，渲染出页面，期间会执行若干JS

要保证代码在浏览器中：稳定且高效



## url





## 网页加载和渲染过程

加载过程：

1. DNS解析：域名-> IP地址

2. 浏览器根据IP地址向服务器发起http请求

3. 服务器处理http请求，并返回给浏览器


渲染过程：

1. 根据HTML代码生成DOM Tree 

2. 根据CSS代码生成CSSOM

3. 将DOM Tree和CSSOM整合形成Render Tree

4. 根据Render Tree渲染页面

5. 遇到script则暂停渲染，优先加载并执行JS代码，完成再继续

6. 直到把 Render Tree 渲染完成



> window.onload 和 DOMContentLoaded 区别：

> window.onLoad资源全部加载完才能执行，包括图片
>
> DOMContentLoaded DOM渲染完成即可，图片，视频等可能尚未下载





## 性能优化

性能优化原则：

- 多使用内存、缓存或其他方法
- 减少CPU计算，减少网络加载耗时

加载更快

减少资源体积：压缩代码

减少访问次数：合并代码，SSR服务器端渲染，缓存

使用更快的网络：CDN

渲染更快

CSS放在head，JS放在body最下面

尽早开始执行JS，用DOMContentLoaded触发

懒加载（图片懒加载，上滑加载更多）

对dom查询进行缓存

避免频繁操作dom（对DOM查询进行缓存，频繁DOM操作，合并到一起插入DOM结构）

节流throttle和防抖debounce



## 安全

常见的web前端攻击方式有哪些？

- XSS跨站请求攻击
- XSRF跨站请求伪造

XSS预防

- 替换特殊字符，如 < 变为  &lt； > 变为 &gt；

- <script>变为 &lt；script&gt；直接显示，而不会作为脚本执行


