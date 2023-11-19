# JavaScript

## 数据类型

### 原始类型

原始值指的是没有属性或方法的值，原始值是一成不变的。

原始数据类型指的是拥有原始值的数据

JavaScript 定义了 5 种原始数据类型

- number => 数值型
- string => 字符串型
- boolean => 布尔型
- undefind => 未定义型
- null => 空
- symbol => （es6新增）

```js
var a = 1; // 名字和值都会储存在栈内存中
b = a; // 栈内存会开辟一个新的内存空间，此时b和a都是相互独立的
b = 2;
console.log(a); // 1
```

### 引用类型

javaScript中除了原始类型之外就是对象(Object)，数组、函数是特殊的对象。

```js
var obj1 = { // 名存在栈内存中，值存在于堆内存中，但是栈内存会提供一个引用的地址指向堆内存中的值
    name: "张三",
    age: 18
} 
obj2 = obj1  // 当obj2 = obj1进行拷贝时，其实复制的是obj1的引用地址，而并非堆里面的值
obj2.name = "李四" // 当obj2.name = "李四" 进行修改时，由于obj1与obj2指向的是同一个地址，所以obj1也受了影响，这就是所谓的浅拷贝了。
console.log(obj1) // {name: "李四", age :18}
// 如何实现深拷贝?
```

### 类型判断

#### typeof 

识别值类型、函数、引用类型（有缺陷）

```js
typeof "Bill"                // 返回 "string"
typeof 3.14                  // 返回 "number"
typeof true                  // 返回 "boolean"
typeof x                     // 返回 "undefined" (假如 x 没有值)
typeof {name:'Bill', age:62} // 返回 "object"
typeof [1,2,3,4]             // 返回 "object" (并非 "array"，参见下面的注释)
typeof null                  // 返回 "object" 
typeof function myFunc(){}   // 返回 "function"
```

#### toString

```js
function typeOf(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase() 
}
typeOf(new Date) // 'date'
typeOf({}) // 'object' 
typeOf(null) // 'null'
```

####  instanceof 

用 typeof 运算符时采用引用类型存储值会出现一个问题，无论引用的是什么类型的对象，它都返回 "object"。ECMAScript 引入了另一个 Java 运算符 instanceof 来解决这个问题。instanceof 用于检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上。

```js
function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}
const auto = new Car('Honda', 'Accord', 1998);

auto instanceof Car // true
auto instanceof Object // true
[] instanceof Array // true
[] instanceof Object // true
{} instanceof Object // true
```

### 类型转换

#### 隐式转换

隐式转换触发：四则运算（加减乘除），== 当比较的两者类型不同时会进行类型转换

隐式转换原则：如果加号两端中出现字符串，则数据转为字符串型，执行拼接；其他情况都是自动调用number函数转为数值型

a.  数值型+字符串型 => 数值型转为字符串型；

b.  数值型+布尔型 => 布尔型转为数值型；

c.  字符串型+布尔型 => 布尔型转为字符串型

d. undefined与任何值相加，值都为NaN

```js
1=='1' //true 此情景 string转number
null == undefined //true 如果仅需要过滤掉null, undefined 两种属性时可以利用此特性
[] == ! [] //true 因为对象转基本类型后做比较 false == fase 0 == 0
[] == ![] //true
[] == false //true
0 == false // true
'' == false //true
'' == Number(false) //true
'' == 0 //true
Number('') == 0 //true
0 == 0 //true

const obj = { x:100 }
if(obj.a==null) {}
// 相当于 if (obj.a===null || obj.a===undefined) { }
```

#### 强制转换

a.Number() 强制转换数值型 （NAN：Not a Number，NaN和任何值执行运算结果都是NaN） 

b.parseInt() 强制转整型

c.parseFloat() 强制转浮点型

d.toString 强制将数值和布尔型转为字符串



## 运算符

### 常规运算符

**算术运算符**

-   \+ - \* / 加减乘除
-   %取余：判断是否闰年，判断奇数和偶数
-   ++自增：在原来的基础上加1；
-   \--自减： 在原来基础上减1

 **比较运算符**

-   \< \>= \<=
-   ==(等于) !=(不等于)：比较值
-   ===(全等于) !==不全等于：比较值和类型

**逻辑运算符**

- && 并且：关联的两个条件都是true，结果是true，否则false；

- \|\| 或者：关联的两个条件有个一是true，结果是true，否则false；

- ! 非：取反

- **短路逻辑：**

  在逻辑运算中，如果前一个条件已经可以得出最终结论，则后续内容不再执行，只有前一个条件不足以得出最终结论时，后一个条件才会执行。

  在&&运算中，如果第一个条件为false，不再执行第二个条件。在\|\|运算中，如果第一个条件为true，不再执行第二个条件

**位运算符**

在执行运算的时候，计算机会把数据转换成二进制再运算。

十进制和二进制转换过程中可能会出现误差，通常只存在小数的运算中。

**赋值运算符**

= += -= \*= /= %=

其中+=，-=，\*=，/=称为计算赋值，即先执行计算再执行赋值；

a+=1等同于a=a+1；

**三目运算符**

由两个运算符连接的三个操作数据或表达式

**三目运算**的语法结构：条件表达式 **?** 表达式1 **:** 表达式2



### ?. 可选链 

```js
// a?.name  含义：a具有name属性的时候,才会把值赋给b,否则就会将undefined赋值给b
let a
console.log(a?.name) // undefined
```

### ?? 空值合并运算

```js
// ?? （空值合并运算） 当a除了undefined、或者null之外的任何值,b都会等于a,否则就等于c.
let b; 
let a = 0; 
let c = { name:'buzhimingqianduan' } 
b = a ?? c
```

### ??= 空值赋值运算 

```js
// ??= （空值赋值运算符） 当??=左侧的值为null、undefined的时候,才会将右侧变量的值赋值给左侧变量.其他所有值都不会进行赋值
let b = '你好'; 
let a = 0 
let c = null; 
let d = '123'
b ??= a;  
// b = “你好” 
c ??= d  
// c = '123'
```



## 函数

JavaScript 函数是被设计为执行特定任务的代码块，会在被调用时执行。

### 函数的声明

JavaScript 有三种声明函数的方法。

- **function 命令**
- **函数表达式**
- **Function 构造函数**

```js
// 1.function 命令
// function 函数名(参数1，参数2){ 代码块 }
function print(s) {
  console.log(s);
}

// 2.函数表达式
// var 函数名 = function(参数1，参数2) { 代码块 }
var print = function(s) {
  console.log(s);
};
// 采用函数表达式声明函数时，function命令后面不带有函数名。如果加上函数名，该函数名只在函数体内部有效，在函数体外部无效。
var print = function x(){
  console.log(typeof x);
};
x
// ReferenceError: x is not defined
print()
// function

// 3.Function 构造函数
// var 函数名= new Function('参数1','参数2','代码块')
// 这种声明函数的方式非常不直观，几乎无人使用。
var add = new Function(
  'x',
  'y',
  'return x + y'
);
// 等同于
function add(x, y) {
  return x + y;
}

```

如果同一个函数被多次声明，后面的声明就会覆盖前面的声明。

```js
function f() {
    console.log(1);
}
f() // 2

function f() {
    console.log(2);
}
f() // 2
```



### 函数的调用

调用函数时，要使用圆括号运算符。圆括号之中，可以加入函数的参数。

函数体内部的`return`语句，表示返回。

JavaScript 引擎遇到`return`语句，就直接返回`return`后面的那个表达式的值，后面即使还有语句，也不会得到执行。

`return`语句所带的那个表达式，就是函数的返回值。

`return`语句不是必需的，如果没有的话，该函数就不返回任何值，或者说返回`undefined`。

```js
function add(x, y) {
  return x + y;
}

add(1, 1) // 2
```

函数可以调用自身，这就是递归（recursion）。下面就是通过递归，计算斐波那契数列的代码。

