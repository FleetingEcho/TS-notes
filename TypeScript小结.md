## TypeScript

**`TypeScript`**简称TS，TS和JS之间的关系其实就是Less/Sass和CSS之间的关系，就像Less/Sass是对CSS进行扩展一样，TS也是对JS进行扩展，就像Less/Sass最终会转换成CSS一样，我们编写好的TS代码最终也会换成JS。

因为JavaScript是弱类型，很多错误只有在运行时才会被发现，而**`TypeScript`**是强类型，它提供了一套静态检测机制，可以帮助我们在编译时就发现错误。

#### TypeScript特点

支持最新的JavaScript新特特性；支持代码静态检查；支持诸如C、C++、Java、Go等后端语言中的特性(枚举、泛型、类型转换、命名空间、声明文件、类、接口等)。

------

## 配置webpack打包ts

```js
1.初始化一个自动打包的webpack项目
2.通过tsc --init初始化TypeScript配置文件 (自动生成tsconfig.json)
3.通过npm install typescript ts-loader安装对应loader
4.修改webpack配置文件
entry: "./src/js/index.ts",
resolve: {
    extensions: [ '.tsx', '.ts', '.js' ] // 支持识别ts文件
},
rules: [
    { // ts编译配置
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
    }
]
```

------

## 基础类型

TypeScript支持与JavaScript几乎相同的数据类型，此外还提供了实用的枚举类型方便我们使用。

- 数值类型 number：`let val1:number;` 定义了一个名称叫做val1的变量, 这个变量中将来只能存储数值类型的数据
- 布尔类型 boolean：`let val2:boolean;`
- 字符串类型 string：`let val3:string;`
- 数组类型Array：`let arr1:Array<number>; arr1 = [1, 3]; let arr2:string[]; arr2 = ['a', 'b'];`
- 联合类型 |：`let arr3:(number | string)[];`表示定义了一个名称叫做arr3的数组, 这个数组中既可以存储数值类型也可以存储字符串类型。`arr3 = [1, 'b', 2, 'c'];`
- 任意类型 any：
- **元祖类型：**TS中的元祖类型其实就是数组类型的扩展，元祖用于保存定长定数据类型的数据。`let arr5:[string, number, boolean];`表示定义了一个名称叫做arr5的元祖, 这个元祖中将来可以存储3个元素, 第一个元素必须是字符串类型, 第二个元素必须是数字类型, 第三个元素必须是布尔类型
- void类型：void与any正好相反, 表示没有任何类型, 一般用于函数返回值。 **`在TS中只有null和undefined可以赋值给void类型`**

**注意点:** `null`和`undefined`是所有类型的子类型, 所以我们可以将`null`和`undefined`赋值给任意类型

------

## 扩展类型

#### **枚举类型**

**枚举类型**是TS为JS扩展的一种类型，在原生的JS中是没有枚举类型的，枚举用于表示固定的几个取值。TS中的枚举底层实现的本质其实就是数值类型。

**注意点:** TS中的枚举类型的取值，默认是从上至下从0开始递增的，虽然默认是从0开始递增的，但是我们也可以手动的指定枚举的取值的值；如果手动指定了前面枚举值的取值，那么后面枚举值的取值会根据前面的值来递增。

```typescript
enum Gender{
    Male,
    Femal
}
let val:Gender;
val = Gender.Male;
// val = 'nan'; // 报错
// val  = false;// 报错
// 注意点: TS中的枚举底层实现的本质其实就是数值类型, 所以赋值一个数值不会报错
// val = 666; // 不会报错
console.log(Gender.Male); // 0
console.log(Gender.Femal);// 1
// 我们通过它对应的数据拿到它的枚举值
console.log(Gender[0]); // Male
```

TS中支持两种枚举，一种是数字枚举，一种是字符串枚举。

###### **字符串枚举**

和数字枚举不一样，字符串枚举不能使用常量或者计算结果给枚举值赋值， 但是它可以使用内部的其它枚举值来赋值；如果使用字符串给前面的枚举值赋值了, 那么后面的枚举值也必须手动赋值。

```typescript
enum Gender{
    Male = 'www.baidu.com',
    Female = 'www.taobao.com',
    Yao = Female
}
console.log(Gender.Female);
console.log(Gender.Yao);
```

###### 枚举反向映射

可以根据枚举值获取到原始值，也可以根据原始值获取到枚举值。

```typescript
enum Gender{
    Male,
    Female
}
console.log(Gender.Male); // 0
console.log(Gender[0]); // Male
```

###### 异构枚举

枚举中既包含数字又包含字符串，我们就称之为异构枚举。

```typescript
enum Gender{
    Male = 6,
    Female = 'nv'
}
console.log(Gender.Male); // 6
console.log(Gender.Female); // nv
console.log(Gender[6]); // Male
// console.log(Gender['nv']); // 如果是字符串枚举, 那么无法通过原始值获取到枚举值
```

###### 枚举成员类型

以把枚举成员当做类型来使用。

```typescript
enum Gender{
    Male,
    Female
}
interface TestInterface {
    age: Gender.Male
}
class Person implements TestInterface{
    age: Gender.Male
    // age: Gender.Female // 由于类型不匹配, 所以会报错
    // age: 0 // 由于数字枚举的本质就是数值, 所以这里写一个数值也不会报错

//////////////////  如果是字符串枚举  //////////////////
    // age: Gender.Male
    // age: Gender.Female  // 报错
    // age: 'www.baidu.com' // 如果是字符串枚举, 那么只能是枚举成员的值, 不能是其它的值，报错
    // age: string // 报错
}
```

###### 联合枚举类型

联合类型就是将多种数据类型通过`|`连接起来，我们可以把枚举类型当做一个联合类型来使用。

```typescript
enum Gender{
    Male ,
    Female
}
interface TestInterface {
     age: Gender // 会转化为联合枚举类型：age: (Gender.Male | Gender.Female)
}
class Person implements TestInterface{
    // age: Gender.Male
    age: Gender.Female
}
```

###### 运行时枚举

枚举在编译之后是一个真实存储的对象，所以可以在运行时使用。 而像接口这种只是用来做约束做静态检查的代码，编译之后是不存在的。

###### 常量枚举

普通枚举和常量枚举的区别：普通枚举会生成真实存在的对象；常量枚举不会生成真实存在的对象, 而是利用枚举成员的值直接替换使用到的地方。

