```tsx
Array中有 ReadonlyArray<T>, 
const red:readonly number[]=[255,0,0]
enum有enum和const enum Direactions{}
const enum Direactions{}
Object 与object不同

Object类型的用途是描述“Object.prototype”对象的类型，即所有
对象共享的属性和方法。在描述自定义对象类型时用object即可
在object类型上仅允许访问对象的公共属性和方法，也就是Object类型中定义的属性和方法。
01 const obj: object = {};
03 obj.toString();
04 obj.valueOf();
            
            
readonly ? 默认的any
元组中的元素可选 [T0, T1?, T2?, T3?]
```



```tsx
全局的Object类型用于描述对象公共的属性和方法，它相当于一种专用类型，因此程序中不应该将自定义变量、参数等类型直接声明为Object类型。空对象类型字面量“{}”强调的是不包含属性的对象类型，同时也可以作为Object类型的代理来使用
```



```tsx
弱类型
对象类型中至少包含一个属性。
对象类型中所有属性都是可选属性。
对象类型中不包含字符串索引签名、数值索引签名、调用签名和构造签名
01 let config: {
02     url?: string;
03     async?: boolean;
04     timeout?: number;
05 };


索引签名
01  const point: {
02      x: number;
03      [prop: string]: number; // 索引签名
04  } = { x: 0, y: 0 };
            
```



```tsx
函数
可选参数? 
默认参数类型
在调用定义了剩余参数的函数时，剩余参数可以接受零个或多个实际参数
function f(...args: number[]) {} //剩余参数的类型也可以定义为元组类型
function f(...args: [boolean, string?]) {} //可选元素的元组类型
function f0(...args: [boolean, ...string[]]) {} //带有剩余元素的元组类型


参数解构
function f0([x, y]) {}
f0([0, 1]);
 
function f0([x, y]: [number, number]) {}
f0([0, 1]);
function f1({ x, y }: { x: number; y: number }) {}
f1({ x: 0, y: 1 });
            
            

void使用，返回undefined或者根本不调用return语句
let f: () => void;
f = function () { /* no-op */ };
参数名称可以不一致
let f: (x: number) => number;
f = function (y: number): number {
   return y;
};
调用带有调用签名的对象类型字面量对f进行描述，
function f(x: number) {
     console.log(x);
 }
f.version = '1.0';

let foo: { (x: number): void; version: string } = f;
const version = foo.version;  // string类型
            
                    
```



```tsx
Error类型
01 const a = new Error();
02 const b = new Error('Error message.');
构造函数的类型
01 let ErrorConstructor: new (message?: string) => Error;

构造签名与调用签名
01 declare const F: {
02     new (x: number): Number;  // <- 构造签名
03     (x: number): number;      // <- 调用签名
04 };
05 
06 // 作为普通函数调用
07 const a: number = F(1);
08 
09 // 作为构造函数调用
10 const b: Number = new F(1);
```



```tsx
函数重载

01 function add(x: number, y: number): number;
02 function add(x: any[], y: any[]): any[];
03 //在各个函数重载语句之间以及函数重载语句与函数实现语句之间不允许出现任何其他语句
04 // 函数实现必须位于最后
05 function add(x: number | any[], y: number | any[]): any {
06     // 省略了实现代码
07 }
函数实现需要兼容每个函数重载中的函数签名，函数实现的函数签名类型必须能够赋值给函数重载的函数签名类型。

开发者在编写函数重载代码时一定要将最精确的函数重载定义放在最前面，因为它们定义的顺序将影响函数调用签名的选择


***
可以使用如下对象类型字面量来表示重载函数f的类型
{
    (x: string): 0 | 1;
    (x: any): number;
}

函数实现的函数签名不属于重载函数的调用签名之一。
调用签名的书写顺序是有意义的，它决定了函数重载的解析顺序，一定要确保更精确的调用签名位于更靠前的位置。
```



```tsx
this值的类型

function foo(this: { name: string }|void) {
   this.name = 'Patrick';
   this.name = 0;
//  编译错误！类型 0 不能赋值给类型 'string'
} 
```