```js
function fib(num) {
  if (num === 0) return 0;
  if (num === 1) return 1;
  return fib(num - 2) + fib(num - 1);
}

fib(6) // 8
```

JavaScript 语言将函数看作一种值，与其它值（数值、字符串、布尔值等等）地位相同。凡是可以使用值的地方，就能使用函数。比如，可以把函数赋值给变量和对象的属性，也可以当作参数传入其他函数，或者作为函数的结果返回。函数只是一个可以执行的值，此外并无特殊之处。

```js
function add(x, y) {
  return x + y;
}

// 将函数赋值给一个变量
var operator = add;

// 将函数作为参数和返回值
function a(op){
  return op;
}
a(add)(1, 1)
// 2
```

如果函数调用的*参数太多*（超过声明），则可以使用 *arguments 对象*来达到这些参数。

JavaScript 函数有一个名为 arguments 对象的内置对象。

arguments 对象包含函数调用时使用的参数数组。

严格模式下，`arguments`对象是一个只读对象，修改它是无效的，但不会报错。

然`arguments`很像数组，但它是一个对象。数组专有的方法（比如`slice`和`forEach`），不能在`arguments`对象上直接使用。

`arguments`对象使用数组方法，真正的解决方法是将`arguments`转为真正的数组

```js
function findMax() {
    console.log(arguments) // [1, 123, 500, 115, 44, 88]
    let max = -Infinity; // 负无穷大的数值
    for ( let i = 0; i < arguments.length; i++) {
        if (arguments[i] > max) {
            max = arguments[i];
        }
    }
    return max;
}
x = findMax(1, 123, 500, 115, 44, 88);
console.log(x) // 500

```

如果参数通过值传递，函数改变了参数的值，它不会改变参数的原始值。（参数的改变在函数之外是不可见的。）

```js
var a = 1
function fn(arg) {
    arg.a = 2
}
console.log(a) // 1
```

如果参数传递的是对象，函数改变了对象属性，它也改变了原始值。（对象属性的改变在函数之外是可见的。）

```js
var obj = {a:1}
function fn(arg) {
    arg.a = 2
}
console.log(obj) // { a: 2 }
```

函数自调用（一次性函数）

```js
(function (形参列表) {
    return .....
})(实参列表);

(function (形参列表) {
    return .....
}(实参列表))
```

### 函数名的提升

JavaScript 引擎将函数名视同变量名，所以采用`function`命令声明函数时，整个函数会像变量声明一样，被提升到代码头部。所以，下面的代码不会报错。

```javascript
f();
function f() {}
```

但是，如果采用赋值语句定义函数，JavaScript 就会报错。

```js
f();
var f = function (){};
// TypeError: undefined is not a function

// 上面的代码等同于下面的形式等同于
var f;
f();
f = function () {};
// 上面代码第二行，调用`f`的时候，`f`只是被声明了，还没有被赋值，等于`undefined`，所以会报错。

```

因此，如果同时采用`function`命令和赋值语句声明同一个函数，最后总是采用赋值语句的定义。

```js
var f = function () {
  console.log('1');
}

function f() {
  console.log('2');
}

f() // 1
```

### 函数的属性和方法

- name 属性
- length 属性
- toString()

```js
/** --------------------------------name 属性-------------------------------- */
// 函数的name属性返回函数的名字。
function f1() {}
f1.name // "f1"

// 如果是通过变量赋值定义的函数，那么name属性返回变量名。
var f2 = function () {};
f2.name // "f2"

// 如果变量的值是一个具名函数，那么name属性返回function关键字之后的那个函数名。
var f3 = function myName() {};
f3.name // 'myName'

// name属性的一个用处，就是获取参数函数的名字。
var myFunc = function () {};
function test(f) {
  console.log(f.name);
}
test(myFunc) // myFunc

/** --------------------------------length 属性-------------------------------- */

// 函数的length属性返回函数预期传入的参数个数，即函数定义之中的参数个数。
function f(a, b) {}
f.length // 2

/** --------------------------------toString()-------------------------------- */
// 函数的toString方法返回一个字符串，内容是函数的源码。
// 函数内部的注释也可以返回。
// 利用这一点，可以变相实现多行字符串。
var multiline = function (fn) {
  var arr = fn.toString().split('\n');
  return arr.slice(1, arr.length - 1).join('\n');
};
function f() {/*
  这是一个
  多行注释
*/}
multiline(f);
// 这是一个
// 多行注释
```





## 对象

对象就是一组“键值对”（key-value）的集合，是一种无序的复合数据集合。

使用 `{}` 定义对象

对象成员应为键值对，键名与键值之间用冒号分隔，成员之间用逗号隔开。

```js
var obj = {
    foo: 'Hello',
    bar: 'World'
};
// 对象 { foo: 'Hello', bar: 'World'}被赋值给变量`obj`，所以变量`obj`就指向一个对象。
```

对象的所有键名都是字符串（ES6 又引入了 Symbol 值也可以作为键名）。

如果键名是数值，会被自动转为字符串。

如果键名不符合标识名的条件（比如第一个字符为数字，或者含有空格或运算符），且也不是数字，则必须加上引号，否则会报错。

```js
// 报错
var obj = {
  1p: 'Hello World'
};

// 不报错
var obj = {
  '1p': 'Hello World',
  'h w': 'Hello World',
  'p+q': 'Hello World'
};
```

对象的每一个键名又称为“属性”（property），它的“键值”可以是任何数据类型。

如果一个属性的值为函数，通常把这个属性称为“方法”，它可以像函数那样调用。

```js
var obj = {
    p: function (x) {
        return 2 * x;
    }
};
obj.p(1) // 2
```

如果属性的值还是一个对象，就形成了链式引用。

```js
var o1 = {};
var o2 = { bar: 'hello' };

o1.foo = o2;
o1.foo.bar // "hello"
```



### 对象的引用

如果不同的变量名指向同一个对象，那么它们都是这个对象的引用，也就是说指向同一个内存地址。修改其中一个变量，会影响到其他所有变量。

```js
var o1 = {};
var o2 = o1;
// o1和o2指向同一个对象，因此为其中任何一个变量添加属性，另一个变量都可以读写该属性。
o1.a = 1;
o2.a // 1

o2.b = 2;
o1.b // 2
```

如果取消某一个变量对于原对象的引用，不会影响到另一个变量。

```js
var o1 = {};
var o2 = o1;

o1 = 1;
o2 // {}
```

但是，这种引用只局限于对象，如果两个变量指向同一个原始类型的值。那么，变量这时都是值的拷贝。

```js
var x = 1;
var y = x;

x = 2;
y // 1
```



### 读取属性

- 使用点运算符
- 使用方括号运算符

```js
var obj = {
  p: 'Hello World'
};
// 使用点运算符
obj.p // "Hello World"

// 使用方括号运算符
obj['p'] // "Hello World"

// 如果使用方括号运算符，键名必须放在引号里面，否则会被当作变量处理。
var foo = 'bar';
var obj = {
  foo: 1,
  bar: 2
};
// 使用点运算符，foo就是字符串
obj.foo  // 1
// 使用方括号运算符，但是不使用引号，那么foo就是一个变量
obj[foo]  // 2

// 方括号运算符内部还可以使用表达式。
obj['hello' + ' world']
obj[3 + 3] 

// 数值键名不能使用点运算符（因为会被当成小数点），只能使用方括号运算符。
var obj = {
  123: 'hello world'
};
obj.123 // 报错
obj[123] // "hello world"

// 访问不存在的属性不会报错，而是返回undefined
```



### 属性赋值

点运算符和方括号运算符，不仅可以用来读取值，还可以用来赋值。

```js
var obj = {};
obj.foo = 'Hello';
obj['bar'] = 'World';
```



### Object.keys

查看一个对象本身的所有属性，可以使用`Object.keys`方法。