```typescript
const enum Gender2{ // 不加const就是普通枚举
    Male,
    Female
}
console.log(Gender2.Male === 0); // 编译后变成 console.log(0 /* Male */ === 0);
```

###### **枚举底层实现原理**

```typescript
var Gender;
(function (Gender) {
 // Gender[key] = value;
    Gender[Gender["Male"] = 0] = "Male";
    Gender[Gender["Femal"] = 1] = "Femal";
})(Gender || (Gender = {}));
// 原理所表示的相当于：
let Gender = {};
Gender["Male"] = 0;
Gender[0] = "Male";
Gender["Femal"] = 1;
Gender[1] = "Femal";
```

#### **Never类型**

**Never类型** 表示的是那些永不存在的值的类型，一般用于抛出异常或根本不可能有返回值的函数。

```typescript
function demo():never {
    throw new Error('报错了');
}
function demo2():never {
    while (true){}
}
```

**Object类型** 表示一个对象，`let obj:object;`。

------

## 类型断言

TS中的类型断言和其它编程语言的类型转换很像，可以将一种类型强制转换成另外一种类型；类型断言就是告诉编译器不需要检查我们指定的语法

例如: 我们拿到了一个any类型的变量，但是我们明确的知道这个变量中保存的是字符串类型，此时我们就可以通过类型断言告诉编译器，这个变量是一个字符串类型，此时我们就可以通过类型断言将any类型转换成string类型，使用字符串类型中相关的方法了。

```typescript
// 使用方式1
let str:any = 'test';
let len = (<string>str).length;
// 使用方式2
let len = (str as string).length;
// 第一种方式有兼容性问题, 在使用到了JSX的时候兼容性不是很好，推荐使用as来进行类型转换(类型断言)
```

------

## 接口类型

和number、string、boolean、enum这些数据类型一样，接口也是一种类型，也是用来约束使用者的。

```typescript
// 定义一个接口类型
interface FullName{
    firstName:string
    lastName:string
}
let obj = {
    firstName:'Jonathan',
    lastName:'Lee'
    // lastName:18
};
function say({firstName, lastName}:FullName):void {
    console.log(`我的姓名是:${firstName}_${lastName}`);
}
say(obj);
```

**注意点：**如果使用接口来限定了变量或者形参，那么在给变量或者形参赋值的时候，赋予的值就必须和接口限定的一模一样才可以，多一个或者少一个都不行。

#### 可选属性

参数传递少一个或多个可以使用可选属性 ?

```typescript
// 定义一个接口
interface FullName{
    firstName:string
    lastName:string
    middleName?:string  // ?: 可选属性，使用接口的函数，参数可传可不传
    [propName:string]:any
}
function say({firstName, lastName, middleName}:FullName):void {...}
```

参数传递多一个或者多多个

```typescript
// 方式一: 使用类型断言
say({firstName:'Jonathan', lastName:'Lee', middleName:"666", abc:'abc'} as FullName);
// 方式二: 使用变量  不推荐
let obj = {firstName:'Jonathan', lastName:'Lee', middleName:"666", abc:'abc'};
say(obj);
// 方式三: 使用索引签名
interface FullName{
    firstName:string
    lastName:string
    middleName?:string
    [propName:string]:any // 表示 key 为 string类型，值any类型
}
function say({firstName, lastName, middleName}:FullName):void {...}
say({firstName:'Jonathan', lastName:'Lee', middleName:"666", abc:'abc', 123:123, def:"def"});
// 对象中key默认会给你转成字符串
```

#### 索引签名

索引签名用于描述那些`“通过索引得到”`的类型，比如`arr[10]`或`obj["key"]`。

```typescript
interface FullName {
    [propName:string]:string
}
let obj:FullName = { // 注意点: 只要key和value满足索引签名的限定即可, 无论有多少个都无所谓
    firstName:'Jonathan',
    lastName:'Lee',
    // middleName:false // 报错
    // false: '666' // 无论key是什么类型最终都会自动转换成字符串类型, 所以没有报错
}
interface stringArray {
    [propName:number]:string
}
let arr:stringArray = {
    0:'a',
    1:'b'
};
```

#### 只读属性

**`readonly`** 让对象属性只能在对象刚刚创建的时候修改其值。

```tsx
interface FullName {
    firstName:string
    readonly lastName:string
}
let myName:FullName = {
    firstName: 'Jonathan',
    lastName: 'Lee'
};
myName.lastName = 'Wang'; // 报错
```

#### 只读数组

```
ReadonlyArray
let arr2:ReadonlyArray<string> = ['a', 'b', 'c'];
```

#### 函数接口

可以使用接口来限定函数

```tsx
interface SumInterface {
    (a:number, b:number):number
}
let sum:SumInterface = function (x:number, y:number):number {
    return x + y;
}
let res = sum(10, 20); // 30
```

#### 混合类型接口

约定的内容中既有对象属性，又有函数。

```typescript
// 定义一个函数实现变量累加
let demo = (()=>{ // 使用闭包确实可以解决污染全局空间的问题, 但是不太友好
    let count = 0;
    return ()=>{
        count++;
        console.log(count);
    }
})();
demo();
demo();
// 在JS中函数的本质就是一个对象
let demo = function () {
    demo.count++; // 函数对象里面还有属性
}
demo.count = 0;
demo();
demo();
// ts写法：混合类型接口
// CountInterface 接口要求数据既要是一个没有参数没有返回值的函数，又要是一个拥有count属性的对象；fn作为函数的时候符合接口中函数接口的限定 ():void，fn作为对象的时候符合接口中对象属性的限定  count:number
interface CountInterface {
    ():void
    count:number
}
let getCounter = function ():CountInterface {
    let fn = <CountInterface>function () { // 使用类型断言，避免fn.count++报错
        fn.count++;
        console.log(fn.count);
    }
    fn.count = 0;
    return fn;
};
getCounter();
getCounter();
```

#### 接口的继承

TS中的接口和JS中的类一样是可以继承的。

```typescript
interface WidthInterface {
    width:number
}
interface HeightInterface {
    height:number
}
interface RectInterface extends WidthInterface,HeightInterface {
    // width:number
    // height:number
    color:string
}
let rect:RectInterface = {
    width:20,
    height:30,
    color:'red'
}
```

