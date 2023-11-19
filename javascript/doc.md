# JavaScript

## 变量和常量

用来存储程序中的数据，

### 变量（var）

- 变量可以被多次赋值，且可以是不同类型的，

- 变量未赋值，则保存的值为undefined
- 一次可以声明多个变量

```js
var a = 0;
var b =1;
var a = b;
a = 2;
console.log(a);// 2
```

### 常量（const）

- 用于保存不可变化的值，声明常量必须赋值，不能为空，不能重新赋值

```js
const d = 5;
console.log(c); // 5

const e = {
	age: 6;
}
e.age = 8;
console.log(e);  // {age:8}
```

### let (ES6)

let 是es6的内容，在讲到es6再说



变量和常量名称可以由字母，数字，下划线 \_，美元符号 \$ 组成，区分大小写，

命名要遵循以下规则

> 声明变量的名称开头不能是数字 如var 1a=3;
>
> 特殊符号不能作为变量名；如var b\#4=5;
>
> JavaScript中的关键字不能作为变量名；如 this
>
> 变量名称可以是汉字，但实际不能用汉字作为变量名称，因为解析可能会出现乱码；

常用的命名方式

驼峰命名法（推荐使用）：userName，userPwd

下划线命名法：user\_name user\_password

```js
var a_12 = 'hello world';
var r = 1024;
var $Q3 = a_12;
$Q3 = 'ハローワールド';
$Q3 = '你好' + r + '世界'; 
var theEndValue = $Q3; 
alert(theEndValue);
console.log(theEndValue);
```



思考：var let const的区别？

var: 

1.变量能被提升 
2.同一变量可重复声明 
3.在函数中使用var声明时，该变量是局部的。如果不在函数内，则是全局的 
4.声明后的值可改变 
5.不存在级块作用域

let: 

1.变量不能被提升 
2.在同一级块作用域内不能重复声明同一变量，不同级块作用域可重复声明 
3.声明后的值可改变

const:

 1.变量不能被提升 
 2.在同一级块作用域内不能重复声明同一变量，不同级块作用域可重复声明 
 3.只能声明只读的变量，声明后的值不可改变 
 4.使用前需要初始化 
 5.并不是变量的值不能改动，而是变量指向的内存地址所保存的数据不得改动 
 6.对于对象{object}和数组[array]这种引用类型，内存地址不能修改，但可以修改里面的值



**三者区别**：

1. var定义的变量，`没有块的概念，可以跨块访问`, 不能跨函数访问。
   let定义的变量，只能在块作用域里访问，不能跨块访问，也不能跨函数访问。
   const用来定义常量，使用时必须初始化(即必须赋值)，只能在块作用域里访问，且不能修改。
2. var可以`先使用，后声明`，因为存在变量提升；let必须先声明后使用。
3. var是允许在相同作用域内`重复声明同一个变量`的，而let与const不允许这一现象。
4. 在全局上下文中，基于let声明的全局变量和全局对象GO（window）没有任何关系 ;
   var声明的变量会和GO有映射关系；
5. `会产生暂时性死区`：

> 暂时性死区是浏览器的bug：检测一个未被声明的变量类型时，不会报错，会返回undefined
> 如：console.log(typeof a) //undefined
> 而：console.log(typeof a)//未声明之前不能使用
> let a

1. let /const/function会把当前所在的大括号(除函数之外)作为一个全新的块级上下文，应用这个机制，在开发项目的时候，遇到循环事件绑定等类似的需求，无需再自己构建闭包来存储，只要基于let的块作用特征即可解决



## 数据类型

### 基本类型

基本类型数据，指的是拥有原始值的数据（原始值指的是没有属性或方法的值，原始值是一成不变的。）

基本类型数据，在内存中占据固定大小，保存在栈内存中

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

#### Number（数值）

