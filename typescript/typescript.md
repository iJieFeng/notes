# 起步

官网：https://www.tslang.cn/index.html

```js
// 查看版本
tsc -v 

// 安装typescript
npm install -g typescript

// 编译ts文件为js文件： 
tsc ***.ts //=> ***.js

// 直接运行ts文件
  
ts-node ***.ts
```

# 基础语法

## any、void 和 never

- **any** 任意值类型

  ```js
  let notSure: any = 1
  notSure = 'maybe a string'
  notSure = true
  notSure = 666
  notSure.myName
  notSure.getName()
  ```

- **void** 类型表示永远不会有值的一种类型：没有任何类型，

  没有返回值的函数，其返回值类型为 `void`

  ```js
  function warnUser(): void {
      console.log("This is my warning message");
  }
  ```

  申明为 `void` 类型的变量，只能赋予 `undefined` 和 `null`

  ```js
  let unusable: void = undefined;
  ```

- **never ** 类型表示永远不会有值的一种类型，是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型

  

## 原始数据类型

```js
let bol: boolean = false
let num: number = 10
let str: string = "jack"
let u: undefined = undefined
let n: null = null
```



## 数组和元祖

```js
// 数组
let arrNumbers: number[] = [1, 2, 3]
let arrString: string[] = ['1', '2', '3']

// 元组
let user: [string, number] = ['张三', 123]

// 类数组
function test() {
  console.log(arguments);
}
```



## interface接口

对对象的形状进行描述

```js
interface IPerson {
  name: String;
  age?: number; // ? -- 可选属性
  readonly id: number // readonly -- 只读属性
}
let zhangsan: IPerson = {
  id: 1,
  name: 'zhangsan',
  age: 20
}
// zhangsan.id = 600 // 只读属性不允许修改
```

数组对象

```tsx
interface props {
  id: string;
  name: string;
}
const list: props[] = {
  id: 1,
  name: 'zhangsan'
}
```



## 函数类型

```js
// 函数
function add(x: number, y: number, z?: number): number {
  if (typeof z === 'number') {
    return x * y
  } else {
    return x * y * z
  }
}
// 函数表达式
const mul = (x: number, y: number, a?: number): number => {
  if (typeof a === 'number') {
    return x * y
  } else {
    return x * y * a
  }
}
// 函数类型
const mul2: (x: number, y: number, z?: number) => number = mul
// 使用interface声明函数类型
interface ISum {
  (x: number, y: number, z?: number): number
}
let mul3: ISum = mul
```



## 类型推论

```js
// 类型推论 type interface
let typeStr = 'str' // 这里没有定义类型，ts会帮助我们推测出 str 类型为 string
// str = 123 // 类型推论为 string 不能赋值为 number
```



## 联合类型 |

```js
// 联合类型 union types
let numOrString: number | string
numOrString = "str"
numOrString = 666
numOrString.toString() // numOrString 可以访问 number 和 string 共有的属性
```



## 类型断言 as

类型断言 as 并不是类型转换，如果断言成联合类型不存在的类型是会报错的

```js
function getLength(input: number | string): number {
  const str = input as string
  if (str.length) {
    return str.length
  } else {
    const num = input as number
    return num.toString().length
  }
}
// type gurad -- typeof,instanceof
function getLength2(input: number | string): number {
  if (typeof input === 'string') {
    return input.length
  } else {
    return input.toString().length
  }
}
```



## 类(class)和接口

readonly 修饰的属性为只读

Public: 修饰的属性或方式是共有的

Private: 修饰的属性或方法是私有的

Protected: 修饰的属性或方法是受保护的



类和接口

```js
interface Radio {
    switchRadio(trigger: boolean): void;
}

```



## 枚举 enum

```js
enum Direction {
  Up,
  Down,
  Left,
  Right
}
console.log(Direction.Up); // 0
console.log(Direction[0]); // 'Up'

enum Direction1 {
  Up = 'UP',
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT"
}
console.log(Direction1.Up); // 'UP
console.log(Direction1[0]); // 'Up'
```

