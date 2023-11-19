/* 手写jQuery */

function jQuery(selector) {
  // 获取dom
  const result = document.querySelectorAll(selector)
  this.length = result.length
  for (let i = 0; i < this.length; i++) {
    this[i] = result[i]
  }

}

// 封装get方法 => 获得由选择器指定的 DOM 元素
jQuery.prototype.get = function (index) {
  return this[index]
}

// 封装hide方法 = 隐藏选中元素
jQuery.prototype.hide = function () {
  for (let i = 0; i < this.length; i++) {
    this[i].style.display = 'none'
  }
}

// 封装on方法在被选元素及子元素上添加事件
jQuery.prototype.each = function (fn) {
  for (let i = 0; i < this.length; i++) {
    const elem = this[i]
    fn(elem)
  }
}

jQuery.prototype.on = function (type, fn) {
  return this.each(function (elem) {
    elem.addEventListener(type, fn, false)
  })
}


var $ = function (selector) {
  return new jQuery(selector)
}