```js
var obj = {
  key1: 1,
  key2: 2
};

Object.keys(obj);
// ['key1', 'key2']
```



### delete

`delete`命令用于删除对象的属性，删除成功后返回`true`。

```js
var obj = { p: 1 };
Object.keys(obj) // ["p"]

delete obj.p // true
obj.p // undefined
Object.keys(obj) // []

// 只有一种情况，delete命令会返回false，那就是该属性存在，且不得删除。
var obj = Object.defineProperty({}, 'p', {
  value: 123,
  configurable: false
});

obj.p // 123
delete obj.p // false
```



### in

`in`运算符用于检查对象是否包含某个属性（注意，检查的是键名，不是键值），如果包含就返回`true`，否则返回`false`。

```js
var obj = { p: 1 };
'p' in obj // true

// in运算符的一个问题是，它不能识别哪些属性是对象自身的，哪些属性是继承的。
var obj = {};
'toString' in obj // true
```



### for…in 

`for...in`循环用来遍历一个对象的全部属性。

- 它遍历的是对象所有可遍历（enumerable）的属性，会跳过不可遍历的属性。
- 它不仅遍历对象自身的属性，还遍历继承的属性。

```js
var obj = {a: 1, b: 2, c: 3};
for (var i in obj) {
    console.log(obj[i]);
}
// 1
// 2
// 3


var obj = {};
// toString 属性是存在的
obj.toString // toString() { [native code] }
// 对象obj继承了toString属性，该属性不会被for...in循环遍历到，因为它默认是“不可遍历”的。
for (var p in obj) {
  console.log(p);
} // 没有任何输出
```

一般情况下，都是只想遍历对象自身的属性，所以使用`for...in`的时候，应该结合使用`hasOwnProperty`方法，在循环内部判断一下，某个属性是否为对象自身的属性。

```js
var person = { name: '老张' };
for (var key in person) {
  if (person.hasOwnProperty(key)) {
    console.log(key);
  }
}
// name
```



### for...of





### with 语句

`with`的作用是操作同一个对象的多个属性时，提供一些书写的方便。

如果with区块内部有变量的赋值操作，必须是当前对象已经存在的属性，否则会创造一个当前作用域的全局变量。

`with`区块没有改变作用域，它的内部依然是当前作用域。这造成了`with`语句的一个很大的弊病，就是绑定对象不明确。

非常不利于代码的除错和模块化，编译器也无法对这段代码进行优化，只能留到运行时判断，这就拖慢了运行速度。因此，建议不要使用`with`语句，可以考虑用一个临时变量代替`with`。

```js
// 语法
with (对象) {
  语句;
}

var obj = {
  p1: 1,
  p2: 2,
};
with (obj) {
  p1 = 4;
  p2 = 5;
}
// 等同于
obj.p1 = 4;
obj.p2 = 5;


var obj = {};
with (obj) {
  p1 = 4;
  p2 = 5;
}
obj.p1 // undefined
p1 // 4
```



## 作用域

变量或者函数可以访问的范围。

- 全局作用域

  除了函数作用域和块级作用域（ES6），就是全局作用域。

  在浏览器中，全局作用域由 *window* 对象担当。

  在全局作用域下声明的变量，可以在任意合法位置访问到（全局变量）。

- 函数作用域

  当调用函数时，每个函数创建一个新的作用域（函数作用域）。

  函数内部定义的变量只能在函数内部访问它们，从函数外部是不可访问的（局部变量）。

  不通过关键词 var 创建的变量总是全局的，即使它们在函数中创建。

  在 JavaScript 中，所有函数都有权访问它们“上面”的作用域。

  ```js
  var a = 1
  function fn1() {
      // a在fn1()函数内也并未声明，会去上一层作用域寻找a变量
      function fn2() {
          a+=1 //a在fn2()函数内并未声明，会去上一层作用域寻找a变量
      }
      fn2()
      return a
  }
  var b = fn1()
  console.log(b) // 2
  ```

  

- 变量有效期

  JavaScript 变量的有效期始于其被创建时。

  局部变量会在函数完成时被删除。

  全局变量会在您关闭页面是被删除。



### 闭包

```js
// 假设您想使用计数器（变量）来计数，并且您希望此计数器（变量）可用于所有函数。
// 可以使用全局变量和函数来递增计数器
var counter = 0
function add(){
    counter+=1
}
add()
add()
add()
console.log(counter) // 3
// 上述方案执行三次add()后，计数器是3。
// 但是此方案存在一个严重的问题：页面上的任何代码都可以更改计数器（变量），而无需调用 add()。
// 对于 add() 函数，计数器（变量）应该是局部的，以防止其他代码更改它。
var counter = 0; // 全局变量
function add() {
  var counter = 0; // 局部变量
  counter += 1;
}
add();
add();
add();
console.log(counter) // 0
// 上述方案，执行三次add()后，计数器还是 0，因为我们显示全局计数器(全局变量)而不是本地计数器（局部变量）。
// 通过函数返回计数器，删除全局计数器（全局变量）并且访问本地计数器（局部变量）。
function add() {
  var counter = 0; 
  counter += 1;
  return counter;
}
add();
add();
add();
console.log(counter) // 1
// 上述方案，执行三次add()后，计数器还是 1，因为我们每次调用函数时都会重置本地计数器。
// 通过函数嵌套，访问父函数中的counter计数器变量，使其递增。
function add() {
  var counter = 0;
  function plus() {counter += 1;}
  plus();  
  return counter; 
}
// 此时决计数器变量是局部的，其他代码无法更改它，并且可以实现递增。
// 现在唯一的问题就是，怎样从外面访问 plus() 函数，并且只执行一次counter = 0。
// 此时我们就需要闭包了
var add = (function () {
    var counter = 0;
    return function () {
        return counter += 1;
    }
})()
console.log(add()) // 1
console.log(add()) // 2
console.log(add()) // 3
// 变量 add 的赋值是自调用函数的返回值。
// 这个自调用函数只运行一次。它设置计数器为零（0），并返回函数表达式。
// 这样 add 成为了函数。最“精彩的”部分是它能够访问父作用域中的计数器。
// 这被称为 JavaScript 闭包。它使函数拥有“私有”变量成为可能。
// 计数器被这个匿名函数的作用域保护，并且只能使用 add 函数来修改。
// 闭包指的是有权访问父作用域的函数，即使在父函数关闭之后。

// 闭包的两种情况
// 1、函数作为返回值被返回
function create() {
    const a = 100
    return function () {
        console.log(a) 
    }
}
const fn = create()
const a = 200
fn() // 100

// 2、函数作为参数被传递
function print(fn) {
    let a = 100
    fn()
}
let a = 100
function fn() {
    console.log(a)
}
print(fn) // 100

```

闭包是作用域应用的特殊情况（函数作为返回值被返回，函数作为参数被传递），把全局变量变成局部（即变量可重用但又不受外部污染）。

闭包中使用未定义的变量的值查找，**在函数定义的地方，向上级作用域查找**。

闭包原理：外层函数调用后，由于外层函数的作用域对象被内层函数对象引用着，无法释放形成了闭包！

闭包应用实例：做一个简单的cache工具

```js
// 隐藏数据，只提供API
function createCache() {
    const data = {}
    return  {
        get: function (key) {
            return data[key]
        },
        set: function (key, value) {
            data[key] = value
        }
    }
}
const cache = createCache()
cache.set('name','张三')
cache.get('name')
```



### this

this的指向，在函数被调用时决定。

- 对象方法 => this指向对象本身

- 普通函数 => this指向window

- 箭头函数 => this指向上级作用域this

- 使用call、apply、bind => this指向传入的对象