```tsx
Interface 
类似于对象类型字面量，接口类型也能够表示任意的对象类型。
不同的是，接口类型能够给对象类型命名以及定义类型参数.
接口类型无法表示原始类型，如boolean类型等。
```



```tsx
Interface五类

属性签名
interface Point {
    x: number;
    y: number;
 }
调用签名
interface ErrorConstructor {
    (message?: string): Error;
}
构造签名
interface ErrorConstructor {
    new (message?: string): Error;
}
方法签名
    interface Document {
       getElementById(elementId: string): HTMLElement | null;
    }
    A==B==C
    interface A {
        f(x: boolean): string;       // 方法签名
    }
    interface B {
        f: { (x: boolean): string }; // 属性签名和对象类型字面量
     }
    interface C {
        f: (x: boolean) => string;   // 属性签名和函数类型字面量
     }
     可计算属性名          
    const f = 'f';
    interface A {
        [f](x: boolean): string;
    }
            
     重载方法
     interface A {
         f(): number;
         f(x: boolean): boolean;
         f(x: string, y: string): string;
     }
            
            

索引签名  -通过下标访问
	一个接口中最多只能定义一个数值索引签名(最终也会被转成字符串进行访问)
    一个接口中最多只能定义一个字符串索引签名
interface A {
     [prop: string]: number;
}
interface B {
     [prop: number]: number;
}

这样也是可以的，因为值都是Number,
interface A {
     [prop: string]: number;
     [prop: number]: 0 | 1;
}
```



```tsx
Interface 可选属性与方法

如果接口中定义了重载方法，那么所有重载方法签名必须同时为必选的或者可选的
// 正确
interface Foo {
    a(): void;
    a(x: boolean): boolean;
    b?(): void;
    b?(x: boolean): boolean;
}

interface A {
    readonly a: string;
    x:string;
    readonly [prop: string]: string;
    readonly [prop: number]: string;
}
x可以被修改，其他都是只读
```



```tsx
Interface继承  extends关键字
    接口
    类
    对象类型的类型别名
    对象类型的交叉类型

    
interface Style {
       name:string
       draw(): { color: string };
}
interface Shape {
   draw(): { x: number; y: number };
}
子接口中的同名成员必须兼容所有父接口中的类型
interface Circle extends Style, Shape {
   draw(): { color: string; x: number; y: number };//权重高，但必须与所有父接口中方法类型兼容
}

```







```tsx
Type 类型别名

type Numeric = number | bigint; 
// string | number | bigint
type StringOrNumber = string | Numeric;

1.以下场景中可以使用递归的类型别名
	1)若类型别名引用的类型为接口类型、对象类型字面量、函数类型字面量和构造函数类型字面量，
     则允许递归引用类型别名
     type T0 = { name: T0 };
	 type T1 = () => T1;
	 type T2 = new () => T2;
            
            
    2)若类型别名引用的是数组类型或元组类型，则允许在元素类型中递归地引用类型别名。
    type T0 = Array<T0>;
    type T1 = T1[];
    type T3 = [number, T3];
            
    3)若类型别名引用的是泛型类或泛型接口，则允许在类型参数中递归的引用类型别名
    interface A<T> {
      name: T;
    }
    type T0 = A<T0>;
    class B<T> {
        name: T | undefined;
    }
    type T1 = B<T1>;
            
            
```



```tsx
Interface与Type区别
1.Type能够表示非对象类型，而interface则只能表示对象类型。
	type NumericType = number | bigint;
2.interface可以继承其他的interface、class等对象类型，而type则不支持继承。
  但能继承object类型的type,
  如果类型别名表示非对象类型，则无法使用该方法。
    type Shape = { name: string };
    type Circle = Shape & { radius: number };
    function foo(circle: Circle) {
      const name = circle.name;
      const radius = circle.radius;
    }
3.Interface总是会显示在编译器的诊断信息（例如，错误提示和警告）和代码编辑器的智能提示信息中，而Type只在特定情况下才会显示出来
4.Interface有声明合并的行为，而类型别名则不会进行声明合并

    interface A {
        x: number;
    }
    interface A {
        y: number;
    }

    //合并为           
    interface A {
        x: number;
        y: number;
    }

            
	
```