------

## 函数

TS中的函数大部分和JS相同；

#### 命名函数

```typescript
function say1(name) {
    console.log(name);
}
// ts
function say1(name:string):void {
    console.log(name);
}
```

#### 匿名函数

```typescript
let say2 = function (name) {
    console.log(name);
}
let say2 = function (name:string):void {
    console.log(name);
}
```

#### 箭头函数

```typescript
let say3 = (name) => {
    console.log(name);
}
let say3 = (name:string):void =>{
    console.log(name);
}
```

## 函数声明和重载

在TS中函数的完整格式应该是由函数的定义和实现两个部分组成的。

#### 函数声明

```typescript
// js定义一个函数
let AddFun:(a:number, b:number)=>number;
// 根据定义实现函数
AddFun = function (x:number, y:number):number {
    return x + y;
};
let res = AddFun(10, 20);

// 一步到位写法
let AddFun:(a:number, b:number)=>number =
function (x:number, y:number):number {
    return x + y;
};

// 根据函数的定义自动推导对应的数据类型
let AddFun:(a:number, b:number)=>number =
    function (x, y) {
        return x + y;
    };

/////////////////////  TS函数声明  /////////////////////
// 先声明一个函数
type AddFun = (a:number, b:number)=>number;
// 再根据声明去实现这个函数
let add:AddFun = function (x:number, y:number):number {
    return x + y;
};
let add:AddFun = function (x, y) {
    return x + y;
};
```

#### 函数重载

```typescript
/////////////////////  TS函数重载  /////////////////////
function getArray(x:number):number[] {
    let arr = [];
    for(let i = 0; i <= x; i++){
        arr.push(i);
    }
    return arr;
}
function getArray(str:string):string[] {
    return str.split('');
}
```

#### 可选参数

```typescript
function add(x:number, y:number, z?:number):number {
    return x + y + (z ? z : 0);
}
let res = add(10, 20);
let res = add(10, 20, 30);
```

可选参数可以配置函数重载一起使用，这样可以让函数重载变得更加强大。

```typescript
function add(x:number, y:number):number; // 函数定义
function add(x:number, y:number, z:number):number; // 函数定义
function add(x:number, y:number, z?:number) { // 函数实现，可选参数可以多个，可选参数后面的参数也必须是可选参数
    return x + y + (z ? z : 0);
}
let res = add(10, 20, 30);
```

#### 默认参数

```typescript
function add(x:number, y:number=10):number {
    return x + y;
}
let res = add(10); // 20
```

#### 剩余参数

```typescript
function add(x:number, ...ags:number[]) {
    console.log(x);
    console.log(ags);
}
add(10, 20, 30, 40, 50) // 10 20 30 40 50
```

------

## 泛型

在编写代码的时候我们既要考虑代码的健壮性，又要考虑代码的灵活性和可重用性，通过TS的静态检测能让我们编写的代码变得更加健壮，但是在变得健壮的同时却丢失了灵活性和可重用性，所以为了解决这个问题TS推出了泛型的概念。通过泛型不仅可以让我们的代码变得更加健壮，还能让我们的代码在变得健壮的同时保持灵活性和可重用性。

```typescript
let getArray = (value:any, items:number = 5):number[]=>{ // 失去ts优势
    return new Array(items).fill(value);
};
let getArray = <T>(value:T, items:number = 5):T[]=>{
    return new Array(items).fill(value);
};
let arr = getArray<string>('abc');
// 泛型具体的类型可以不指定，如果没有指定, 那么就会根据我们传递的泛型参数自动推导出来
let arr = getArray(6);
```

#### 泛型约束

默认情况下我们可以指定泛型为任意类型，但是有些情况下我们需要指定的类型满足某些条件后才能指定，那么这个时候我们就可以使用泛型约束。

```typescript
interface LengthInterface{
    length:number
}
let getArray = <T extends LengthInterface>(value:T, items:number = 5):T[]=>{
    return new Array(items).fill(value);
};
let arr = getArray<string>('abc');
// let arr = getArray<number>(6); // 报错
```

#### 在泛型约束中使用类型参数

一个泛型被另一个泛型约束，就叫做泛型约束中使用类型参数。

```typescript
let getProps = <T, K extends keyof T>(obj:T, key:K):any=>{ // K必须是T中key
    return obj[key];
}
let obj = {
    a:'a',
}
let res = getProps(obj, "a");
// let res = getProps(obj, "c"); // 报错，c不是obj中存在的key.
```

------

## 类

```typescript
class Person {
    name:string; // 和ES6区别, 需要先定义实例属性, 才能够使用实例属性
    age:number;
    constructor(name:string, age:number){
        this.name = name;
        this.age = age;
    }
    say():void{
        console.log(`我的名称叫${this.name}, 我的年龄是${this.age}`);
    }
    static food:string; // 静态属性
    static eat():void{ // 静态方法
        console.log(`我正在吃${this.food}`);
    }
}
////////////////////////////////////
let p = new Person('lnj', 34);
p.say();
Person.food = '蛋挞';
Person.eat();
////////////////////////////////////
class Student extends Person{
    book:string;
    constructor(name:string, age:number, book:string){
        super(name, age);
        this.book = book;
    }
    say():void{
        console.log(`我是重写之后的say-${this.name}${this.age}${this.book}`);
    }
    static eat():void{
        console.log(`我是重写之后的eat-${this.food}`);
    }
}
let stu = new Student('zs', 18, '从零玩转');
stu.say(); // 我是重写之后的say-zs18从零玩转
Student.food = '冰淇淋'; // 我是重写之后的eat-蛋挞
Student.eat();
```

#### 类属性和方法修饰符

```html
public(公开的):
如果使用public来修饰属性, 那么表示这个属性是公开的; 可以在类的内部使用, 也可以在子类中使用, 也可以在外部使用

protected(受保护的):
如果使用protected来修饰属性, 那么表示这个属性是受保护的; 可以在类的内部使用, 也可以在子类中使用

private(私有的):
如果使用private来修饰属性, 那么表示这个属性是私有的; 可以在类的内部使用

readonly(只读的): 创建类初始化后不许修改
```

构造函数`protected`后，该类不能通过`new`创建实例，但是可以被继承。

#### 可选属性