- 构造函数 => this指当前创建的实例

  

  ```js
  const student = {
      name: "张三",
      sayHi () {
          console.log(this)
      },
      wait () {
          setTimeout (function () {
              console.log(this)
          })
      }
      waitAgain () {
          setTimeout (()=>{
              console.log(this)
          })
      }
  }
  student.sayHi() // student 对象中的方法 => this指向对象本身
  student.wait() // window setTimeout中的函数是被setTimeout调用而不是被wait调用，setTimeout是全局函数，this指向window
  student.waitAgain() // student 箭头函数中的this指向上级作用域this
  
  function fn() {
      console.log(this)
  }
  fn() //window 普通函数调用 => this指向window
  fn.call({x:100}) //{x:100} 使用call、apply、bind => this指向传入的对象，即{x:100} 
  const fn1 = fn.bind({x:200})
  fn1() //{x:200} 使用call、apply、bind => this指向传入的对象，即{x:200}
  
  function Student(name,age){
      this.name = name
      this.age = age
  }
  Student.prototype.intro = function() { console.log(this) }
  var zhangsan = new Student('张三', 18)
  zhangsan.intro() 
  ```







## 面向对象

面向对象：程序中先用对象结构保存现实中一个事物的属性和功能，然后再按需使用事物的属性和功能，这种编程方法，就叫面向对象编程。

在 JavaScript 中，几乎“所有事物”都是对象。

- 布尔是对象（如果用 *new* 关键词定义）
- 数字是对象（如果用 *new* 关键词定义）
- 字符串是对象（如果用 *new* 关键词定义）
- 日期永远都是对象
- 算术永远都是对象
- 正则表达式永远都是对象
- 数组永远都是对象
- 函数永远都是对象
- 对象永远都是对象

所有 JavaScript 值，除了原始值，都是对象。

### 构造函数

所谓 **构造函数** ，就是专门用来生成实例对象的函数。它就是对象的模板，描述实例对象的基本结构。

一个构造函数，可以生成多个实例对象，这些实例对象都有相同的结构。

构造函数就是一个普通的函数，为了与普通函数区别，构造函数名字的第一个字母通常大写。

生成对象的时候，必须使用`new`命令。

```js
function Student(name,age) { // 用大写首字母对构造器函数命名是个好习惯。
    this.name = name
   	this.age = age
}
var a = new Student('张三', 18) 
var b = new Student('李四', 20) 
var c = new Student('王五', 30) 

// 使用`new`命令时，它后面的函数依次执行下面的步骤。
// 1.创建一个空对象，作为将要返回的对象实例
// 2.将这个空对象的原型，指向构造函数的prototype属性。
// 3.将这个空对象赋值给函数内部的this关键字。
// 4.开始执行构造函数内部的代码。

// JavaScript 提供用于原始对象的构造器
var x1 = new Object();    // 一个新的 Object 对象
var x2 = new String();    // 一个新的 String 对象
var x3 = new Number();    // 一个新的 Number 对象
var x4 = new Boolean();   // 一个新的 Boolean 对象
var x5 = new Array();     // 一个新的 Array 对象
var x6 = new RegExp();    // 一个新的 RegExp 对象
var x7 = new Function();  // 一个新的 Function 对象
var x8 = new Date();      // 一个新的 Date 对象

var x1 = {};            // 新对象
var x2 = "";            // 新的原始字符串 
var x3 = 0;             // 新的原始数值
var x4 = false;         // 新的原始逻辑值
var x5 = [];            // 新的数组对象
var x6 = /()/           // 新的正则表达式对象
var x7 = function(){};  // 新的函数对象
```



### 原型对象

在创建每个构造函数时，都会自动附赠一个空对象，名为原型对象(prototype)，通过构造函数.prototype属性，可获得这个构造函数对应的一个原型对象。

```js
function Student(name) {
    this.name = name
}
// Student类型的原型对象： Student.prototype
```

当用构造函数创建对象时，new会自动为新对象添加 " _ _proto_ _  "属性，指向当前构造函数的原型对象。

如：如果 var a = new Student('zhangsan', 18)   则  a._ _proto_ _= Student.prototype

```js
function Student(name) {
    this.name = name
}
Student.prototype.say = function() {
    return `我的名字是${this.name}`
}
var zhangsan = new Person('张三')
zhangsan.say()
```



### 继承

凡是用构造函数创建出的新对象（使用new），都是原型对象（父对象）的子对象。

原型对象（父对象）中的属性值或方法，所有子对象无需重复创建，就可直接使用，即为继承。

所有 JavaScript 对象都从原型对象继承属性和方法。

日期对象继承自 Date.prototype。数组对象继承自 Array.prototype。m对象继承自 Student.prototype。

Object.prototype 位于原型继承链的顶端：日期对象、数组对象和 Person 对象都继承自 Object.prototype（原型链）

```js
function Person(name) {
    this.name = name
}
function Student(id) {
    this.id = id
    this.intro = function() {
    	return `我的学号是${this.id}，我的名字是${this.name}`
	}
}
Student.prototype = new Person()  // 实现继承的关键语法
var zhangsan = new Student('33') 
zhangsan.intro() // 我的学号是33，我的名字是张三
console.log(zhangsan.prototype) // undefined => 实例没有原型对象（当爸爸的才有prototype）
console.log(zhangsan.__proto__ === Student.prototype) // 张三的原型对象是Student
console.log(Student.prototype.__proto__ === Person.prototype) // Student的原型对象是Person
console.log(Person.prototype.__proto__ === Object.prototype) // Person的原型对象是Object
console.log(Object.prototype.__proto__) // null => Object的原型对象是null
```



### 原型对象的应用

使用原型对象创建实例，添加公共方法

```js
function Student(name,age){
    this.name = name
    this.age = age
}
var m = new Student('张三', 18)

// 使用对象构造函数创建对象时，我们无法为对象构造器添加新属性，如：
Student.nationality = "English";
console.log(m.nationality) // undefined

// 使用原型对象为对象构造器添加新属性
Student.prototype.nationality = "English"
console.log(m.nationality) // English => m会继承Student的属性

Student.prototype.intro = function() { return `我的名字是${this.name},我的年龄是${this.age}` }
m.intro() // 我的名字是张三,我的年龄是18 => m会继承Student的方法
```

利用原型对象判断数据类型

```js
// toString
function typeOf(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase() 
}
typeOf(new Date) // 'date'
typeOf({}) // 'object' 
typeOf(null) // 'null'

// instanceof
function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}
const auto = new Car('Honda', 'Accord', 1998);

auto instanceof Car // true
auto instanceof Object // true
[] instanceof Array // true
[] instanceof Object // true
{} instanceof Object // true
```



### Object对象

