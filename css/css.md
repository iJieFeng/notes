# 外部样式表

```html
<!-- 链接式 -->
<link type="text/css" rel="styleSheet" href="CSS文件路径" />
<!-- 导入式 -->
<style type="text/css">
	@import url("css文件路径");
</style>
```



# 选择器

1、类与ID选择器

2、结构选择器

```css
/* 后代选择器 */  
/* 子级选择器 */ >
/* 兄弟选择器 */ ~ +
```

3、属性选择器

```html
<div title id></div>
<div title="aaa"></div>
```

```css
<style>
	div[titel][id] {}
	div[titel^*~$|*="aaa"] {}
</style>
```

4、伪类选择器

```css
a:hover{}
...
input:focus{}
input:hover{}
input:active{}
:root{}
p:empty{}
```

5、结构伪类选择器

```css
p:first-child {}
p:last-child {}
p:nth-last-child(2) {}
p:nth-of-type(2) {}
p:nth-of-type(odd) {} /* 奇数 */ 
p:nth-of-type(even) {} /* 偶数 */
p:nth-of-type(3n+0) {} /* 3的倍数*/
p:nth-child(-n+3):not(:nth-child(2)):not(:first-child){}
```



# 文本

```css
/* 保留空格和换行符 */
white-space:pre; 
/* 保留空格和换行符 */
white-space:pre-wrap; 
/* 保留换行符和合并空格 */
white-space:pre-line; 
/* 不换行并且溢出显示... */
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
/* 超过 一 行溢出显示... */
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
display: -webkit-box;
-webkit-line-clamp: 1;
-webkit-box-orient: vertical;
word-break: break-all;
/* 超过 X 行溢出显示... */
overflow: hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: X;
/* 首行缩进 */
text-indent: 2em;
/* 排版模式 */
writing-mode:;
```



# 盒子

```css
/* 盒子宽高自动撑满可用空间 */
width:fill-available;
/* 盒子根据内容尺寸自适应 */
width: fit-content; /* max-content/min-content */
/* overflow触发BFC清除浮动 */
height:auto;
overflow:hidden;
/* clearfix清除浮动，一般配合after伪元素使用 */
/* 盒子形状 */
clip-path: circle(); /* 圆形 */
clip-path: circle(50% at 100% 0); /* 圆形位置 */
clip-path: ellipse(); /* 椭圆 */
clip-path: ellipse(50% 30%); /* 椭圆位置 */
```



# 背景

```css
/* 背景范围 */
backgroun-clip: content-box; /* 背景只包含内容 */
backgroun-clip: padding-box; /* 背景包含padding */
backgroun-clip: border-box; /* 背景包含边框 */
/* 背景重复 */
background-repeat:repeat; /* 重复展示背景（默认） */
background-repeat:space; /* 重复展示背景,平均分配 */
background-repeat:no-repeat; /* 不重复展示背景 */
background-repeat:repeat-x; /* 横向重复展示背景 */
background-repeat:repeat-y; /* 纵向重复展示背景 */
/* 背景滚动 */
background-attachment: scroll; /* 背景随页面滚动（默认） */
background-attachment: fixed; /* 背景固定位置，不随页面滚动 */
/* 背景定位 */
background-position: center; /* 居中 */
background-position: 50% 50%; /* 居中 */
/* 多图背景 */
background-imgage: url(''), url('');
background-position: top left, center;
background-repeat: repeat,no-repeat;
/* 简写 */
background: color url() repeat position;
```



# 阴影

```css
/* box-shadow 垂直偏移量 水平偏移量 模糊度 颜色; */
box-shadow: 0 0 5px rgba(100,100,100,.3);
```



# 渐变

```css
/* 线性渐变 background: linear-gradient(180/90/45/-45deg|to left/right/top/bottom--渐变方向,颜色,颜色，颜色--多种颜色平均分配 */
background: linear-gradient(to bottom right,red,green,blue);
/* 镜像渐变 background: radial-gradient(100px 100px | at left/right/top/bottom | at 50% 50%--渐变方向,颜色,颜色，颜色--多种颜色平均分配 */
background: radial-gradient(100px 100px,red,green,blue);
/* 标识位，开始渐变的位置 */
background: linear-gradient(45deg,red 50%,green 50%); /* 不渐变 */
/* 中间阀值 */
background: linear-gradient(90deg, red, 50%, green);
/* 重复渐变 */
background: repeating-linear-gradient();
/* 镜像标识位绘制小太阳 */
width: 150px;
height: 150rpx;
background: radial-gradient(red,yellow 30%,black 70%, blcak 100%)
```





# BEM架构

b

e


m



# Vue中scoped原理