在TS中如果定义了实例属性, 那么就必须在构造函数中初始化，否则就会报错。如果想不初始化，就需要设置为可选属性。和接口中的可选属性一样，可传可不传的属性。

```typescript
class Person {
    name:string;
    age?:number; // 可选属性
    constructor(name:string, age?:number){
        this.name = name;
        this.age = age;
    }
}
let p = new Person('lnj');
```

#### 参数属性

搞定实例属性的接收和定义，主要用于简化代码。

```typescript
class Person {
    constructor(public name:string, public age:number){ // 不加public，new Person('meihao', 18); 得到的对象为空 
    }
}
let p = new Person('meihao', 18); // p打印出{name: 'meihao', age: 18}
/////////////////////  不使用参数属性  /////////////////////
class Person {
    name:string;
    age:number;
    constructor(name:string, age:number){
        this.name = name;
        this.age = age;
    }
}
```

#### 类存取器

通过**`getters`**/**`setters`**来截取对对象成员的访问。

```typescript
class Person {
    private _age:number = 0;
    set age(val:number){
        console.log('进入了set age方法');
        if(val < 0){
            throw new Error('人的年龄不能小于零');
        }
        this._age = val;
    }
    get age():number{
        console.log('进入了get age方法');
        return this._age;
    }
}
let p = new Person();
p.age = 34; // 进入了set age方法
// p.age = -6; // 进入了set age方法 人的年龄不能小于零
console.log(p.age);
```

#### 抽象类

抽象类是专门用于定义哪些不希望被外界直接创建的类的，抽象类一般用于定义基类，抽象类和接口一样用于约束子类。

**抽象类和接口区别：**接口中只能定义约束，不能定义具体实现，而抽象类中既可以定义约束，又可以定义具体实现。

```typescript
abstract class Person {
    abstract name:string;
    abstract say():void;
    eat():void{
        console.log(`${this.name}正在吃东西`);
    }
}
class Student extends Person{
    name:string = 'test';
    say():void{
        console.log(`我的名字是${this.name}`);
    }
}
let stu = new Student();
stu.say(); // 我的名字是test
stu.eat(); // test正在吃东西
```

#### 类和接口

**类"实现"接口**，只要实现的某一个接口，那么就必须实现接口中所有的属性和方法。

```typescript
interface PersonInterface {
    name:string;
    say():void;
}
class Person implements PersonInterface{
    name:string = 'test';
    say():void{
        console.log(`我的名字叫:${this.name}`);
    }
}
let p = new Person();
p.say();
```

**接口"继承"类**，只要一个接口继承了某个类，那么就会继承这个类中所有的属性和方法，但是只会继承属性和方法的声明，不会继承属性和方法实现；如果接口继承的类中包含了`protected`的属性和方法，那么就只有这个类的子类才能实现这个接口；

```typescript
class Person {
    protected name:string = 'test'; // 
    // name:string = 'test';
    age:number = 34;
    protected say():void{
        console.log(`name = ${this.name}, age = ${this.age}`);
    }
}
// let p = new Person();
// p.say();
interface PersonInterface extends Person{
    gender:string;
}
// 接口继承的类中包含了protected的属性和方法, 那么就只有这个类的子类才能实现这个接口
class Student extends Person implements PersonInterface{ // 所以Person中有受保护方法和属性，这里要extends Person
    gender:string = 'male';
    name:string = 'zs';
    age:number = 18;
    say():void{
        console.log(`name = ${this.name}, age = ${this.age}, gender = ${this.gender}`);
    }
}
```

#### 类和泛型

```typescript
// 泛型类
class Chache<T> {
    arr:T[] = [];
    add(value:T):T{
        this.arr.push(value);
        return value;
    }
    all():T[]{
        return this.arr;
    }
}
let chache = new Chache<number>();
chache.add(1);
chache.add(3);
console.log(chache.all()); // [1, 3]
```

#### 接口合并现象

当我们定义了多个同名的接口时，多个接口的内容会自动合并。

```typescript
interface TestInterface {
    name:string;
}
interface TestInterface {
    age:number;
}
class Person implements TestInterface{ // 接口合并，必须同时实现name,age
    age:number = 19;
    name:string = 'test';
}
```

------

## 自动类型推断

不用明确告诉编译器具体是什么类型，编译器就知道是什么类型。

```typescript
////////////////   根据初始化值自动推断   ////////////////
// 如果是先定义在初始化, 那么是无法自动推断的
let value;
value = 123;
value = false;
// 如果是定义的同时初始化, 那么TS就会自动进行类型推荐
let value = 123; // let value:number = 123;
value = 456;
value = false;  // 报错

////////////////   根据上下文类型自动推断   ////////////////
window.onmousedown = (event)=>{ // window.onmousedown = (event:MouseEvent)=>
    console.log(event.target);
}
```

------

## 类型兼容性

```typescript
interface TestInterface {
    name:string;
    children:{
        age:number
    };
}

let p1 = {name:'zs', children:{age:18}};
let p2 = {name:'zs',children:{age:'abc'},gender: 'box'};
let t:TestInterface;
t = p1; // 会递归检查
t = p2; // 可多不可少,兼容
```

------

## 函数兼容性

#### 参数

```typescript
////////////////   参数个数   ////////////////
let fn1 = (x:number, y:number)=>{};
let fn2 = (x:number)=>{};
fn1 = fn2;
fn2 = fn1; // 可少不可多

////////////////   参数类型，返回值类型   ////////////////
// 必须一模一样
```

#### 函数双向协变

```typescript
////////////////   函数双向协变   ////////////////
// 参数的双向协变
let fn1 = (x:(number | string)) =>{};
let fn2 = (x:number) =>{};
fn1 = fn2;
fn2 = fn1;
// 返回值双向协变
let fn1 = (x:boolean):(number | string) => x ? 123 : 'abc';
let fn2 = (x:boolean):number => 456;
fn1 = fn2; // 可以将返回值是具体类型的赋值给联合类型
fn2 = fn1; // 不能将返回值是联合类型的赋值给具体类型
```

#### 函数重载

```typescript
function add(x:number, y:number):number;
function add(x:string, y:string):string;
function add(x, y) {
    return x + y;
}

function sub(x:number, y:number):number;
function sub(x, y) {
    return x - y;
}
// let fn = add;
// fn = sub; // 不能将重载少的赋值给重载多的

let fn = sub;
fn = add; // 可以将重载多的赋值给重载少
```

------

## 枚举兼容性

数字枚举与数值兼容，数字枚举与数字枚举不兼容，字符串枚举与字符串不兼容

```typescript
enum Gender{
    Male,
    Female
}
let value:Gender;
value = Gender.Male;
value = 1 // 数字枚举与数值兼容
```

------

## 类兼容性

只比较实例成员，不比较类的构造函数和静态成员。

```typescript
class Person {
    public name:string;
    public age:number;
    // public static age:number; // 如果name改成静态成员，下面 p = a不报错
    constructor(name:string, age:number){}
}
class Animal {
    public name:string;
    constructor(name:string){}
}
let p: Person;
let a: Animal;
// p = a; // 报错
a = p; // 可多不少
```

类的私有属性和受保护属性会响应兼容性。

```typescript
class Person {
    protected name:string;
}
class Animal {
    protected name:string;
}
let p: Person;
let a: Animal;
// p = a; // 报错
// a = p; // 报错
```

------

## 泛型兼容性

泛型只影响使用的部分，不会影响声明的部分。

```typescript
interface TestInterface<T> {
    // age:T; // 不加这个下面 t1 t2赋值不报错，加了就报错。加了下面t1 t2声明有具体的类型，赋值就报错
}
let t1: TestInterface<number>; // age:number
let t2: TestInterface<string>; // age:string
t1 = t2;
t2 = t1;
```

------

## 交叉和联合类型

#### **交叉类型**

格式：**`type1 & type2 & ...`** 交叉类型是将多个类型合并为一个类型

```typescript
let mergeFn = <T, U>(arg1:T, arg2:U):(T & U)=>{ // (T & U) 表示T和U类型合并后的类型
    let res = {} as (T & U);
    res = Object.assign(arg1, arg2);
    return res;
};
let res = mergeFn({name:'test'}, {age:18}); 
console.log(res); // {name: 'test', age:18}
```

#### **联合类型**

格式：**`type1 | type2 | ...`** 联合类型是多个类型中的任意一个类型

```typescript
let value: (string | number);
value = 'abc';
value = 123;
```

------

## 类型保护

对于联合类型的变量，在使用时如何确切告诉编译器它是哪一种类型，通过类型断言或者类型保护。

```typescript
let getRandomValue = ():(string | number)=>{
    let num = Math.random();
    return (num >= 0.5) ? 'abc' : 123.123;
}
let value = getRandomValue();
if((value as string).length){
    console.log((value as string).length);
}else{
    console.log((value as number).toFixed());
} 
// 优化： 定义了一个类型保护函数, 这个函数的'返回类型'是一个布尔类型
// 这个函数的返回值类型是: (传入的参数 is 具体类型)
function isString(value:(string | number)): value is string {
    return typeof value === 'string'; // true,value is string 为true. false, value is string 为false
}
if(isString(value)){
    console.log(value.length);
}else{
    console.log(value.toFixed());
}
```

------

## null和undefined

TypeScript具有两种特殊的类型， null和 undefined，它们分别具有值null和undefined。默认情况下我们可以将 null和 undefined赋值给任意类型，默认情况下null和 undefined也可以相互赋值。

如果不想把 null和 undefined赋值给其它的类型，或者不想让 null和 undefined相互赋值，那么可以修改`tsconfig.json`配置，开启**`strictNullChecks`**。

如果我们开启了**`strictNullChecks`**，还想把null和 undefined赋值给其它的类型，就必须在声明的时候使用联合类型。

```typescript
let value:(number | null | undefined);
```

对于可选属性和可选参数而言，如果开启了**`strictNullChecks`**，那么默认情况下数据类型就是联合类型。

```typescript
class Person {
    name?:string
}
function say(age?:number) {}
```

#### null或 undefined检测

###### **`!`**

```typescript
function getLength(value:(string | null | undefined)) {
    value = 'abc';
    return ()=>{
        // return value.length; // 报错
        // return (value || '').length; // 解决报错的第一种方式
        // return (value as string).length; // 解决报错的第二种方式
        // 我们可以使用!来去除null和undefined
        // !的含义就是这个变量一定不是null和undefined,一定有值的
        return value!.length;
    }
}
let fn = getLength('www');
let res = fn();
console.log(res);
```

------

## 类型别名

类型别名就是给一个类型起个新名字，但是它们都代表同一个类型。

```typescript
// 给string类型起了一个别名叫做MyString, 那么将来无论是MyString还是string都表示string
type MyString = string;
////////////////  类型别名也可以使用泛型  ////////////////
// type MyType<T> = {x:T, y:T};
// let value:MyType<number>;
value = {x:123, y:456};
////////////////  接口和类型别名相互兼容  ////////////////
type MyType = {
    name:string
}
interface MyInterface {
    name:string
}
let value1:MyType = {name:'lnj'};
let value2:MyInterface = {name:'zs'};
value1 = value2;
value2 = value1;
```

------

## 类型别名和接口

**相同点：**

- 都可以描述属性或方法
- 都允许拓展

**不同点：**

- type 可以声明基本类型别名，联合类型，元组等类型, interface不能
- type不会自动合并

------

## 字面量类型

```typescript
字面量就是源代码中一个固定的值
例如数值字面量: 1,2,3,...
例如字符串字面量: 'a','abc',...
////////////////  TS中我们可以把字面量作为具体的类型来使用  ////////////////
当使用字面量作为具体类型时, 该类型的取值就必须是该字面量的值
type MyNum = 1;
let value1:MyNum = 1;
let value2:MyNum = 2; // 报错
```

------

## 可辨识联合

可辨识联合具有共同的可辨识特征。一个类型别名，包含了具有共同的可辨识特征的类型的联合。可辨识联合可以在编译的时候推断出当前类型。

```typescript
interface Square {
    kind: "square"; // 共同的可辨识特征
    size: number;
}
interface Rectangle {
    kind: "rectangle"; // 共同的可辨识特征
    width: number;
    height: number;
}
interface Circle {
    kind: "circle"; // 共同的可辨识特征
    radius: number;
}
/*
Shape就是一个可辨识联合
因为: 它的取值是一个联合
因为: 这个联合的每一个取值都有一个共同的可辨识特征
* */
type Shape = (Square | Rectangle | Circle); // 可辨识联合可以在编译的时候推断出当前类型
function aera(s: Shape) { // 不需要做类型断言
    switch (s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.width * s.height;
        case "circle": return  Math.PI * s.radius ** 2; // **是ES7中推出的幂运算符
    }
}
```

#### 可辨识联合完整性检查

方式一: 给函数添加返回值 并 开启`strictNullChecks`(使用这个方式，上面的例子三种类型的case语句都需要有)

方式二: 添加default + never （不推荐）

```typescript
function MyNever(x: never):never { // 类型为 never
    throw new Error('可辨识联合处理不完整' + x);
}
function aera(s: Shape):number{
    switch (s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.width * s.height;
        case "circle": return  Math.PI * s.radius ** 2; // **是ES7中推出的幂运算符
        default:return MyNever(s); // 处理的不完整这里会提示报错
    }
}
```

------

## 索引类型

通过`[]`索引类型访问操作符, 我们就能得到某个索引的类型。

```typescript
class Person {
    name:string;
    age:number;
}
type MyType = Person['name']; // string 类型
// 索引访问操作符注意点
// 不会返回null/undefined/never类型
interface TestInterface {
    a:string,
    b:number,
    c:boolean,
    d:symbol,
    e:null,
    f:undefined,
    g:never
}
type MyType = TestInterface[keyof TestInterface];
// 获取指定对象, 部分属性的值, 放到数组中返回
let obj = {
    name:'lnj',
    age:18,
    gender:true
}
function getValues<T, K extends keyof T>(obj:T, keys:K[]):T[K][] {
    let arr = [] as T[K][];
    /*
        Person['name'] === string
        Person['age'] === number
        (string | number)[]
    */
    keys.forEach(key=>{
        arr.push(obj[key]);
    })
    return arr;
}
let res = getValues(obj, ['name', 'age']);
```

------

## 映射类型

根据旧的类型创建出新的类型, 我们称之为映射类型。

------

## 分布式条件类型

#### 条件类型(三目运算)

判断前面一个类型是否是后面一个类型或者继承于后面一个类型；如果是就返回第一个结果, 如果不是就返回第二个结果。

```typescript
语法: T extends U ? X : Y;
type MyType<T> = T extends string ? string : any;
type res = MyType<boolean> // res 就是 any类型
```

#### 分布式条件类型Exclude

```typescript
type MyType<T> = T extends any ? T : never;
type res = MyType<string | number | boolean>; // res 就是 (string | number | boolean)
// 应用：从T中剔除可以赋值给U的类型。 
type MyType<T, U> = T extends U ? never : T;
type res = MyType<string | number | boolean, number> // res = (string | boolean)
```

ts已经封装好了`Exclude`，分布式条件类型

```typescript
type res = Exclude<string | number | boolean, number>
///// 相反操作，提取可以赋值给U的。
type res = Extract<string | number | boolean, number | string> // 提取可以赋值给number和string的类型，联合类型、一个类型都可以。
///// 从T中剔除null和undefined。 NonNullable。
type res = NonNullable<string | null | boolean | undefined>
///// 获取函数返回值类型。 ReturnType
type res = ReturnType<(()=>number)> // number 类型
///// 获取一个类的构造函数参数组成的元组类型。 ConstructorParameters
class Person {
    constructor(name:string, age:number){}
}
type res = ConstructorParameters<typeof Person>; // res = [string, number]
///// 获得函数的参数类型组成的元组类型。 Parameters
function say(name:string, age:number, gender:boolean) {}
type res = Parameters<typeof say>; // res = [string, number, boolean]
```

------

## infer关键字

条件类型提供了一个`infer`关键字, 可以让我们在条件类型中定义新的类型。

```typescript
// 需求: 定义一个类型, 如果传入的是数组, 就返回数组的元素类型, 如果传入的是普通类型, 则直接返回这个类型。
type MyType<T> = T extends any[] ? T[number] : T;
type res = MyType<string[]>; // string[]
type res = MyType<number>; // number