```js
// Object.toString() Object.toLocalString()
(new Date).toString(); //"Mon Nov 06 2017 13:02:46 GMT+0800 (China Standard Time)"
(new Date).toLocaleString();  //"2017/11/6 下午1:03:12"
// 另外当被转化的值是个时间戳时，toLocaleString会把时间戳每三位添加一个逗号
(Date.parse(new Date())).toLocaleString() //"1,509,944,637,000"
(Date.parse(new Date())).toString() //"1509944643000"

// Object.hasOwnProperty(property) => 方法会返回一个布尔值，指示对象自身属性中是否具有指定的属性
let o = {a: 1 }
o.hasOwnProperty('a')   //true
o.hasOwnProperty('b')   //false   对象自身没有属性b
o.hasOwnProperty('toString');  //false  不能检测对象原型链上的属性

// Object.assign(target, source, source1)  
// 用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。拷贝的属性是有限制的，只拷贝源对象的自身属性（不拷贝继承属性），也不拷贝不可枚举的属性（enumerable: false）
const target = { a: 1, b: 1 };
const source1 = { b: 2, c: 2 };
const source2 = { c: 3 };
Object.assign(target, source1, source2); target // {a:1, b:2, c:3}

// Object.values() 任何 JavaScript 对象都可以被转换为数组
const person = {
  name: "Bill",
  age: 19,
  city: "Seattle"
};
const myArray = Object.values(person); // ['Bill', 'Gates', 'EN']

// Object.is() => 它用来比较两个值是否严格相等，与严格比较运算符（===）的行为基本一致
Object.is('foo', 'foo') // true
Object.is({}, {}) // false
// 不同于 === 之处
+0 === -0 //true
NaN === NaN   //false
Object.is(+0, -0)  //false
Object.is(NaN, NaN) //true

// Object.entries(object) => 分割对象
console.log(Object.entries({ foo: 'bar', baz: 42 })); // [ ['foo', 'bar'], ['baz', 42] ]
Object.entries('abc')   // [['0', 'a'], ['1', 'b'], ['2', 'c']]
Object.entries(100)   // []

// Object.isPrototypeOf(object) => 测试一个对象是否存在于另一个对象的原型链上
function Foo() {}
function Bar() {}
function Baz() {}
Bar.prototype = Object.create(Foo.prototype);
Baz.prototype = Object.create(Bar.prototype);
var baz = new Baz();
console.log(Baz.prototype.isPrototypeOf(baz)); // true
console.log(Bar.prototype.isPrototypeOf(baz)); // true
console.log(Foo.prototype.isPrototypeOf(baz)); // true
console.log(Object.prototype.isPrototypeOf(baz)); // true

// Object.valueOf() 
// valueOf()方法和toString()方法非常类似，但是，当需要返回对象的原始值而非字符串的时候才调用它，尤其是转换为数字的时候。
// 如果在需要使用原始值的上下文中使用了对象，JavaScript就会自动调用valueOf()方法。
const o = { a: 1, valueOf: function(){  return 123123 } }
Number(o) //123123

const o2 = {
    x: 1,
    valueOf: function(){
        return this.x++
    }
}
if(o2 == 1 && o2 == 2 && o2 == 3){
    console.log('down')
    console.log(o2.x)
}else{
    console.log('faild')
}

```

ECMAScript 5 (2009)  向 JavaScript 添加了许多新的对象方法。

```js
//Object.defineProperty(object, property, descriptor) 添加或更改对象属性 
const person = {
  firstName: "Bill",
  lastName : "Gates",
  language : "EN"
};
Object.defineProperty(person, "language", {value : "CH"}); // 修改属性
Object.defineProperty(person, "language", {writable:false}); // 设置 language 为只读 
Object.defineProperty(person, "language", {enumerable:false}); // 使 language 不可枚举

//Object.getOwnPropertyNames(object) 以数组返回所有属性,包含遍历包含不可枚举属性
const person = {
  firstName: "Bill",
  lastName : "Gates",
  language : "EN"
};
Object.getOwnPropertyNames(person); // ['firstName', 'lastName', 'language']

// 以数组返回可枚举属性 Object.keys(object)
const person = {
  firstName: "Bill",
  lastName : "Gates",
  language : "EN"
};
Object.defineProperty(person, "language", {enumerable:false}); // 使 language属性不可枚举
Object.keys(person);   // 返回可枚举属性的数组 ['firstName', 'lastName']

//Object.create() 以现有对象为原型创建对象
//Object.defineProperties(object, descriptors) 添加或更改对象属性 
//Object.getOwnPropertyDescriptor(object, property) 访问属性 
//Object.getPrototypeOf(object) 访问原型 
//Object.preventExtensions(object) 防止向对象添加属性 
//Object.isExtensible(object) 如果属性可以添加到对象，则返回 true
//Object.seal(object) 防止更改对象属性（不是值）
//Object.isSealed(object) 如果对象被密封，则返回 true
//Object.freeze(object) 防止对对象进行任何更改
//Object.isFrozen(object) 如果对象被冻结，则返回 true

```



### Array对象

#### 构造函数创建数组

`Array`是 JavaScript 的原生对象，同时也是一个构造函数，可以用它生成新的数组。

```js
var arr = new Array(2); // 等同于 var arr = Array(2);
arr.length // 2
arr // [ empty x 2 ]

// Array构造函数有一个很大的缺陷，就是不同的参数，会导致它的行为不一致。
// 无参数时，返回一个空数组
new Array() // []

// 单个正整数参数，表示返回的新数组的长度
new Array(1) // [ empty ]
new Array(2) // [ empty x 2 ]

// 非正整数的数值作为参数，会报错
new Array(3.2) // RangeError: Invalid array length
new Array(-3) // RangeError: Invalid array length

// 单个非数值（比如字符串、布尔值、对象等）作为参数，
// 则该参数是返回的新数组的成员
new Array('abc') // ['abc']
new Array([1]) // [Array[1]]

// 多参数时，所有参数都是返回的新数组的成员
new Array(1, 2) // [1, 2]
new Array('a', 'b', 'c') // ['a', 'b', 'c']
```

#### 数组字面量创建数组

`Array`作为构造函数，行为很不一致。因此，不建议使用它生成新数组，直接使用数组字面量是更好的做法。

```js
var arr = new Array(1, 2); // bad
var arr = [1, 2]; // good
```



#### Array.isArray()

`Array.isArray`方法返回一个布尔值，表示参数是否为数组。它可以弥补`typeof`运算符的不足。

```js
var arr = [1, 2, 3];
typeof arr // "object"
Array.isArray(arr) // true
```



#### 实例方法

##### valueOf() 

`valueOf`方法是一个所有对象都拥有的方法，表示对该对象求值。不同对象的`valueOf`方法不尽一致，数组的`valueOf`方法返回数组本身。

```js
var arr = [1, 2, 3];
arr.valueOf() // [1, 2, 3]
```



##### toString()

`toString`方法也是对象的通用方法，数组的`toString`方法返回数组的字符串形式。

原数组不变。

```js
var arr = [1, 2, 3];
arr.toString() // "1,2,3"

var arr = [1, 2, 3, [4, 5, 6]];
arr.toString() // "1,2,3,4,5,6"
```



##### push()

`push`方法用于在数组的末端添加一个或多个元素，并返回添加新元素后的数组长度。

注意，该方法会改变原数组。

```js
var arr = [];
arr.push(1) // 1
arr.push('a') // 2
arr.push(true, {}) // 4
arr // [1, 'a', true, {}]
```



##### pop()

`pop`方法用于删除数组的最后一个元素，并返回该元素。

注意，该方法会改变原数组。

对空数组使用`pop`方法，不会报错，而是返回`undefined`。

```js
var arr = ['a', 'b', 'c'];

arr.pop() // 'c'
arr // ['a', 'b']

[].pop() // undefined
```



##### shift()

`shift`方法用于删除数组的第一个元素，并返回该元素。

注意，该方法会改变原数组。

```js
var a = ['a', 'b', 'c'];
a.shift() // 'a'
a // ['b', 'c']

// shift方法可以遍历并清空一个数组
var list = [1, 2, 3, 4, 5, 6];
var item;
while (item = list.shift()) {
  console.log(item);
}
list // []
```



##### unshift()

`unshift`方法用于在数组的第一个位置添加元素，并返回添加新元素后的数组长度。

注意，该方法会改变原数组。

```js
var a = ['a', 'b', 'c'];
a.unshift('x'); // 4
a // ['x', 'a', 'b', 'c']

// unshift方法可以接受多个参数，这些参数都会添加到目标数组头部
var arr = [ 'c', 'd' ];
arr.unshift('a', 'b') // 4
arr // [ 'a', 'b', 'c', 'd' ]
```



##### join()

`join`方法以指定参数作为分隔符，将所有数组成员连接为一个字符串返回。如果不提供参数，默认用逗号分隔。

原数组不变。

```js
var a = [1, 2, 3, 4];
a.join(' ') // '1 2 3 4'
a.join(' | ') // "1 | 2 | 3 | 4"
a.join() // "1,2,3,4"

// 如果数组成员是undefined或null或空位，会被转成空字符串。
[undefined, null].join('#')
// '#'
['a',, 'b'].join('-')
// 'a--b'

// 通过call方法，这个方法也可以用于字符串或类似数组的对象。
Array.prototype.join.call('hello', '-')
// "h-e-l-l-o"

var obj = { 0: 'a', 1: 'b', length: 2 };
Array.prototype.join.call(obj, '-')
// 'a-b'
```