vue中的scoped 通过在DOM结构以及css样式上加唯一不重复的标记:data-v-hash的方式，以保证唯一（而这个工作是由过PostCSS转译实现的），达到样式私有化模块化的目的。

scoped三条渲染规则：

1. 给HTML的DOM节点加一个不重复data属性(形如：data-v-123)来表示他的唯一性

2. 在每句css选择器的末尾（编译后的生成的css语句）加一个当前组件的data属性选择器（如[data-v-123]）来私有化样式
3. 如果组件内部包含有其他组件，只会给其他组件的最外层标签加上当前组件的data属性

PostCSS会给一个组件中的所有dom添加了一个独一无二的动态属性data-v-xxxx，然后，给CSS选择器额外添加一个对应的属性选择器来选择该组件中dom，这种做法使得样式只作用于含有该属性的dom——组件内部dom, 从而达到了'样式模块化'的效果.



# Vue中的样式穿透

vue常用的组件库（element, vnat, AntDesigin）, 如果要修改组件库自带的样式，就需要使用样式穿透。

原理：Scoped在进行PostCss转化的时候把元素选择器默认放在了最后，样式穿透的作用就是用来改变 属性选择器的位置

**vue2**

- 三箭头 ` >>>`（原生css）

  ```
  .类名 >>> .类名{样式}
  ```

- `  /deep/ `（预处理器：less，sass）

  ```
  /deep/ .类名{样式}
  父类 /deep/ 子类
  ```

- ` ::v-deep`（预处理器：less，sass）

  ```
  ::v-deep .类名{样式}
  父类 ::v-deep 子类
  ```

  

**Vue3**

- `:deep()`

  ```css
  .inp {
  	:deep(input) {
  		background: #faa;
  	}
  }
  ```

- `::v-deep()`

  ```css
  ::v-deep(.inp input) {
  		background: #faa;
  	}
  }
  ```

  

# vue3.0 style新特性

##  插槽选择器`:slotted`

用于修改组件中slot的样式

```css
<style scoped>
 :slotted(.a) {
    color:red
}
</style>
```

## 全局选择器  `:global` 

在之前我们想加入全局 样式 通常都是新建一个style 标签 不加[scoped](https://so.csdn.net/so/search?q=scoped&spm=1001.2101.3001.7020) 现在有更优雅的解决方案

```css
<style lang="less" scoped>
:global(div){
    color:red
}
</style>
```

## 动态 CSS `v-bind`

单文件组件的 `<style>` 标签可以通过 `v-bind` 这一 CSS 函数将 CSS 的值关联到动态的组件状态上

```vue
<template>
    <div class="div">
       小满是个弟弟
    </div>
</template>
 
<script lang="ts" setup>
import { ref } from 'vue'
const red = ref<string>('red')
</script>
 
<style lang="less" scoped>
.div{
   color:v-bind(red)
}
 
</style>
```

如果是对象 [v-bind](https://so.csdn.net/so/search?q=v-bind&spm=1001.2101.3001.7020) 请加引号

```vue
 <template>
    <div class="div">
        小满是个弟弟
    </div>
</template>
 
<script lang="ts" setup>
import { ref } from "vue"
const red = ref({
    color:'pink'
})
</script>
 
    <style lang="less" scoped>
.div {
    color: v-bind('red.color');
}
</style>
```

## css `module`

style module 标签会被编译为 CSS Modules 并且将生成的 CSS 类作为 $style 对象的键暴露给组件

```vue
<template>
    <div :class="$style.red">
        小满是个弟弟
    </div>
</template>
 
<style module>
.red {
    color: red;
    font-size: 20px;
}
</style>
```

自定义注入名称（多个可以用数组）

你可以通过给 `module` attribute 一个值来自定义注入的类对象的 property 键

```vue
<template>
    <div :class="[zs.red,zs.border]">
        小满是个弟弟
    </div>
</template>
 
<style module="zs">
.red {
    color: red;
    font-size: 20px;
}
.border{
    border: 1px solid #ccc;
}
</style>
```

与组合式 API 一同使用

注入的类可以通过 useCssModule API 在 setup() 和 <script setup> 中使用。对于使用了自定义注入名称的 <style module> 模块，useCssModule 接收一个对应的 module attribute 值作为第一个参数

```vue
<template>
    <div :class="[zs.red,zs.border]">
        小满是个弟弟
    </div>
</template>

<script setup lang="ts">
import { useCssModule } from 'vue'
const css = useCssModule('zs')
</script>

<style module="zs">
.red {
    color: red;
    font-size: 20px;
}
.border{
    border: 1px solid #ccc;
}
</style>
```

使用场景一般用于[TSX](https://so.csdn.net/so/search?q=TSX&spm=1001.2101.3001.7020) 和 render 函数 居多