常量枚举

```js
const enum Direction {
  Up = 'UP',
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT"
}
```



## 泛型 Generics

问题： 定义一个函数，接收什么类型的数据就返回什么类型的数据

如果接收参数类型已知

```js
function echo(arg: number): number {
    return arg
}
const result = echo(123)
```

如果接收的参数类型是任意的，此时就要使用any

```js
function echo1(arg: any): any {
	return arg
}
```

但是使用any，就会丧失类型

```js
const result1: string = echo1(123)
```

针对这个问题就可以使用泛型解决

**`泛型`**指的是定义函数，接口或者类的时候不预先指定具体类型，而是在使用的时候再指定类型

```js
function echoT<T>(arg: T): T {
    return arg
}
const resN = echoT(1) 
// 此时 resN 就是 number 类型
resN.toString().length

const resS= echoT("str") 
// 此时 resS 就是 string 类型
resS.indexOf('s')

// const result2: string = echo(true)
// err : 不能将类型“number”分配给类型“string”
```

泛型的简单应用：调换元祖的类型

```js
function swap<T, U>(tuple: [U, T]): [T, U] {
    return [tuple[1], tuple[0]]
}
const result3 = swap(['string',123])
result3[1].indexOf('s')
result3[0].toString().length
```

在函数内部使用泛型变量，事先不知道泛型变量的类型，不能随意操作它的方法和属性

```js
function echoWithArr<T>(arg: T): T {
    console.log(arg.length); 
    //报错 类型“T”上不存在属性“length”
    // 无法使用length，因为泛型T并不一定包含length属性
    // 泛型T类型是不确定，通过传入值的类型确定的，是动态变化的。
    return arg
}
```

想要使用length，可以使用T[]确保变量是一个数组，就可以使用length属性

```js
function echoWithArr<T>(arg: T[]): T[] {
    console.log(arg.length); 
    return arg
}
const arr = echoWithArr([1])
arr.map(item => console.log(item))
```

但是除了数组，字符串，对象都有length属性，这时候就要约束传入的泛型，只允许这个函数传入包含length属性的变量，这就是 **`约束泛型`**。

```tsx
interface ILength {
    length: number
}
function echoWithLength<T extends ILength>(arg: T): T {
    console.log(arg.length);
    return arg
}
const arr = echoWithLength([1])
const str = echoWithLength('zhangsan')
const obj = echoWithLength({ length: 1 })
```

泛型在interface接口中使用

```tsx
interface IkeyPair<T, U> {
    key: T,
    value: U
}
let kp1: IkeyPair<number, string> = { key: 1, value: "str" }
let kp2: IkeyPair<string, number> = { key: 'str', value: 1 }

let arr: number[] = []
let arr2: Array<number> = []
```

泛型在类中使用

```tsx
interface Idata { }
class Queue<T> {
    private data: Array<T> = []
    push(i: T) {
        return this.data.push(i)
    }
    pop() {
        return this.data.shift()
    }
}
const queue = new Queue<string>()
queue.push('123')
queue.push('789')
console.log(queue.pop());
// queue.push(123) // 类型“number”的参数不能赋给类型“string”的参数
```



## 类型别名 type aliase

```tsx
let sum: (x: number, y: number) => number = function (x, y) {
    return x + y;
};
const result = sum(1, 2);

// 类型别名
type PlusType = (x: number, y: number) => number;
let sum2: PlusType = function (x, y) {
    return x + y;
};
const result2 = sum2(3, 4);

type StrOrNumber = string | number;
let result3: StrOrNumber = "123456";

// 字面量
const str: "name" = "name";
type Directions = "Up" | "Down" | "Left" | "Right";
let toWhere: Directions = "Up";

// 交叉类型
interface IName {
    name: string;
}
type IPerson = IName & { age: number };
let person: IPerson = { name: "张三", age: 18 };
```