## Class

```tsx
类名大写
与函数声明不同的是，类声明不会被提升，因此必须先声明后使用。
不允许声明同名的类

匿名类
const Circle = class {
     radius: number;
};
const Circle1 = class Child {
     radius: number;
};
const a = new Circle();
const b=new Child() // 错误，不能这么用，只能 new Circle1()
类表达式中定义了类名，则该类名只能够在类内部使用，在类外不允许引用该类名
TypeScript提供了“--strictPropertyInitialization”编译选项来帮助严格检查未经初始化的成员变量
class Circle {
    radius: number = 1;
    readonly b:number=2;
    a!:number  //断言，避免无初始值的检查
    area(): number {
        return Math.PI * this.radius * this.radius;
    }
}

如果一个类属性同时定义了get方法和set方法
那么get方法的返回值类型必须与set方法的参数类型一致
必须具有相同的可访问性
            

```

+ readonly 
+ static  只允许通过类名来访问。const v=Circle.version //通过class访问。
+ public  默认值， 可以在当前类的内部、外部以及派生类的内部访问
+ protected  类的受保护成员允许在当前类的内部和派生类的内部访问，但是不允许在当前类的外部访问。例如 const base=new Base() base.s //错误
+ private 仅当前内部使用，在当前类的外部以及派生类的内部都不允许访问
+ ES支持使用 #myVal 设置和访问私有字段。

```tsx
Class 寄存器 get set

class Circle {
    private _radius: number = 0;
    get radius(): number {
        return this._radius;
     }
    set radius(value: number) {
        if (value >= 0) {
            this._radius = value;
        }
    }
}

const circle = new Circle();
circle.radius; // 0
circle.radius = -1;
circle.radius; // 0
circle.radius = 10;
circle.radius; // 10
```



```tsx
构造函数 constructor
可以定义可选参数、默认值参数和剩余参数。不允许定义返回值类型
因为构造函数的返回值类型永远为类的实例类型。
可设置为private constructor(){},只能内部构件

可以重载

class A {
    constructor(x: number, y: number);
    constructor(s: string);
    constructor(xs: number | string, y?: number) {}
}
const a = new A(0, 0);
const b = new A('foo');


在构造函数参数列表中，为形式参数添加任何一个可访问性修饰符或者readonly修饰符，该形式参数就成了参数成员，进而会被声明为类的成员变量   
class A {
   constructor(
      public x: number,
      protected y: number,
      private z: number,
      readonly t: number
   ) {}
}
const a=new A(0,1,2,3)
a.x // 值为0

class B {
    constructor(readonly x: number) {}
}
```



```tsx
继承， 只能继承一个类,
但一个类可以继承多个interface，但必须实现interface里的所有成员。
interface Color {
   color: string;
}

interface Shape {
    area(): number;
}
 
class Circle implements Shape, Color {
   radius: number = 1;

   color: string = 'black';

   area(): number {
        return Math.PI * this.radius * this.radius;
     }
}
            
            

super是为了继承BaseClass的内部非私有成员，外部构造后访问是可以直接访问BaseClass的成员的。
class Shape {
    color: string = 'black';

    switchColor() {
          this.color =
          this.color === 'black' ? 'white' : 'black';
    }
}

class Circle extends Shape {
    switchColor() {
        super.switchColor();
        console.log(`Color is ${this.color}.`);
    }
}

const circle = new Circle();

circle.switchColor();
circle.switchColor(); 

// 打印：
// Color is white.
// Color is black.
            
在实例化派生类时的初始化顺序如下：
1）初始化基类的属性。
2）调用基类的构造函数。
3）初始化派生类的属性。
4）调用派生类的构造函数。


Interface继承一个Class，会继承基类中所有成员的类型
class A {
    x: string = ''; 
    y(): boolean {
        return true;
   }
}

interface B extends A {}
declare const b: B;

b.x;   // 类型为string
b.y(); // 类型为boolean

Interface不但会继承Class的公有成员类型，还会继承class的受保护成员类型和私有成员类型。
如果interface从class继承了非公有成员，那么该接口只能由class或class的子类来实现.

// 正确，A 可以实现接口 I，因为私有属性和受保护属性源自同一个类 A
class A implements I {
    private x: string = '';
    protected y: string = '';
} 
// 接口 I 能够继承 A 的私有属性和受保护属性
interface I extends A {}
// 正确，B 可以实现接口 I，因为私有属性和受保护属性源自同一个类 A
class B extends A implements I {}
// 错误！C 不是 A 的子类，无法实现 A 的有属性和受保护属性
class C implements I {}
            
            
```



