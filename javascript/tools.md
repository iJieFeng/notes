# 防抖函数



```js
/**
 * 防抖函数，延迟调用 func 方法，直到距离上次调用经过了 wait 毫秒。
 *
 * @param {Function} func - 要防抖的函数。
 * @param {number} [wait=1500] - 延迟的毫秒数。
 * @param {boolean} [immediate=false] - 是否在延迟开始时调用函数。
 * @return {Function} - 防抖函数。
 */
function debounce(func, wait = 1500, immediate = false) {
  if (!immediate) {
    let timer = null
    return function() {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        func.apply(this, arguments)
      }, wait)
    }
  } else {
    let timer = null
    return function() {
      if (timer) clearTimeout(timer)
      let callNow = !timer
      timer = setTimeout(() => {
        timer = null
      }, wait)
      if (callNow) {
        func.apply(this, arguments)
      }
    }
  }
}
```



# 节流函数

```js
/**
 * 节流函数，每隔 `interval` 毫秒最多只调用一次提供的函数。
 *
 * @param {function} func - 要节流的函数。
 * @param {number} [interval=500] - 节流函数调用的间隔时间，单位为毫秒。
 * @param {boolean} [immediate=true] - 是否立即调用函数，还是等待第一个 `interval` 的时间后再调用。
 * @return {function} - 节流后的函数。
 */

function throttle(func, interval = 500, immediate = true) {
  if (immediate) {
    let time = null
    return function() {
      if (!time || Date.now() - time > interval) {
        func.apply(this, arguments)
        time = Date.now()
      }
    }
  } else {
    let timer = null
    return function() {
      if (timer) return
      timer = setTimeout(() => {
        func.apply(this, arguments)
        timer = null
      }, interval)
    }
  }
}
```



# 时间格式化

```js
/** 
  * 微信小程序wxs
  * timestamp:时间戳
  * format:时间格式化样式
*/
var formatTime = function (timestamp,format){
    if (!format) {
        format = "yyyy-MM-dd hh:mm:ss"
    }
    timestamp = parseInt(timestamp)
    var realDate = getDate(timestamp)
    function timeFormat(num) {
        return num < 10 ? '0' + num : num
    }
    var date = [
        ["M+", timeFormat(realDate.getMonth() + 1)],
        ["d+", timeFormat(realDate.getDate())],
        ["h+", timeFormat(realDate.getHours())],
        ["m+", timeFormat(realDate.getMinutes())],
        ["s+", timeFormat(realDate.getSeconds())],
        ["q+", Math.floor((realDate.getMonth() + 3) / 3)],
        ["S+", realDate.getMilliseconds()]
    ]
    var reg1 = getRegExp("(y+)", "i").exec(format)
    if (reg1) {
        format = format.replace(reg1[1], (realDate.getFullYear() + '').substring(4 - reg1[1].length))
    }
    for (var i=0;i<date.length;i++) {
        var k = date[i][0]
        var v = date[i][1]
        var reg2 = getRegExp("(" + k + ")").exec(format)
        if (reg2) {
            format = format.replace(reg2[1], reg2[1].length == 1 ? v : ("00" + v).substring(("" + v).length))
        }
    }
    return format
}

/** 
  * vue 过滤器
  * @param {String} timestamp-时间戳 
  * @param {String} fmt-时间格式化样式
*/
formatDateTime(timestamp, fmt) {
  timestamp = parseInt(timestamp)
  let date = new Date(timestamp)
  if (!date) {
    return ''
  }
  let o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'S': date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}

```



# 对象判空

```
Object.keys({}).length === 0
JSON.stringify({}) === '{}'
```



# 深拷贝

- 通过JSON对象来实现深拷贝


```js
function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}
```



- 递归实现深拷贝

```js
function deepClone(obj){
    let objClone = Array.isArray(obj)?[]:{};
    if(obj && typeof obj==="object"){
        for(key in obj){
            if(obj.hasOwnProperty(key)){
                //判断ojb子元素是否为对象，如果是，递归复制
                if(obj[key] && typeof obj[key] ==="object"){
                    objClone[key] = deepClone(obj[key]);
                }else{
                    //如果不是，简单复制
                    objClone[key] = obj[key];
                }
            }
        }
    }
    return objClone;
}    
```