```js
Number 数字类型   正、负数，整数，浮点数均是数字类型

var f = typeof 789;    //该处已定义赋给f 的值为所赋的值的类型
var f = typeof (789);  //添加括号依然可以检测类型，但该写法不正确
console.log(f);        //该处可直接输出类型为number（数值）

var g = 10;
var h = g;
var i = h - g;
var h = i / g;
var g = i / h; 
console.log(g);   //因为i = h = 0所以g = 0/0，无法得出数字结果，所以输出结果为:NaN                     //NaN：not a number  在数学运算中，非数字结果均输出为NaN

console.log(typeof 0);   //NaN的检测类型是number  NaN不是一个数，但是数字类型的值

NaN == NaN   //false        //NaN的性质：不自等
```

```js
var nu1 = Number(prompt('第一个数字'));   //prompt(): 弹出输入框  
                                        //需要使用number（）包裹，否则输出为字符串 
var nu2 = Number(prompt('第二个数字'));

var sum = nu1 + nu2; 
//如果写成var sum = Number(nu1 + nu2);    //用number()包裹 nu1+nu2，会变成两个字符                                            串相连接，应该写成：
                                         //Number（nu1）+ Number（nu2）

alert(nu1+'+'+nu2+'＝' + sum);
```

```js
科学计数法：e*
1e10   //10000000000  e:10  e10:10的十次方   e*适用于过大或过小的绝对值
1e-10  //0.0000000001  e-10:10的负十次方
1e21   //1e+21  可显示正数最大位为小数点前21位（包括1）
1e-7   //1e-7  可显示负数最小位为小数点后6位

二进制数：0b开头
0b11010010 // 210

八进制数：0开头
064 //52

十六进制数：0x开头
0xa  //10
```

#### String（字符串）

```js
String 字符串类型

var j = 'typeof 789';   //此处的typeof 789已变成字符串，不具备检测类型能力
console.log(typeof k);  // 该处只写输出k，会直接输出值为;typeof 789，而不会输出值的类                            型，故此处k前需要加typeof

var l = '';
console.log(l);         //不输出任何东西
console.log(typeof l);  //空字符串的类型依然是string（字符串）
```

```js
字符串length属性   输出字符串长度  空字符串的长度为0

'hello world'.length  //11
''.length             //0
'h_el@#lo,  world'    //16  引号内均算作字符串,包括空格
```

```
toString()：  功能：将值变为字符串，与string()用途相同 

数字使用tostring（）需要用括号将数字包裹：
(1).tostring()    //数字进行打点调用方法都需要用括号将数字包裹
```

```js
字符串的常用方法

charAt()-得到指定位置字符:   
'hello world'.charAt(8)        //'r'   指定位置若超过字符串本身，则会得到空字符串''

substring()-提取子串(从a到b（不包括b）的子串):    
'0123456789'.substring(5,9)    //'5678'    不输入第二个参数，则输出a以及后面的所有字                                            符串 '56789'   (a,b)参数不分前后大小，                                            会自动调整为小数在前，但不能为负数

slice()-提取子串:
（功能与substring相同，a和b可以是负数，但a必须小于b，否则显示空字符串）

substr()-提取子串（从a开始（包括a本身）长度是x的子串）:  
'hello,    world'.substr(3,8)  //'lo,    w'   不输入第二个参数，则输出a以及后面的所                                               有字符串a可以为负数，表示从最后开始

toUpperCase()-将字符串变为大写:
'HElLo WoRlD'.toUpperCase()    //'HELLO WORLD'  

toLowerCase()-将字符串变为小写:
'HElLo WoRlD'.toLowerCase()    //'hello world'

indexOf()-检索字符串(检测指定单独字符或多个相连字符首次出现的位置，否则返回-1):   
'hello world'.indexOf('o')     //4    
'hello world'.indexOf(' wo')   //5   
'hello world'.indexOf('a')     //-1
```

#### Null（空对象）