抽象类和抽象成员

```tsx
抽象类和抽象成员 抽象类不能被实例化,作用是作为基类使用
抽象类可以继承其他抽象类
如果一个具体类继承了抽象类，那么在具体的派生类中必须实现抽象类基类中的所有抽象成员
 abstract class Base {
    abstract a: string;

   abstract get accessor(): string;
   abstract set accessor(value: string);

   abstract method(): boolean;
}

class Derived extends Base {
   // 实现抽象属性 a
   a: string = '';
   // 实现抽象存取器accessor
    private _accessor: string = '';
    get accessor(): string {
       return this._accessor;
   }
   set accessor(value: string) {
      this._accessor = value;
   }
   // 实现抽象方法 method
   method(): boolean {
       return true;
    }
}
            
            

```



```tsx
Class中的This类型
this可以链式调用，它们返回的是当前实例对象

this类型不允许应用于类的静态成员。

class Counter {
   private count: number = 0;
   public add(): this {
        this.count++;
      return this;
  }
   public subtract(): this {
        this.count--;
       return this;
   }

    public getResult(): number {
      return this.count;
  }
}
const counter = new Counter();
counter.add().add().subtract().getResult(); // 结果为1



B extends A, B中的this跨class使用后this会变成A
class A {
    foo(): this {
        return this;
    }
}

class B extends A {
    bar(): this {
        return this;
   }
}
const b = new B();
const x = b.bar().foo(); //类型为B
            


class Circle {
    radius: number;
   area(): number {
        return Math.PI * this.radius * this.radius;
    }
} 
 interface CircleType {
    radius: number;
   area(): number;
} 
13 // 正确
const a: Circle = new Circle();
16 // 正确
const b: CircleType = new Circle();
            
            
```





类型进阶

+ 带有类型参数的泛型

  具有块级作用域的局部类型

  常用的联合类型和交叉类型

  实用的索引类型、映射对象类型以及条件类型

  TypeScript内置的实用工具类型

  能够获取表达式类型的类型查询

  类型断言与类型细化。

```tsx
泛型
function identity<T>(arg: T): T {
   return arg;
}


//<T = U, U = boolean> // 错误
//<T = boolean, U = T> // 正确

类型约束，至少为约束的类型
interface Point {
    x: number;
    y: number;
}

function identity<T extends Point>(x: T): T {
    return x;
}

// 正确
identity({ x: 0, y: 0 });
identity({ x: 0, y: 0, z: 0 });

identity({ x: 0 });
//       ~~~~~~~~
//       编译错误！类型 '{ x: number; }' 不能赋值给类型 Point


泛型约束引用类型参数
//<T, U extends T>
//<T extends U, U>
//<T extends U>    // 类型参数T的基约束为类型参数U

    
function f3<T, U>(a: T[], f: (x: T) => U): U[] {
    return a.map(f);
}
 
const a: boolean[] = f3<number, boolean>([0, 1, 2], n => !!n);
            
如果没有必要用泛型的时候，最好不要用泛型。



泛型接口
interface MyArray<T> extends Array<T> {
    first: T | undefined;
    last: T | undefined;
}
            
泛型类型别名

type Container<T> = { value: T };
const a: Container<number> = { value: 0 };
const b: Container<string> = { value: 'b' };



泛型类
class Container<T> {
    constructor(private readonly data: T) {}
} 
const a = new Container<boolean>(true); 
const b = new Container<number>(0);
            
            
静态参数static不能使用 class的泛型T
interface A<T> {
    a: T;
} 
class Base<T> {
   b?: T;
} 
class Derived<T> extends Base<T> implements A<T> {
   constructor(public readonly a: T) {
      super();
    }
}
      
```