##### concat()

`concat`方法用于多个数组的合并。它将新数组的成员，添加到原数组成员的后部，然后返回一个新数组，原数组不变。

```js
['hello'].concat(['world'])
// ["hello", "world"]

['hello'].concat(['world'], ['!'])
// ["hello", "world", "!"]

[].concat({a: 1}, {b: 2})
// [{ a: 1 }, { b: 2 }]

[2].concat({a: 1})
// [2, {a: 1}]

[1, 2, 3].concat(4, 5, 6)
// [1, 2, 3, 4, 5, 6]
```



##### reverse()

`reverse`方法用于颠倒排列数组元素，返回改变后的数组。

注意，该方法将改变原数组。

```js
var a = ['a', 'b', 'c'];

a.reverse() // ["c", "b", "a"]
a // ["c", "b", "a"]
```



##### slice()

`slice`方法用于提取目标数组的一部分，返回一个新数组。

原数组不变。

```js
/**
  * arr.slice(start, end);
  * start 起始位置
  * end 终止位置（但该位置的元素本身不包括在内）
*/

// 如果省略第二个参数，则一直返回到原数组的最后一个成员。
var a = ['a', 'b', 'c'];
a.slice(0) // ["a", "b", "c"]
a.slice(1) // ["b", "c"]
a.slice(1, 2) // ["b"]
a.slice(2, 6) // ["c"]
a.slice() // ["a", "b", "c"]

// 如果slice方法的参数是负数，则表示倒数计算的位置。
var a = ['a', 'b', 'c'];
a.slice(-2) // ["b", "c"]
a.slice(-2, -1) // ["b"]

// 如果第一个参数大于等于数组长度，或者第二个参数小于第一个参数，则返回空数组。
var a = ['a', 'b', 'c'];
a.slice(4) // []
a.slice(2, 1) // []
```

`slice`方法的一个重要应用，是将类似数组的对象转为真正的数组。

Array.prototype.slice.call 将具有length属性的对象(key值为数字)转成数组。

```js
Array.prototype.slice.call({ 0: 'a', 1: 'b', length: 2 })
// ['a', 'b']

Array.prototype.slice.call(document.querySelectorAll("div"));
Array.prototype.slice.call(arguments);
```



##### splice()

`splice`方法用于删除原数组的一部分成员，并可以在删除的位置添加新的数组成员，返回值是被删除的元素。

注意，该方法会改变原数组。

```js
/**
  * arr.splice(start, count, addElement1, addElement2, ...)
  * start 删除的起始位置（从0开始）
  * count 被删除的元素个数
  * addElement1 要被插入数组的新元素
  * addElement2 要被插入数组的新元素
*/
var a = ['a', 'b', 'c', 'd', 'e', 'f'];
a.splice(4, 2) // ["e", "f"]
a // ["a", "b", "c", "d"]

var a = ['a', 'b', 'c', 'd', 'e', 'f'];
a.splice(4, 2, 1, 2) // ["e", "f"]
a // ["a", "b", "c", "d", 1, 2]

// 起始位置如果是负数，就表示从倒数位置开始删除。
var a = ['a', 'b', 'c', 'd', 'e', 'f'];
a.splice(-4, 2) // ["c", "d"]

// 如果只是单纯地插入元素，splice方法的第二个参数可以设为0。
var a = [1, 1, 1];
a.splice(1, 0, 2) // []
a // [1, 2, 1, 1]

// 如果只提供第一个参数，等同于将原数组在指定位置拆分成两个数组。
var a = [1, 2, 3, 4];
a.splice(2) // [3, 4]
a // [1, 2]

```



##### sort()

`sort`方法对数组成员进行排序，默认是按照字典顺序排序。排序后，原数组将被改变。

`sort`方法不是按照大小排序，而是按照字典顺序。也就是说，数值会被先转成字符串，再按照字典顺序进行比较，所以`101`排在`11`的前面。

```js
['d', 'c', 'b', 'a'].sort()
// ['a', 'b', 'c', 'd']

[4, 3, 2, 1].sort()
// [1, 2, 3, 4]

[11, 101].sort()
// [101, 11]

[10111, 1101, 111].sort() 
// [10111, 1101, 111]
```

想让`sort`方法按照自定义方式排序，可以传入一个函数作为参数。

`sort`的参数函数本身接受两个参数，表示进行比较的两个数组成员。如果该函数的返回值大于`0`，表示第一个成员排在第二个成员后面；其他情况下，都是第一个元素排在第二个元素前面。

```js
[10111, 1101, 111].sort(function (a, b) {
  return a - b;
})
// [111, 1101, 10111]

[
  { name: "张三", age: 30 },
  { name: "李四", age: 24 },
  { name: "王五", age: 28  }
].sort(function (o1, o2) {
  return o1.age - o2.age;
})
// [
//   { name: "李四", age: 24 },
//   { name: "王五", age: 28  },
//   { name: "张三", age: 30 }
// ]
```



##### map()

`map`方法将数组的所有成员依次传入参数函数，然后把每一次的执行结果组成一个新数组返回。

原数组不变。

```js
// map方法接受一个函数作为参数。该函数调用时，map方法向它传入三个参数：当前成员、当前位置和数组本身。
var numbers = [1, 2, 3];
var _numbers = numbers.map(function(elem, index, arr) {
  return elem * index;
});
numbers // // [1, 2, 3]
_numbers // [0,2,6]

// map方法还可以接受第二个参数，用来绑定回调函数内部的this变量
var arr = ['a', 'b', 'c'];
[1, 2].map(function (e) {
  return this[e];
}, arr)
// ['b', 'c']

// map方法不会跳过undefined和null，但是会跳过空位。
var f = function (n) { return 'a' };
[1, undefined, 2].map(f) // ["a", "a", "a"]
[1, null, 2].map(f) // ["a", "a", "a"]
[1, , 2].map(f) // ["a", , "a"]

// 把Array的所有数字转为字符串
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var intArr = arr.map(String); 
console.log(intArr) // ['1', '2', '3', '4', '5', '6', '7', '8', '9']

// 把Array的所有字符串转为数字
var arr = ["1", "2", "3"];
var strArr =arr.map(element=>parseInt(element,10));
console.log(strArr) // [1, 2, 3]
```



##### forEach()

`forEach`方法与`map`方法很相似，也是对数组的所有成员依次执行参数函数。但是，`forEach`方法不返回值，只用来操作数据。这就是说，如果数组遍历的目的是为了得到返回值，那么使用`map`方法，否则使用`forEach`方法。

`forEach`方法无法中断执行，总是会将所有成员遍历完。如果希望符合某种条件时，就中断遍历，要使用`for`循环。

```js
// `forEach`的用法与`map`方法一致，参数是一个函数，该函数同样接受三个参数：当前值、当前位置、整个数组。
function log(element, index, array) {
  console.log('[' + index + '] = ' + element);
}
[2, 5, 9].forEach(log);
// [0] = 2
// [1] = 5
// [2] = 9

// forEach方法也可以接受第二个参数，绑定参数函数的this变量。
var out = [];
[1, 2, 3].forEach(function(elem) {
  this.push(elem * elem);
}, out);
out // [1, 4, 9]

// forEach方法也会跳过数组的空位。
var log = function (n) {
  console.log(n + 1);
};
[1, undefined, 2].forEach(log)
// 2
// NaN
// 3
[1, null, 2].forEach(log)
// 2
// 1
// 3
[1, , 2].forEach(log)
// 2
// 3

// continue 实现
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
arr.forEach(function(item,index,arr){
    if(item===2) return
    console.log(item) // 1 3 4 5 6 7 8 9
}); 
```



##### filter()