```js
Null 空对象

需要将对象、数组销毁以及删除事件监听时，可将他们设置为null  null的类型为object:
typeof null  //object
```

#### Boolean（布尔）

```js
boolean  布尔类型值

只有true和false，即1和0  常用于关系运算和逻辑运算
typeof true  //boolean
1<3          //true
1>3          //false
```

```js
Boolean():  功能：把值转为布尔值

1.数字转布尔值：0和NaN会转为false     
2.布尔值转布尔值：空字符串会转为false,'false'变字符串后会转为true      
3.undefined和null都会转为false
```

#### Undefined（未定义）

```js
Undefined(未定义)  

当变量没有被赋值时，默认值为undefined，undefined既是值，也是类型
console.log(s);         //单独此句时，s未被赋值也未被定义，报错显示s未被定义
console.log(typeof s);  //s没有被赋值，未被定义，无法检测出类型
var s = 10;             //此处s的赋值为10，变量声明的定义被提升，输出显示为undefined，                           同时检测类型为undefined
console.log(s);         //此处输出被赋值后的s
```



### 引用类型

javaScript中除了原始类型之外就是对象(Object)，数组、函数是特殊的对象。

Object(对象)、Function(函数)。其他还有Array(数组)、Date(日期)、RegExp(正则表达式)、特殊的基本包装类型(String、Number、Boolean) 以及单体内置对象(Global、Math)等 引用类型的值是对象 保存在堆内存中，栈内存存储的是对象的变量标识符以及对象在堆内存中的存储地址。

```js
// 名存在栈内存中，值存在于堆内存中，但是栈内存会提供一个引用的地址指向堆内存中的值
var obj1 = { 
    name: "张三",
    age: 18
} 
obj2 = obj1 // 当obj2 = obj1进行拷贝时，其实复制的是obj1的引用地址，而并非堆里面的值
obj2.name = "李四" // 当obj2.name = "李四" 进行修改时，由于obj1与obj2指向的是同一个地址，所以obj1也受了影响，这就是所谓的浅拷贝了。
console.log(obj1) // {name: "李四", age :18}
```



思考：

什么是深拷贝和浅拷贝，如何实现深拷贝？

深拷贝：

​       深拷贝是指拷贝对象的具体内容，二内存地址是自主分配的，拷贝结束之后俩个对象虽然存的值是一样的，但是内存地址不一样，俩个对象页互相不影响，互不干涉

```js
var a={x:1}
var b=Object.assign({}, a);
console.log(b);    //{x:1}
b.x = 2;
console.log(b);    //{x:2}
console.log(a);    //{x:1}
```



浅拷贝：

​        对内存地址的复制，让目标对象指针和源对象指向同一片内存空间。当内存销毁的时候，只想对象的指针，必须重新定义，才能够使用

```js
var a = {x:1}
var b = a
console.log(b);//{x:1}
b.x = 2
console.log(b)//{x:2}
console.log(a)//{x:2}

//浅拷贝是一个传址,也就是把a的值赋给b的时候同时也把a的址赋给了b，当b（a）的值改变的时候，a（b）的值同时也会改变
```



### 类型判断

#### typeof 

识别值类型、函数、引用类型（都识别为object, 不精确，有缺陷）

优点：能够快速区分基本数据类型

缺点：不能将Object、Array和Null区分，都返回object

```js
typeof "Bill"                // 返回 "string"
typeof 3.14                  // 返回 "number"
typeof true                  // 返回 "boolean"
typeof x                     // 返回 "undefined" (假如 x 没有值)
typeof {name:'Bill', age:62} // 返回 "object"
typeof [1,2,3,4]             // 返回 "object" 
typeof null                  // 返回 "object"
typeof function myFunc(){}   // 返回 "function"
```

#### toString

优点：精准判断数据类型

缺点：写法繁琐不容易记，推荐进行封装后使用

```js
function typeOf(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase() 
}
typeOf(new Date) // 'date'
typeOf({}) // 'object' 
typeOf(null) // 'null'
```