type MyType<T> = T extends Array<infer U> ? U : T;
type res = MyType<string[]>; // string[]
type res = MyType<number>; // number
```

------

## unknown

**`unknown`**类型是**`TS3.0`**中新增的一个`顶级类型`，被称作`安全的any`。

```typescript
1.任何类型都可以赋值给unknown类型
let value:unknown;   value = 123;    value = "abc";    value = false;

2.如果没有类型断言或基于控制流的类型细化, 那么不能将unknown类型赋值给其它类型
let value1:unknown = 123;
let value2:number;
value2 = value1; // 报错
value2 = value1 as number; // 不报错
if(typeof value1 === 'number'){ // 类型细化
    value2 = value1;
}

3.如果没有类型断言或基于控制流的类型细化, 那么不能在unknown类型上进行任何操作
let value1:unknown = 123;
value1++; // 报错
(value1 as number)++;

4.只能对unknown类型进行 相等或不等操作, 不能进行其它操作(因为其他操作没有意义)
let value1:unknown = 123;
let value2:unknown = 123;
console.log(value1 === value2);
console.log(value1 !== value2);
console.log(value1 >= value2); // 虽然没有报错, 但是不推荐, 如果想报错提示, 可以打开严格模式

5.unknown与其它任何类型组成的交叉类型最后都是其它类型
type MyType = number & unknown; // number
type MyType = unknown & string;