`filter`方法用于过滤数组成员，满足条件的成员组成一个新数组返回。

它的参数是一个函数，所有数组成员依次执行该函数，返回结果为`true`的成员组成一个新数组返回。该方法不会改变原数组。

```js
// filter方法的参数函数可以接受三个参数：当前成员，当前位置和整个数组。
let arr = [1, 2, 3, 4, 5];
let filterArr = arr.filter(function (elem, index, arr) {
  return index % 2 === 0;
});
console.log(arr) // [1, 2, 3, 4, 5]
console.log(filterArr) // [1, 3, 5]

// 简写 
let filterArr = arr.filter((item,index) => index % 2 === 0);
console.log(filterArr); // [1, 3, 5]

// filter方法返回数组arr里面所有布尔值为true的成员。
let arr = [0, 1, 'a', false];
let filterArr = arr.filter(Boolean)
console.log(filterArr) // [1, "a"]

// filter方法还可以接受第二个参数，用来绑定参数函数内部的this变量。
var obj = { MAX: 3 };
var myFilter = function (item) {
  if (item > this.MAX) return true;
};

var arr = [2, 8, 3, 4, 1, 3, 2, 9];
arr.filter(myFilter, obj) // [8, 4, 9]

//利用filter，可以巧妙地去除Array的重复元素：
var arr = ['apple', 'strawberry', 'banana', 'pear', 'apple', 'orange', 'orange', 'strawberry'];
var newArr = arr.filter(function (element, index, self) {
    return self.indexOf(element) === index;
});
console.log(newArr); // ['apple', 'strawberry', 'banana', 'pear', 'orange']

//把一个Array中的空字符串删掉
var arr = ['A', '', 'B', null, undefined, 'C', '  '];
var newArr = arr.filter(function (s) {
    return s && s.trim(); // 注意：IE9以下的版本没有trim()方法
}); 
conssole.log(newArr); // ['A', 'B', 'C']
```



##### some()

`some`方法是只要一个成员的返回值是`true`，则整个`some`方法的返回值就是`true`，否则返回`false`。

对于空数组，`some`方法返回`false`，回调函数不会执行

```js
// some 接受一个函数作为参数，所有数组成员依次执行该函数。该函数接受三个参数：当前成员、当前位置和整个数组，然后返回一个布尔值。
var arr = [1, 2, 3, 4, 5];
var bol = arr.some(function (elem, index, arr) {
  return elem >= 3;
});
console.log(bol) // true
```



##### every()

`every`方法是所有成员的返回值都是`true`，整个`every`方法才返回`true`，否则返回`false`。

对于空数组，`every`方法返回`true`， 回调函数不会执行

```js
var arr = [1, 2, 3, 4, 5];
var bol = arr.every(function (elem, index, arr) {
  return elem >= 3;
});
console.log(bol) // false
```



##### reduce()

`reduce`方法依次处理数组的每个成员，最终累计为一个值。

```js
var result = [1, 2, 3, 4, 5].reduce(function (a, b) {
    console.log(a, b);
    return a + b;
})
console.log(result)
// 1 2
// 3 3
// 6 4
// 10 5
// 15

//上面代码中，reduce方法求出数组所有成员的和。第一次执行，a是数组的第一个成员1，b是数组的第二个成员2。第二次执行，a为上一轮的返回值3，b为第三个成员3。第三次执行，a为上一轮的返回值6，b为第四个成员4。第四次执行，a为上一轮返回值10，b为第五个成员5。至此所有成员遍历完成，整个方法的返回值就是最后一轮的返回值15。


/**
  * reduce方法第一个参数都是一个函数。该函数接受以下四个参数。
  * 1.累积变量，默认为数组的第一个成员
  * 2.当前变量，默认为数组的第二个成员
  * 3.当前位置（从0开始）
  * 4.原数组
*/
// 如果要对累积变量指定初值，可以把它放在reduce方法的第一个参数。
// 注意，这时b是从数组的第一个成员开始遍历。
[1, 2, 3, 4, 5].reduce(function (a, b) {
  return a + b;
}, 10);// 25
//上面的第二个参数相当于设定了默认值，处理空数组时尤其有用。
function add(prev, cur) {
  return prev + cur;
}
[].reduce(add)
// TypeError: Reduce of empty array with no initial value
[].reduce(add, 1)
// 1

// 找出字符长度最长的数组成员。
function findLongest(entries) {
    return entries.reduce(function (longest, entry) {
        return entry.length > longest.length ? entry : longest;
    }, '');
}
findLongest(['aaa', 'bb', 'c']) // "aaa"
```



##### findIndex()

`findIndex()`查找符合条件的第一个元素，会返回这个元素的索引，如果没有找到，返回`-1`

```js
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var index = arr.findIndex(currentValue=>currentValue === 9) 
console.log(index) // 8
```



##### indexOf()

`indexOf`方法返回给定元素在数组中第一次出现的位置，如果没有出现则返回`-1`。

```js
var a = ['a', 'b', 'c'];
a.indexOf('b') // 1
a.indexOf('y') // -1

// indexOf方法还可以接受第二个参数，表示搜索的开始位置。
['a', 'b', 'c'].indexOf('a', 1) // -1

// 这个方法不能用来搜索`NaN`的位置，即无法确定数组成员是否包含`NaN`。
[NaN].indexOf(NaN) // -1
```



##### lastIndexOf

`lastIndexOf`方法返回给定元素在数组中最后一次出现的位置，如果没有出现则返回`-1`。

这个方法不能用来搜索`NaN`的位置，即无法确定数组成员是否包含`NaN`。

```js
var a = [2, 5, 9, 2];
a.lastIndexOf(2) // 3
a.lastIndexOf(7) // -1

// 这个方法不能用来搜索`NaN`的位置，即无法确定数组成员是否包含`NaN`。
[NaN].lastIndexOf(NaN) // -1
```



##### 链式使用

些数组方法之中，有不少返回的还是数组，所以可以链式使用。

```js
var users = [
  {name: 'tom', email: 'tom@example.com'},
  {name: 'peter', email: 'peter@example.com'}
];

users
.map(function (user) {
  return user.email;
})
.filter(function (email) {
  return /^t/.test(email);
})
.forEach(console.log);
// "tom@example.com"
```



## ES6

### let/const

- let 表示申明变量。const表示申明常量。
- const在申明是必须被赋值，且不能修改。
- 使用let、const 关键字声明的变量，只能在块级作用域下使用，不能被外部访问，不存在变量提升。



### 块级作用域

{ }、for、while、do、if\.....所有**大括号**内的都是块级作用域；**循环条件中的括号。**可以防止污染全局。



### 模块字符串**``**

可以使用反引号 `` 来进行字符拼接。${}



### 箭头函数

- 不需要 function 关键字来创建函数
- 省略 return 关键字
- this始终指向函数申明时所在作用域下的this值



### 函数默认参数

ES6允许给参数设置默认值，如果没有传递实参，自动调用形参的默认值



### 解构赋值

从数组和对象中提取值，对变量进行赋值

```js
// 数组解构
let [a, b, c] = [1, 2, 3]
// 对象解构
let obj = {
    id: 1,
    name: '小明',
    age: 18,
}
const { id, name, age } = obj
```



### 展开运算符 **...**

展开运算符,将一个数组转为用逗号分隔的参数序列

```js
// 合并数组
let a = [1,2,3];
let b = [4,5,6];
let c = [...a,...b]; // [1,2,3,4,5,6]

// 替代apply

// 解构赋值
let a = [1,2,3,4,5,6]
let [c,...d] = a
console.log(c); // 1
console.log(d); // [2,3,4,5,6]

// 数组扁平化
[].concat(...[1, 2, 3, [4, 5]]);  // [1, 2, 3, 4, 5]

```





### 模块化

导入 import

导出 export  (注意有无default)

**.如果模块中使用 export default {}**
只能通过  `import 对象名称 from '模块路径'`
不能通过  `import {对象名称} from '模块路径'`