####  instanceof 

instanceof 用于检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上。

优点：能够区分Array、Object和Function，适合用于判断自定义的类实例对象

缺点：Number，Boolean，String基本数据类型不能判断

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



思考：

什么是构造函数？什么是原型链？什么是实例对象？



#### 构造函数：

```js
构造函数是一种特殊的函数，用来在对象实例化的时候初始化对象的成员变量，它具有以下特点：

1，构造函数必须与类名相同，并且不能有返回值（返回值类型也不能写void）

2，每个类可以有多个构造函数，如果没有类中没有写构造函数，则编译器会自动添加一个无参的构          造函数，但该构造函数不会执行任何的代码

3，构造函数可以有多个参数

4，构造函数伴随new操作一起被执行，不能由自己去调用，是由系统调用的，且只被调用一次！！！而普通    的方法可以调用多次。

5，构造函数的作用主要是完成对象的初始化工作

6，构造函数不能被继承，因此它不能被覆盖，但是它可以被重载

7，当父类没有提供无参数的构造方法的时候，子类的构造函数必须要显示的调用父类的构造方法（super    关键字），如果父类提供了无参数的构造方法，则子类的构造函数可以不显示的调用父类的构造函数，    编译器会默认的调用父类的无参构造函数。

8，当父类和子类都没有定义构造函数的时候，编译器会分别给父类和子类生成一个无参数的构造函数，默    认构造器的修饰符只与当前类的修饰符有关。
```



#### 原型链：

```js
   原型链，简单理解就是原型组成的链。当访问一个对象的某个属性时，会先在这个对象本身属性上查找，如果没有找到，则会去它的_proto_隐式原型上查找，即它的构造函数的prototype，如果还没有找到就会再在构造函数的prototype的_proto_层向上查找就会形成一个链式结构，我们称为原型链。
   
   在JS中，每个函数在被创建的时候就会有一个prototype属性，这个属性是一个指针，指向一个对象，而这个对象就是这个函数的原型对象（也就是原型），它是用来共享所有实例的属性和方法的地方，所以原型其实就是函数的伴生体（与生俱来的）。
```



#### 实例对象：

```js
   实例是对象的具体表示，操作可以作用于实例，实例可以有状态地存储操作结果。 实例被用来模拟现实世界中存在的、具体的或原型的东西。 对象就是类的实例，所有的对象都是实例，但并不是所有的实例都是对象.
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



##  运算符

### **算术运算符**

-   \+ - \* / 加减乘除
-   %取余：判断是否闰年，判断奇数和偶数
-   ++自增：在原来的基础上加1；
-   \--自减： 在原来基础上减1

###  **比较运算符**

-   \< \>= \<=
-   ==(等于) !=(不等于)：比较值
-   ===(全等于) !==不全等于：比较值和类型

思考：

= =和=== 的区别?

- ==（相等操作符）：比较时会进行类型转换，尝试将两个操作数转换为相同的类型，然后进行值的比较。如果操作数的类型不同，会进行类型转换后再比较。这种比较方式被称为弱类型相等比较。

- ===（严格相等操作符）：比较时不进行类型转换，仅当两个操作数的类型相同且值相等时，返回true。这种比较方式要求比较的操作数类型和值都要相同。

当比较两个相同类型的原始类型（如数字、字符串等），== 和 === 的结果是一样的。例如：

```js
1 == 1 // true
1 === 1 // true
'hello' == 'hello' // true
'hello' === 'hello' // true
```

当比较不同类型的原始类型时，== 会进行类型转换后再比较，而=== 不进行类型转换。例如：

```js
1 == '1' // true，将字符串转换为数字后比较
1 === '1' // false，类型不同