6.unknown除了与any以外, 与其它任何类型组成的联合类型最后都是unknown类型
type MyType = unknown | any; // any
type MyType = unknown | number;
type MyType = unknown | string | boolean;

7.never类型是unknown类型的子类型
type MyType = never extends unknown ? true : false; // true

8.keyof unknown等于never
type MyType = keyof unknown;

9.unknown类型的值不能访问其属性,方法,创建实例
class Person {
    name:string = 'lnj';
    say():void{
        console.log(`name = ${this.name}`);
    }
}
let p:unknown = new Person(); // 设置为unknown类型，下面的方法报错
p.say();
console.log(p.name);

10.使用映射类型时, 如果遍历的是unknown类型, 那么不会映射任何属性
type MyType<T> = {
    [P in keyof T]:any
}
type res = MyType<unknown> // 空对象
```

------

## Symbols

和ES6中的Symbol一样。

------

## 迭代器和生成器

迭代器**`for...of`** **`Iterator`**接口

```typescript
let someArray = [1, "string", false];
for (let entry of someArray) {
    console.log(entry); // 1, "string", false
}
```

生成器

当生成目标为ES5或ES3，迭代器只允许在Array类型上使用。在非数组值上使用 for..of语句会得到一个错误，就算这些非数组值已经实现了Symbol.iterator属性。为了解决这个问题, 编译器会生成一个简单的for循环做为for..of循环

------

## 模块系统

TS中的模块几乎和ES6和Node中的模块一致

```typescript
1.ES6模块
1.1分开导入导出
export xxx;
import {xxx} from "path";