局部类型

+ 局部枚举类型
  局部类类型
  局部接口类型
  局部类型别名

```tsx
function f(x: boolean) {
   if (x) {
       interface T {
          x: number;
        }
 
        const v: T = { x: 0 };
 
     } else {
        interface T {
             x: string;
       }
 const v: T = { x: 'foo' };
    }
}
            
            
```



联合类型 |, 交叉类型 &

​	交叉类型的顺序会影响重载签名的解析顺序

```tsx
interface T0 {
    new (name: string): Date;
}
interface T1 {
   new (name: string): Error;
} 
type T = T0 | T1;
interface T0T1 {
    new (name: string): Date | Error;
}           
interface Circle {
    area: bigint;
}
interface Rectangle {
    area?: number;
} 
declare const s: Circle | Rectangle;
s.area; // bigint | number | undefined


交叉类型
interface Clickable {
 click(): void;
}
interface Focusable {
   focus(): void;
}
interface Scrollable {
   scroll(): void;
}
type T0 = (Clickable & Focusable) & Scrollable;
type T1 = Clickable & (Focusable & Scrollable);
            
```





```tsx
交叉类型属性

interface A {
     x: boolean;
     y?: string;
}
interface B {
    x?: boolean;
    y?: string;
}
//结果为
{
    x: boolean; //在“A & B”交叉类型中，属性x是必选属性，属性y是可选属性。
    y?: string;
}

索引签名

interface A {
     [prop: string]: string;
}
interface B {
    [prop: number]: string;
}
{
    [prop: string]: string;
    [prop: number]: string;
}

调用签名与构造签名
若交叉类型的成员类型中含有调用签名或构造签名，那么这些调用签名和构造签名将以成员类型的先后顺序合并到交叉类型中
```



Keyof

```tsx
索引类型  keyof是关键字
索引类型查询的结果是由字符串字面量类型构成的联合类型

interface Point {
    x: number;
    y: number;
}

type T = keyof Point; // 'x' | 'y'

索引类型查询的结果类型是联合类型“string | number |symbol”的子类型
interface T {
    [prop: string]: number;
}

// string | number
type KeyofT = keyof T;


interface T {
    0: boolean;
    a: string;
    b(): void;
}
// 0 | 'a' | 'b'
type KeyofT = keyof T;
它们的属性名分别为数字0、字符串“'a'”和字符串“'b'”。因此，KeyofT类型为联合类型“0 | 'a' | 'b'”


interface Boolean {
    valueOf(): boolean;
}
type KeyofT = keyof boolean; // 'valueOf'

联合类型
type A = { a: string; z: boolean };
type B = { b: string; z: boolean };
type KeyofT = keyof (A | B);  // 'z'

交叉类型
type A = { a: string; x: boolean };
type B = { b: string; y: number }; 
type KeyofT = keyof (A & B); // 'a' | 'x' | 'b' | 'y'
            
     
```







