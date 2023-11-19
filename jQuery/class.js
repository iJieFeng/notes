/* 手写jQuery */
// class--对象原型的语法糖

class jQuery {
  constructor(selector) {
    // 获取dom
    const result = document.querySelectorAll(selector);
    this.length = result.length;
    for (let i = 0; i < this.length; i++) {
      this[i] = result[i];
    }
  }
  // 封装get方法 => 获得由选择器指定的 DOM 元素
  get(index) {
    return this[index];
  }

  // 封装hide方法 => 隐藏选中元素
  hide() {
    for (let i = 0; i < this.length; i++) {
      this[i].style.display = "none";
    }
  }

  each(fn) {
    for (let i = 0; i < this.length; i++) {
      const elem = this[i];
      fn(elem);
    }
  }

  // 封装on方法 => 在被选元素添加事件
  on(type, fn) {
    return this.each(function (elem) {
      elem.addEventListener(type, fn, false);
    });
  }
}

var $ = function (selector) {
  return new jQuery(selector);
};
