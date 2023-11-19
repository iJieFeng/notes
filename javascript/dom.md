# DOM

全称 Document Object Model,即文档对象模型,它允许脚本(js)控制Web页面、窗口和文档



# DOM节点操作

```js
// 获取DOM节点
const div1 = document.getElementById('div1') // 元素
const divList = document.getElementByTagName('div') // 集合
const contianerList = document.getElementByClassName('.contianer') // 集合
const pList = document.querySelectorAll('p') // 集合
const body = document.body // body

// property (修改节点属性中的变量，不会体现在html结构中)
const p1 = pList[0]
p1.style.width = '100px'
p1.className = 'p1'
console.log(p1.nodeName)
console.log(p1.nodeType)

// attribute （修改节点属性，会改变html结构）
p1.setAttribute('data-name', 'test')
console.log(getAttribute('data-name')) // test
p1.setAttribute('style', 'font-size: 50px')

// property和attributeg可能引起DOM的重新渲染
```



# DOM结构操作

```js
// 新增/插入节点
const div1 = document.getElementById('div1')
// 新建节点 createElement
const p1 = document.createElement('p')
p1.innerHTML = 'this is p1'
// 插入节点 appendChild
div1.appendChild(p1)
// 移动节点
const p2 = doucument.getElementById('p2')
div1.appendChild(p2)
// 获取父元素 parentNode
const parentNode = p2.parentNode
// 获取子元素列表 childNodes
const div1 = document.getElementById("div1");
const childNode = Array.prototype.slice
 .call(div1.childNodes)
 .filter((item) => {
	if (item.nodeType === 1) {
		return true;
	} else {
		return false;
	}
 });
 console.log(pNode);
```



# DOM性能

dom操作可能会引起浏览器重新渲染(重绘和重排)，占用cpu多，耗时长，频繁操作dom会造成页面卡顿，影响性能

- 避免频繁操作DOM
- 对DOM查询做缓存
- 将频繁操作改为一次性操作

```js
// 不缓存DOM查询结果
for (let i = 0; i<document.querySelectorAll('p').length; i++) {
    // 每次循环，都会计算length, 频繁进行DOM查询
}
// 缓存DOM查询结果
const pList = document.querySelectorAll('p')
const len = pList.length
for (let i=0; i<len; i++) {
    // 缓存length, 只进行一次DOM查询
}

// 将频繁DOM操作改为一次性操作
/** 频繁操作 */
const ul1 = document.getElementById("ul1");
for (let i = 0; i < 10; i++) {
    let liNode = document.createElement("li");
    liNode.innerHTML = i + "号";
    ul1.appendChild(liNode);
}
/** 一次性操作 */
const listNode = document.getElementById("list");
// 创建一个文档片段
const frag = document.createDocumentFragment();
for (let i = 0; i < 10; i++) {
    const li = document.createElement("li");
    li.innerHTML= i + "号";
    frag.appendChild(li);
}
// 最后再插入到DMO树中
listNode.appendChild(frag);
```