环境：babel编译es6语法，模块化可使用webpack和rollup工具打包



### class

ES6 中支持 class 语法，不过，ES6的class不是新的对象继承模型，它只是原型链的语法糖表现形式。

```js
// 回顾： js-构造函数
function mathFn(a,b) {
    this.x = a
   	this.y = b
}

mathFn.prototype.add = function() {
    return this.x + this.y
}

var m = new sumFn(1,2) //s=> { x:1,y:2 }
s.add() // 3

// class => 原型链的语法糖表现形式
class sumFn {
    constructor(x,y) {
        this.x = x
        this.y = y
        
    }
    add() {
        return this.x + this.y
    }
   
}
const m = new mathHandle(1,2) // m=> { x:1,y:2 }
console.log(typeof mathHandle) // function
m.add() // 3



// 回顾： js-继承
function animal() {
    this.eat = function (){
        console.log('animal eat')
    }
}

function dog() {
    this.bark = function() {
        console.log('dog eat')
    }
}
// 实现继承的关键语法
dog.prototype = new animal() 
dog.animal() // 'animal eat'
dog.dog() // 'dog eat'



// class-继承
class Animal {
    constructor(name) {
        this.name = name
    }
    eat() {
        console.log(`this.${this.name} eat`)
    }
}
// 实现继承的关键-extends 需配合super() 使用
class Dog extends Animal {
    constructor(name) {
        super(name)
        this.name = name
    }
    say() {
        console.log(`${this.name} say`)
    }
}
```



### promise

promise用于封装异步操作，并获取异步任务成功和失败的结果值

```js

// promise实例可接收一个异步操作的函数，函数有两个形参（resolve和reject：函数类型数据）

// 异步操作成功则调用resolve，改变promise状态为成功（pending -> resolved），执行.then;失败则调用reject，改变promise状态为失败（pending -> rejected），执行.catch

/**
  * 封装一个函数 readFile 读取文件内容
  * @param *String* path 文件路径
  * return promise对象
 */
function readFiles(path) {
 return new Promise((resolve, reject) => 
   fs.readFile(path, (err, dat) => 
   if (err) reject(err)
   resolve(data)
  })
 })
}

readFiles('./resource/content.txt').then(res => {
 console.log(res.toString())
}).catch(err => {
 console.warn('读取错误', err);
})
```

**promise 的状态**

- promise 的状态：指的是promise实例对象中的一个属性  [*PromiseState*] , 有三个值分别是 pending (未决定的)、resolved（成功）、rejected（失败）

- promise 的状态的改变，有且只有两种，且一个promise对象只能改变一次，无论成功还是失败，都会有一个结果数据，状态结果不可逆
  1. pending -> resolved
  2. pending -> rejected

解决回调地狱问题

```js
// 图片加载事件
function loadImage(src, callback, fail) {
    var img = document.createElement('img')
        img.src = src
        img.onload = function() {
            callback(img)
        }
        img.onerror = function() {
            fail()
        }
}
var src = 'https://cdn.9kd.com/kdnet/c02a32c243594a4f9ad3d8d33d17421d.jpg'

loadImage(src,function(img){
    console.log(img)
}, function(){
    console.log('err')
})


// 使用promise
function loadImage(src) {
    const promise = new promise(function(resolve, reject) {
        var img = document.createElement('img')
        img.src = src
        img.onload = function() {
            resolve(img)
        }
        img.onerror = function() {
            reject()
        }
        
    })
    return promise
}

var src = 'https://cdn.9kd.com/kdnet/c02a32c243594a4f9ad3d8d33d17421d.jpg'
var result = loadImage(src)
result.then(res=>{
    console.log(res.width)
}).catch(()=>{
    console.log('err')
})
result.then(res=>{
    console.log(res.height)
}).catch(()=>{
    console.log('err')
})

// promise all
let images = ['1.jpg','2.jpg'];
 let promiseAll = [], imgs = [], total = images.length;
 for (let i = 0; i < total; i++) {
    promiseAll[i] = new Promise((resolve, reject) => {
      imgs[i] = new Image();
      imgs[i].src = images[i];
      imgs[i].onload = function() {
        resolve(imgs[i]);
      };
    })
  }
 Promise.all(promiseAll).then(img => {
    // 全部图片加载完成
 })
```



### for of

- for of遍历的是键值对中的值
- for in遍历的是键值对中的键



### Set集合

存储任何类型的唯一值，即集合中所保存的元素是不重复的。类数组结构。

```js
arr = [1,2,3,1]
let arrNew = new Set(arr)
arrNew = [1,2,3]
```



### Symbol

新的基本类型





## 异步

单线程：同一时间只做一件事，两段js不能同时执行（js代码要一行一行执行），原因是为了避免DOM渲染的冲突。



异步：等待主线程同步任务执行完后，执行异步队列中的任务，异步任务又分为**宏任务**和**微任务**，这是解决单线程问题的一种方案，异步的实现方式 - event loop（事件轮询）。



**宏任务** ：setTimeout,setInterval,UI交互事件,I/O等

**微任务**：Promise.then(),Object.observe等



event loop

- 事件轮询，js实现异步的具体解决方案
- 同步任务，直接执行
- 异步任务 放在 异步队列 中
- 待同步函数执行完毕，轮询执行 异步队列 的函数



事件轮询中同步和异步的执行顺序 同步--> 微任务 --> 宏任务

```js
new Promise((resolve,reject) => {
    console.log("resolve before");
    resolve("success");
    setTimeout(() => {
        console.log("setTimeout");
    })
}).then(res => console.log(res))
console.log("同步");

// resolve before
// 同步
// success
// setTimeout
```



```js
new Promise((resolve,reject) => {
    setTimeout(() => {
        console.log("setTimeout");
        resolve("success");
    })
}).then(res => console.log(res))
console.log("同步");

// 同步
// setTimeout
// success
```



### 回调函数

回调函数是异步操作最基本的方法。

```js
// 下面是两个函数f1和f2，编程的意图是f2必须等到f1执行完成，才能执行。
function f1() {
  // ...
}
function f2() {
  // ...
}
f1();
f2();

// 如果f1是异步操作，f2会立即执行，不会等到f1结束再执行。
// 这时，可以考虑改写f1，把f2写成f1的回调函数。
function f1(callback) {
  // ...
  callback();
}
function f2() {
  // ...
}
f1(f2);

// 回调函数的优点是简单、容易理解和实现，
// 缺点是不利于代码的阅读和维护，各个部分之间高度耦合，使得程序结构混乱、流程难以追踪（尤其是多个回调函数嵌套的情况），而且每个任务只能指定一个回调函数。
```

promise 是对异步回调的封装，.then方式本质拆分callback，把原本callback嵌套的形式变成串行，使代码更好的阅读和理解

async/await是比 .then 更好的写法，是更直接的同步写法，没有回调函数了。（使用await，函数必须用async标识，await后面必须跟一个Promise实例）



### 事件监听

实现异步操作另一种思路是采用事件驱动模式。异步任务的执行不取决于代码的顺序，而取决于某个事件是否发生。

```js
// 还是以f1和f2为例。首先，为f1绑定一个事件（这里采用的 jQuery 的写法）。
f1.on('done', f2);
// 上面这行代码的意思是，当f1发生done事件，就执行f2。然后，对f1进行改写：
function f1() {
  setTimeout(function () {
    // ...
    f1.trigger('done');
  }, 1000);
}
// 上面代码中，f1.trigger('done')表示，执行完成后，立即触发done事件，从而开始执行f2。

// 这种方法的优点是比较容易理解，可以绑定多个事件，每个事件可以指定多个回调函数，而且可以“去耦合”（decoupling），有利于实现模块化。缺点是整个程序都要变成事件驱动型，运行流程会变得很不清晰。阅读代码的时候，很难看出主流程。
```



### 发布/订阅