true == 1 // true，将布尔值转换为数字后比较
true === 1 // false，类型不同
```

对于特殊值（null和undefined），== 和 === 的结果也有差异。例如：

```js
null == undefined // true，它们被认为是相等的
null === undefined // false，它们类型不同
```

推荐使用===进行比较，因为它不会进行类型转换，可以避免引起意外的比较结果。在大多数情况下，严格相等操作符===更安全、更准确。但是，对于某些特定情况下需要进行类型转换的比较，可以使用相等操作符==。

推荐使用===进行比较，因为它不会进行类型转换，可以避免引起意外的比较结果。在大多数情况下，严格相等操作符===更安全、更准确。但是，对于某些特定情况下需要进行类型转换的比较，可以使用相等操作符==。

当比较的操作数是字符串和数字时，会尝试将字符串转换为数字，然后进行值的比较

当比较的操作数是布尔值和非布尔值时，会将布尔值转换为数字（true 转换为 1，false 转换为 0），然后进行值的比较。

当比较的操作数是对象和非对象时，会尝试将对象转换为原始值（valueOf() 或 toString() 方法被调用），然后再进行比较。


### **逻辑运算符**

- && 并且：关联的两个条件都是true，结果是true，否则false；

- \|\| 或者：关联的两个条件有个一是true，结果是true，否则false；

- ! 非：取反

- **短路逻辑：**

  在逻辑运算中，如果前一个条件已经可以得出最终结论，则后续内容不再执行，只有前一个条件不足以得出最终结论时，后一个条件才会执行。

  在&&运算中，如果第一个条件为false，不再执行第二个条件。在\|\|运算中，如果第一个条件为true，不再执行第二个条件

  ```js
  // || 逻辑短路
  1 == a || 2 == a // true
  2 == a || 1 == a // true
  
  // && 逻辑短路
  1 == a && 2 == a // false
  2 == a && 1 == a // false
  ```

- 优先级:  先执行! ，再执行 && ， 最后执行 || 

  ```js
  console.log($a==4 || !_a===3 && a===2); // true
  ```

### 赋值运算符**

= += -= \*= /= %=

其中+=，-=，\*=，/=称为计算赋值，即先执行计算再执行赋值；

a+=1等同于a=a+1；

### **三目运算符**

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

## 流程控制

### 选择执行 

- if else

```js
if(条件表达式) {
	// 条件判断表达式为真执行
} else {
	// 否则执行
}
```

- switch

```js
switch (key) {
    case value:
        
        break;

    default:
        break;
}
```

### 循环执行

- for

for循环中的初始值，循环条件，步长可以不放在括号里面，但要保留for循环的结构即for( **;** **;** ); 如果有多个循环条件，后边的起作用。

```js
var result = 1;
for (var i = 1; i <= n; i++) {
    result *= i;
}
console.log(result)
```

##### 循环中break和continue关键字

**break关键字**：

可以结束任何形式的循环，

当break执行后，

后边所有的循环体和循环条件都不执行；

```js
var result = '';
for (var i = 1; i <= 10; i++) {
    if (i == 5) {
        break;
    }
    for (var j = 1; j <= i; j++) {
        result += '*';
    }
    result += '\n';
}
console.log(result)
```

**continue关键字**：

跳过本次循环体，继续执行下一次循环

```js
var result = '';
for (var i = 1; i <= 10; i++) {
    if (i == 5) {
        continue;
    }
    for (var j = 1; j <= i; j++) {
        result += '*';
    }
    result += '\n';
}
console.log(result)
```

##### 循环嵌套

在循环体中存在另一个循环，任意多个之间都可以相互嵌套

外层循环：控制循环的行数,i就是行数

内层循环: 控制每一行循环的列数

每一行的循环条件是由所在的行数决定

```js
var result = '';
for (var i = 1; i <= 10; i++) {
    for (var j = 1; j <= i; j++) {
        result += '*';
    }
    result += '\n';
}
console.log(result)
```



思考：

如何打印99乘法表？

```js
var x , y;
for(x = 1;x <= 9;x ++){
document.write("<br>");               // x 为行的乘数，y 为列数  每一行打印完后换行
for(y = 1;y <= x;y ++){
   sum = x * y;
   document.write(x ,"*",y ,"=",sum,"   ");     // 使 "x" 和 "y" 能打印出来
}
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



### 数组：array

用来存储一组相关的值，从而方便进行求和、计算平均数、逐项遍历等操作

#### 定义方法

```js
var arr1 = ['a','b','c','d'];

var arr2 = new Array(1 , 2 , 3 , 4);  //new Array:内置构造函数，用new调用Array（）                                         构造函数来获得类的实例

var arr3 = new Array (4);      //定义一个长度为4的空数组，定义的4个项均为undefined

console.log(arr1);             //[ 'a', 'b', 'c', 'd' ]

console.log(arr2);             //[ 1, 2, 3, 4 ]

console.log(arr3);             //[ <4 empty items> ]  4 empty items：4个数组空值
```



#### 访问数组项

数组项的数组每一项都有下标，下标从0开始  

下标的作用：可以使用方括号中书写下标的形式，访问数组的任一项

```js
console.log(arr1[0]);  //a

console.log(arr2[1]);  //2

console.log(arr3[2]);  //undefined
```



#### 下标越界

访问数组项中不存在的项会返回undefined，不会报错

```js
console.log(arr1[4]);  //undefined

console.log(arr2[-2]);  //undefined
```



#### length属性

数组的length属性表示它的长度

```js
console.log(arr1.length);  //4  

console.log(arr1.length-1);//数组最后一项的下标是数组长度减1
```



#### 更改数组项

数组并不是只读，我们可以修改它其中任何项的值

```js
arr2[1]++;

arr2[2] = 6;

arr2[4] = 2;       //如果更改的数组项超过了length-1，则会创造此项

arr2[8] = 5;       //下标5-下标7的项会定义为3个数组空值：<3 empty item>，然后继续定义                      下标8的项为5

console.log(arr2); //[ 1, 3, 6, 4, 2, <3 empty items>, 5 ]
```



#### 数组的遍历

数组最大的优点就是方便遍历

```js
var arr4 = [1 , 3 , 6 , 4 , 2 ,,,, 5 ,,,,];

for (var ar= 0; ar < arr4.length; ar++) {   //ar < arr4.length 也可写成 ar <=                                                 arr4.length-1

 console.log(arr2[ar]);;

}

// 1

// 3

// 6

// 4

// 2

// undefined    //在浏览器控制台中，相同的项会被折叠输出为 3undefined

// undefined

// undefined

// 5

// undefined

// undefined

// undefined    //在数组中的结尾有四个逗号，但此处会输出为 3undefined ，最后一个逗号会被判断为误输入，所以不会输出
```



#### 数组常用方法



##### 数组的头尾操作方法

```js
var arr5 = [1 , 2 , 3 , 4];

//push():

//用来在数组末尾推入新项，参数就是要推入的项

//如果要推入多项，用逗号隔开

//调用push()方法后，数组会立即改变，不需要赋值

arr5.push(5);

arr5.push(6 , 7 , 8 , 9);

console.log(arr5);      //(8) [1 , 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9]  
                        //在浏览器控制台中第一次输入结果会折叠起来：Array（8），需要刷新                           才能展开



//pop():

//与push()相反，pop()方法用来删除数组中的最后一项 

//不仅会删除数组末项，而且会返回被删除的项

var item = arr5.pop();  //删除数组最后一个项：9  var item用于接受arr5.pop()返回的值

console.log(arr5);      //(7) [1 , 2 , 3 , 4 , 5 , 6 , 7 , 8]

console.log(item);      //9     输出接受到的值



//unshift():

//用来在数组头部插入新项，参数就是要插入的项

//如果要插入多项，用逗号隔开

//调用unshift()方法后，数组会立即改变，不需要赋值

arr5.unshift(0);

arr5.unshift(1 , 2 , 3);

console.log(arr5);      //(11) [1 , 2 , 3 , 0 , 1 , 2 , 3 , 4 , 5 , 6 , 7 , 8]



//shift():

//与unshift()相反，shift()方法用来删除数组中下标为0的项

//不仅会删除数组首项，而且会返回被删除的项

var item = arr5.shift();   //删除数组下标为0的项：9  var item用于接受arr5.shift()返                              回的值

console.log(arr5);         //(10) [2 , 3 , 0 , 1 , 2 , 3 , 4 , 5 , 6 , 7 , 8]

console.log(item);         //1     输出接受到的值
```



##### splice()方法

```js
var arr6 = ['a','b','c','d','e','f','g'];



//用于替换数组中的指定项

arr6.splice(2 , 3 ,'i','j','k');   //从下标2的项开始，连续替换3项

console.log(arr6);                 //['a','b','i','j','k','f','g']



//用于在指定位置插入新项

arr6.splice(0 , 0 ,'i','j','k');   //从下标0的项开始，连续替换0项

console.log(arr6);                 //['i','j','k'，'a','b','i','j','k','f','g']



//用于删除指定项

arr6.splice(3 , 4);               //从下标3的项开始，连续删除4项

console.log(arr6);                //[ 'i', 'j', 'k', 'k', 'f', 'g' ]
 


//以数组形式返回被删除的项

var item = arr6.splice(2 , 2 , 'b','w');  //从下标2的项开始，连续删除两项，并替换                                               为'b'，'w'

console.log(arr6);                //[ 'i', 'j', 'b', 'w', 'f', 'g' ]

console.log(item);                //[ 'k', 'k' ]
```



##### slice方法

用于得到子数组，类似于字符串的slice()方法

```js
var arr7 = [1 , 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9];

//slice(a,b)截取的子数组从下标为a的项开始，到下标为b（但不包括下标为b的项结束）
//slice(a,b)不会更改原有数组
arr7.slice(2 , 5);       //只会返回原数组
console.log(arr7);       //[1 , 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9]

var child_arr7 = arr7.slice(2,5);     //此处定义子数组 child_arr7
console.log(child_arr7);             //[3 , 4 , 5]

//slice()如果不提供第二个参数，则表示从指定项开始，提取到所有后续所有项作为子数组
var child_arr7 = arr7.slice(2);     
console.log(child_arr7);             //[3 , 4 , 5 ， 6 ， 7 ， 8 ， 9]

//slice()的参数允许为负数，表示数组的倒数第几项
var child_arr7 = arr7.slice(2 , -2);     
console.log(child_arr7);             //[3 , 4 , 5 ， 6 ， 7 ]

```



##### join()方法和split()方法

数组的join()方法可以使数组转为字符串，而字符串的split()方法可以使字符串转为数组

```js
//join()的参数表示以什么字符作为连接符，如果留空默认以逗号分隔，如同调用toString()方法
[1 , 2 , 3 , 4 , 5].jon()

//1,2,3,4,5
[1 , 2 , 3 , 4 , 5].jon('*')
//1*2*3*4*5

//split()的参数表示以什么字符拆分字符串，一般不能留空
'abcdef'.split()
//['abcdef']               //当括号中没有输入时，输出结果并不会将每一个字符串单独拆分成                              数组

'abcdef'.split('')         //空字符串表示在字符之后把每个字符打开成数组
//['a','b','c','d','e','f']

'a*b*c*d*e*f'.split('*')   //表示*号座位拆分符
//['a','b','c','d','e','f']
```



##### 字符串和数组更多相关性

字符串也可以使用方括号写下标的形式，访问某个字符，等同于charAt()方法

```js
'12345'[2]
//3
```



##### concat()方法

用于合并多个数组

```js
//合并后输出结果不会改变原数组
var arr8 = [1 , 2 , 3];
var arr9 = [6 , 7 , 8];
var arr10 = [11 , 12 , 13];
var arr11 = arr8.concat(arr9 , arr10);
console.log(arr11);               //[1 , 2 , 3 , 6 , 7 , 8 , 11 , 12 , 13]
```



##### reverse()方法

用来将一个数组中的全部项顺序置反

```js
var arr12 = ['a','b','c','d','e'];
arr12.reverse();
console.log(arr12);              //[ 'e', 'd', 'c', 'b', 'a' ]
```



##### indexOf()方法和includes()方法

indexOf()方法的功能是搜索数组中的元素，并返回他所在的位置，如果元素不存在，则返回-1

```js
['a','b','c','d','e','f'].indexOf('e')
//4
['a','b','c','d','e','f'].indexOf('g')
//-1

[1 , 2 , 3].indexOf('2')
//false                  //indexOf()方法和includes()方法在判断时，都是用===的判断方                            法，包含类型的判断形势
```



includes()方法的功能是判断一个数组是否包含一个指定的值，返回布尔值

```js
['a','b','c','d','e','f'].indexOf('e')
//true
['a','b','c','d','e','f'].indexOf('g')
//false
[1 , 2 , 3].indexOf('2')
//-1
```



练习题

1. 计算数组中所有元素的总和。

   ```js
   let arr = [1, 2, 3, 4, 5];
   ```

   

2. 移除数组中的重复元素

   ```js
   let arr = [1, 2, 3, 3, 4, 4, 5];
   ```

   

3. 找出数组中的最大值和最小值。

   ```js
   let arr = [1, 5, 3, 9, 2]; 
   ```

   

4. 对数组进行大到小排序排序和从小到大排序

   ```js
   let arr = [3, 1, 4, 2, 5];
   ```

   

5. 找出数组中出现次数最多的元素

   ```js
   let arr = [1, 2, 3, 4, 2, 2, 3, 3, 3];
   ```

   

6. 将两个数组合并，并去除重复元素。

   ```js
   let arr1 = [1, 2, 3];
   let arr2 = [2, 3, 4, 5];
   ```

   

7. 使用数组的`map()`方法，将数组中的每个元素都加倍，并返回新的数组。

   ```js
   let arr = [1, 2, 3, 4, 5];
   ```

   

8. 使用数组的`filter()`方法，筛选出数组中大于等于10的元素，并返回新的数组。

   ```js
   let arr = [5, 10, 15, 20, 25];
   ```

   

9. 使用数组的`reduce()`方法，计算数组中所有元素的乘积。

   ```js
   let arr = [1, 2, 3, 4, 5];
   ```

   

10. 使用数组的`some()`方法，检查数组中是否存在大于10的元素。

    ```js
    let arr = [5, 10, 15, 20, 25];
    ```

    

11. 使用数组的`every()`方法，检查数组中的所有元素是否都大于等于10。

    ```js
    let arr = [5, 10, 15, 20, 25];
    ```

    

12. 使用数组的`find()`方法，找到数组中第一个大于10的元素。

    ```
    let arr = [5, 10, 15, 20, 25];
    ```

    

13. 使用数组的`findIndex()`方法，找到数组中第一个大于10的元素的索引。

    ```js
    let arr = [5, 10, 15, 20, 25];
    ```

    

14. 使用数组的`forEach()`方法，将数组中的每个元素都打印出来。

    ```js
    let arr = [1, 2, 3, 4, 5];
    ```

    

15. 使用数组的`reduce()`方法，找到数组中出现次数最多的元素。

    ```js
    let arr = [1, 2, 3, 4, 2, 3, 2, 4, 5, 5, 5];
    ```

    

16. 使用数组的`sort()`方法，按照数组中元素的长度进行排序。

    ```js
    let arr = ['apple', 'banana', 'pear', 'orange'];
    ```

    

    