1.2一次性导入导出
export {xxx, yyy, zzz};
import {xxx, yyy, zzz} from "path";

1.3默认导入导出
export default xxx;
import xxx from "path";
//////////////////////////////////////////////////////// 
2.Node模块
1.1通过exports.xxx = xxx导出
通过const xxx = require("path");导入
通过const {xx, xx} = require("path");导入

1.2通过module.exports.xxx = xxx导出
通过const xxx = require("path");导入
通过const {xx, xx} = require("path");导入

ES6的模块和Node的模块是不兼容的, 所以TS为了兼容两者就推出了
export = xxx;
import xxx = require('path');
```

------

## 命名空间

命名空间可以看做是一个微型模块，当我们先把相关的业务代码写在一起，又不想污染全局空间的时候，我们就可以使用命名空间，本质就是定义一个大对象，把变量/方法/类/接口...的都放里面。

**命名空间和模块区别：**

在程序内部使用的代码，可以使用命名空间封装和防止全局污染；在程序内部外部使用的代码，可以使用模块封装和防止全局污染；

**总结: **由于模块也能实现相同的功能，所以大部分情况下用模块即可。

```typescript
namespace Validation {
    const lettersRegexp = /^[A-Za-z]+$/;
    export const LettersValidator  = (value) =>{ // export 暴露给外界访问
        return lettersRegexp.test(value);
    }
}
const lettersRegexp = /^[A-Za-z]+$/; // 再定义一个相同的，不会报错
console.log(Validation.LettersValidator('abc'));
  