```tsx
索引访问类型

01 const s: unique symbol = Symbol();
02 
03 enum E {
04     A = 10,
05 }
06 
07 type T = {
       a:true
08     // 数字字面量属性名
09     0: string;
10 
11     // 字符串字面量属性名
12     x: boolean;
13 
14     // 枚举成员字面量属性名
15     [E.A]: number;
16 
17     // unique symbol
18     [s]: bigint;
19 };
20 type TypeOfNumberLikeName = T[a];     //boolean 
21 type TypeOfNumberLikeName = T[0];     // string
22 type TypeOfStringLikeName = T['x'];   // boolean
23 type TypeOfEnumName = T[E.A];         // number
24 type TypeOfSymbolName = T[typeof s];  // bigint
            
            
同名属性的类型拥有更高的优先级



索引类型的使用
function getProperty<T, K extends keyof T>(
   obj: T, key: K
 ): T[K] {
   return obj[key];
}

 interface Circle {
    kind: 'circle';
    radius: number;
 }

 function f(circle: Circle) {
     // 正确，能够推断出 radius 的类型为 'circle' 类型
    const kind = getProperty(circle, 'kind');

    // 正确，能够推断出 radius 的类型为 number 类型
     const radius = getProperty(circle, 'radius');
 
     // 错误
    const unknown = getProperty(circle, 'unknown');
    //                                   ~~~~~~~~~
     // 编译错误：'unknown'类型不能赋值给'kind' |'radius'
 }
            
            
```



## 映射对象类型 Keyof



```tsx
映射对象类型
symbol”，因为只有这些类型的值才能作为对象的键；P是类型变量，代表每次遍历出来的成员类型；T是任意类型，表示对象属性的类型，并且在类型T中允许使用类型变量P。

type K = 'x' | 'y';
type T = number;
type MappedObjectType = { readonly [P in K]?: T };


若当前遍历出来的类型成员P为数字字面量类型，则在结果对象类型中创建一个新的属性成员，属性名类型为该数字字面量类型且属性值类型为T
// { [x: number]: boolean }
type MappedObjectType = { [P in number]: boolean };
            
```



## Keyof应用 

```tsx
将映射对象类型、索引类型查询以及索引访问类型三者结合才能够最大限度地体现映射对象类型的威力。

type T = { a: string; b: number };
// { a: string; b: number; } 复制了一份类型给M
type M = { [P in keyof T]: T[P] };
            

实例
type T = { a: string; b: number };
// { a?: string; b?: number; }
type OptionalT = { [P in keyof T]?: T[P] };
            
            
```



同态映射对象类型==> 

​			映射后的对象类型结构与源对象类型T的结构完全一致

​			同态映射对象类型与源对象类型之间有着相同的属性集合。

```tsx
HMOT是同态映射对象类型，它将源对象类型T的所有属性映射到新的对象类型HMOT，同时保留了每个属性的修饰符
// 同态映射对象类型
type T = { a?: string; readonly b: number }; 
type HMOT = { [P in keyof T]: T[P] }; // { a?: string; readonly b: number; }

同态映射对象类型的一个重要性质是，新的对象类型会默认拷贝源对象类型中所有属性的readonly修饰符和“?”修饰符
非同态映射对象类型，那么新的对象类型不会拷贝源对象类型T中属性的readonly修饰符和“?”修饰符。


// 非同态映射对象类型
type T = { a?: string; readonly b: number };
type K = keyof T; 
type MOT = { [P in K]: T[P] }; // { a: string | undefined; b: number; }
```



添加和移除修饰符

```tsx
“+”修饰符，为映射属性添加“?”修饰符或readonly修饰符
“–”修饰符，为映射属性移除“?”修饰符或readonly修饰符
“+”修饰符和“–”修饰符应用在“?”修饰符和readonly修饰符之前

-? 移除可选   -readonly 移除readonly
{ -readonly [P in keyof T]-?: T[P] }
{ +readonly [P in keyof T]+?: T[P] }

若转换所有属性
type Required<T> = { [P in keyof T]-?: T[P] };


编译器在移除属性a的“?”修饰符时，同时会移除属性类型中的undefined类型，但是不会移除null类型，因此RequiredT类型中属性a的类型为“string | null”类型。


若T为原始类型，则不进行任何映射，同态映射对象类型“HMOT<T, X>”等于类型T。

type HMOT<T, X> = { [P in keyof T]: X };
type T = string;
type R = HMOT<T, boolean>  // <- 与boolean类型无关
       = string
```