- 使用Object.create()实现深拷贝

```js
function deepClone(initalObj, finalObj) {    
    var obj = finalObj || {};    
    for (var i in initalObj) {
        // 避免相互引用对象导致死循环，如initalObj.a = initalObj的情况
        var prop = initalObj[i]; 
        if(prop === obj) {            
            continue;
        }        
        if (typeof prop === 'object') {
            obj[i] = (prop.constructor === Array) ? [] : Object.create(prop);
        } else {
            obj[i] = prop;
        }
    }    
    return obj;
}
```



- 使用Object.assign实现深拷贝（对象的value是基本类型并且要把它赋值给一个空对象，否则是浅拷贝）

```js
// obj的value是基本类型
var obj1 = {
    name: "张三",
    age: 18
}
// obj赋值给一个空{}
var obj2 = Object.assign({}, obj1); 
obj2.a = 3;
console.log(obj1.a)；// 1
```



- 用slice、concat、扩展运算符（...）实现对数组的深拷贝（数组中的值是基本数据类型，否则是浅拷贝）

```js
var arr1 = ["1","2","3"]; 
var arr2 = arr1.slice(0); 
var arr2 = arr1.concat(); 
var arr2 = [...arr1];

// 当数组里面的值是引用数据类型，比如Object，Array时，属于浅拷贝
var arr1 = [{a:1},{b:2},{c:3}];
var arr2 = arr1.concat();
arr2[0].a = "9";
console.log("数组的原始值：" + arr1[0].a ); // 数组的原始值：9
console.log("数组的新值：" + arr2[0].a ); // 数组的新值：9
```



# 数组去重

- 利用filter + indexOf (ES5)


```js
function unique(arr) {
    return arr.filter((item, index, arr) => {
        return arr.indexOf(item) === index
    })
}

var arr = [1, 1, 3, 6, 6, 9]
let res = unique(arr)
console.log(res); // [1, 3, 6, 9]
```



- 利用new Set() (ES6)

```js
function unique(arr) {
    return [...new Set(arr)]
}

var arr = [1, 2, 3, 1, 1, 5, 9, 6, 6]
let res = unique(arr)
console.log(res, 6666); // [1, 2, 3, 5, 9, 6]
```



- 利用new Map() 实现数组对象去重

```js
function unique(arr) {
    const res = new Map();
    return arr.filter((arr) => !res.has(arr.id) && res.set(arr.id, 1))
}

let arr = [
    {id: 1, name: '张三'},
    {id: 1, name: '李四'},
    {id: 2, name: '王五'},
    {id: 3, name: '周六'}
]
console.log(unique(arr)) 
// [{id: 1,name: '张三'},{id: 2,name: '王五'},{id: 3,name: '周六'}]
```



# 保存文件

```js
/**
  * 方法一（图片地址决定是直接打开还是打开另存为）
  * @param {String} imageUrl-图片地址
  * @param {String} imageName-图片名称
*/
downLoadImage(imageUrl,imageName){
    var a = document.createElement('a')
    a.download = imageName
    a.href = imageUrl
    var event = new MouseEvent('click')
    a.dispatchEvent(event)
}

/**
  * 方法二（使用domtoimage插件，可将代码转换为图片）
  * @param {*} elementId-元素id
*/
downLoadImage(elementId){
    const _this = this
    const node = document.getElementById('elementId')
    domtoimage.toPng(node).then((dataUrl) => {
        var a = document.createElement('a')
        a.download = this.codeName
        a.href = dataUrl
        a.click()
    }).catch(function(error) {
        console.error('oops, something went wrong!', error)
    })
}
```



# 复制链接

```js
/**
  * 方法一:execCommand
  * @param {String} link-链接
*/
copyUrl(link) {
  let url =  'link'
  let oInput = document.createElement('input')
  oInput.value = url
  document.body.appendChild(oInput)
  oInput.select()
  document.execCommand('Copy')
  oInput.className = 'oInput'
  oInput.style.display = 'none'
},

/**
  * 方法二:clipboard 最好放在try...catch里面防止报错
  * @param {String} link-链接
*/
copyUrl(link) {
    try {
        navigator.clipboard.writeText(value)
    } catch (err) {
        console.log(err)
    }
}
```