可以将命名空间放到单独的ts, 用下面的方式引入，引入前需要对这个ts打包：tsc --outFile ./tests.ts
/// <reference path="./test.ts" /> 
// 使用前需要打包，tsc --outFile ./tests.ts
```

------

## 声明合并

**接口**：在ts当中接口和命名空间是可以重名的，ts会将多个同名的合并为一个；同名接口如果属性名相同, 那么属性类型必须一致；同名接口如果出现同名函数, 那么就会成为一个函数的重载；

**命名空间**：同名的命名空间中不能出现同名的变量、方法等；同名的命名空间中其它命名空间没有通过export导出的内容是获取不到的；

**命名空间和同名的类合并**： 命名空间和类合并前提，类必须定义在命名空间的前面；会将命名空间中导出的方法作为一个静态方法合并到类中；

```typescript
class Person {
    say():void{
        console.log('hello world');
    }
}
namespace Person{
    export const hi = ():void=>{
        console.log('hi');
    }
}
```

**命名空间和函数合并**：函数必须定义在命名空间的前面；

```typescript
function getCounter() {
    getCounter.count++;
    console.log(getCounter.count);
}
namespace getCounter{
    export let count:number = 0;
}
```

**命名空间和枚举合并**：没有先后顺序的要求；

```typescript
enum Gender {
    Male,
    Female
}
namespace Gender{
    export const Yao:number = 666;
}
```

------

## 装饰器

Decorator 是 ES7 的一个新语法，目前仍处于提案中。装饰器是一种特殊类型的声明，它能够被附加到类，方法， 访问器，属性或参数上；添加到不同地方的装饰器有不同的名称和特点。

```
+ 附加到类上, 类装饰器
+ 附加到方法上,方法装饰器
+ 附加到访问器上,访问器装饰器
+ 附加到属性上,属性装饰器
+ 附加到参数上,参数装饰器
```

在TS中装饰器也是一项实验性的特性，所以要使用装饰器需要手动打开相关配置修改配置文件`experimentalDecorator`

**装饰器基本格式：**

#### 普通装饰器

```typescript
// 给Person这个类绑定了一个普通的装饰器,装饰器的代码会在定义类之前执行, 并且在执行的时候会把这个类传递给装饰器
function test(target) {
    console.log('test');
}
@test
class Person {} // test
```

#### 装饰器工厂

```typescript
// 如果一个函数返回一个回调函数, 如果这个函数作为装饰器来使用, 那么这个函数就是装饰器工厂
function test(target) {
    console.log('test');
}
function demo() {
    console.log('demo out');
    return (target)=>{
        console.log('demo in');
    }
}
@test()  // 给Person这个类绑定了一个装饰器工厂,在绑定的时候由于在函数后面写上了(),所以会先执行装饰器工厂拿到真正的装饰器,真正的装饰器会在定义类之前执行, 所以紧接着又执行了里面
class Person {} // demo out   demo in
```

#### 装饰器组合

普通的装饰器可以和装饰器工厂结合起来一起使用，结合起来一起使用的时候, 会先从上至下的执行所有的装饰器工厂, 拿到所有真正的装饰器，然后再从下至上的执行所有的装饰器。

```typescript
@test
@demo()
class Person {} // demo out   demo in   test
```

------

## 类装饰器

- 类装饰器在类声明之前绑定（紧靠着类声明）
- 类装饰器可以用来监视，修改或替换类定义
- 在执行类装饰器函数的时候, 会把绑定的类作为其唯一的参数传递给装饰器
- 如果类装饰器返回一个新的类，它会新的类来替换原有类的定义

```typescript
function test(target:any) {
    target.prototype.personName = 'hello';
    target.prototype.say = ():void=>{ // say方法实现
        console.log(`my name is ${target.prototype.personName}`);
    }
}
@test
class Person {}
interface Person{ // 和Person类合并，有了say方法的声明，下面p.say()就不会合并，
    say():void;
}
let p = new Person();
p.say(); // 报错, my name is hello
// test接收的参数{ {构造函数} }
function test<T extends {new (...args:any[]):{}}>(target:T) {
    return class extends target { // 返回一个类
        name:string = 'lnj';
        age:number = 18;
    }
}
@test  // 返回的类会替换person
class Person {}
let p = new Person();
console.log(p); // {name: 'hello', age: 18}
```

------

## defineProperty

可以直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。

```typescript
// 定义一个新的属性
let obj = {age:18};
Object.defineProperty(obj, 'name', {
    value:'lnj'
});
// 修改原有属性
let obj = {age:18};
Object.defineProperty(obj, 'age', {
    value:34
});
// 修改属性配置-读写
let obj = {age:18};
Object.defineProperty(obj, 'age', {
    writable:false
})
obj.age = 34; // 报错
// 修改属性配置-迭代
let obj = {age:18, name:'lnj'};
Object.defineProperty(obj, 'name', {
    enumerable: false
})
for(let key in obj){
    console.log(key);
}
// // 修改属性配置-配置
let obj = {age:18, name:'lnj'};
Object.defineProperty(obj, 'name', {
    enumerable:false,
    configurable: false // 一经配置，后面再修改都会报错
});
Object.defineProperty(obj, 'name', {
    enumerable:true,
    configurable: false // 报错
});
for(let key in obj){
    console.log(key);
}
```

------

## 方法装饰器

方法装饰器写在一个方法的声明之前（紧靠着方法声明），法装饰器可以用来监视，修改或者替换方法定义。方法装饰器表达式会在运行时当作函数被调用。

**传入下列3个参数：**

1. 对于静态方法而言就是当前的类, 对于实例方法而言就是当前的实例
2. 被绑定方法的名字
3. 被绑定方法的属性描述符

```typescript
function test(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    // console.log(target);
    // console.log(propertyKey);
    // console.log(descriptor);
}
function test(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.value = ():void=>{ // 通过获取方法属性，来替换值，也就是替换方法
        console.log('my name is ls');
    };
}
class Person {
    @test
    sayName():void{
        console.log('my name is zs');
    }
}
let p = new Person();
p.sayName(); // my name is ls
```

------

## 访问器装饰器

访问器装饰器声明在一个访问器的声明之前（紧靠着访问器声明）。访问器装饰器应用于访问器的属性描述符并且可以用来监视，修改或替换一个访问器的定义。

```typescript
// TypeScript不允许同时装饰一个成员的get和set访问器
function test(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.set = (value:string)=>{
        target.myName = value; // target为类的原型对象
    }
    descriptor.get = ():string=>{
        return target.myName;
    }
}
class Person {
    private _name:string;	
    constructor(name:string){
        this._name = name;
    }
    @test
    get name():string{
        return this._name;
    }
    set name(value:string){
        this._name = value;
    }
}
let p = new Person('ls');
p.name = 'zs';
console.log(p.name); // ls
console.log(p.__proto__.myName); // zs
```

------

## 属性装饰器

属性装饰器写在一个属性声明之前（紧靠着属性声明）, 属性装饰器表达式会在运行时当作函数被调用，传入下列2个参数：

1. 对于静态属性来说就是当前的类, 对于实例属性来说就是当前实例
2. 成员的名字

```typescript
function test(target:any, proptyName:string) {
    target[proptyName] = 'test';
}
class Person {
    // @test
    static age:number; // 也可以被装饰修改
    @test
    name?:string;
}
let p = new Person();
console.log(p.name); // test
```

------

## 参数装饰器

参数装饰器写在一个参数声明之前（紧靠着参数声明）。数装饰器表达式会在运行时当作函数被调用。

**传入下列3个参数：**

1. 对于静态方法而言就是当前的类, 对于实例方法而言就是当前的实例
2. 被绑定方法的名字
3. 被绑定方法的属性描述符

```typescript
function test(target:any, proptyName:string, index:number) {
    console.log(target);
    console.log(proptyName);
    console.log(index);
}
class Person {
    say(age:number,@test name:string):void{}
}
```

------

## 混入

#### 对象混入

```typescript
let obj1 = {name:'lnj'};
let obj2 = {age:34};
Object.assign(obj1, obj2);
console.log(obj1);
console.log(obj2); // 无变化
```

#### 类混入

```typescript
// 定义两个类, 将两个类的内容混入到一个新的类中
class Dog {
    name:string = 'wc';
    say():void{
        console.log('wang wang');
    }
}
class Cat {
    age:number = 3;
    run():void{
        console.log('run run');
    }
}
// 一次只能继承一个类
// class Animal extends Dog, Cat{}
class Animal implements Dog, Cat{
    name:string;
    age:number;
    say:()=>void;
    run:()=>void;
}
function myMixin(target:any, from:any[]) {
    from.forEach((fromItem)=>{ // 类方法混入target
        Object.getOwnPropertyNames(fromItem.prototype).forEach((name)=>{
            target.prototype[name] = fromItem.prototype[name];
        })
    })
}
myMixin(Animal, [Dog, Cat]);
let a = new Animal();
console.log(a);
a.say();
a.run();
// console.log(a.name); // 方法可以混入，属性不可以
// console.log(a.age);
```

------

## 声明

在开发中我们不可避免的需要引用第三方的 JS 的库，但是默认情况下TS是不认识我们引入的这些JS库的，所以在使用这些JS库的时候，我们就要通过声明来告诉告TS它是什么，它怎么用。

```typescript
declare const $:(selector:string)=>{}; // 告诉ts $符号是个类型函数，接收一个string参数。$是导入的jquery
console.log($); // 有了declare，ts文件中这里就不会报错
```

------

## 声明文件

默认情况下**`ts`**会首先去查找项目中所有**`js`**文件和**`ts`**文件。也可以去修改`ts.config.josn`，最后加上`include`配置，告诉`ts`去查找哪些文件。

```json
  "include": [
    "./src/**/*.ts",
    "./src/**/*.d.ts",
  ],
// declare.d.ts 文件中写声明文件
declare let myName:string;
declare function say(name:string, age:number):void;
// 注意点: 声明中不能出现实现
declare class Person {
    name:string;
    age:number;
    constructor(name:string, age:number);
    say():void;
}
// test.ts
console.log(myName);
say('lnj', 18);
let p = new Person('zs', 666);
p.say();
```

对于常用的第三方库，其实已经帮我们编写好了对应的声明文件。所以在开发中，如果我们需要使用一些第三方JS库的时候我们只需要安装别人写好的声明文件即可。

TS声明文件的规范 **`@types/xxx`** 例如: 想要安装`jQuery`的声明文件，那么只需要`npm install @types/jquery`即可。