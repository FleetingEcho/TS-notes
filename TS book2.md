```ts
只在必要时使用分号;
最少的使用any，可以用unknown替代未知的类型
尽量使用展开操作符  ... , 保持数据结构不可变
尽量用TS的来推导类型，不要滥用显式类型， 让类型错误暴露出来；
保证代码简洁，增加安全
保证代码的可用性和普适性
没有特殊原因，不要把数字显式的注解为number， number最大值2**53
可以显式声明 unique symbol,只能够const   const e: unique symbol= Symbol('f')

索引签名  [key:T]:U 句法就是索引签名， T的类型只能是number / string
```

![image-20210821175736344](C:\Users\dev2j\AppData\Roaming\Typora\typora-user-images\image-20210821175736344.png)



```tsx
Unkown类型可以进行比较，但不能进行更改，
Typescript中声明对象类型有四种方式：

1.对象字面量表示法（例如{a:string}），也称对象的结构。如果知道对象有哪些字段，或者对象的值都为相同的类型，使用这种方式。
2.空对象字面量表示法（{}）。尽量避免使用这种方式。
3.object类型。如果需要一个对象，但对对象的字段没有要求，使用这种方式。
4.0bject类型。尽量避免使用这种方式。
坚持使用第一种和第三种


声明只读的数组和元组
type A =readonly string[]//readonly string[]
type B=ReadonlyArray<string>//readonly string[]
type C=Readonly<string[]>//readonly string[]
type D=readonly [number,string]//readonly [number,string]typeE=Readonly<[number,string]>//readonly [number,string]

nul1缺少值
undefined尚未赋值的变量
void没有return语句的函数
never永不返回的函数

```







```ts
避免使用arguments，类型不安全， 而建议使用 ...args 剩余参数保证类型安全
function temp(msg:string,...args:number[]):number{
    return args[0]
}
一个函数最多只能有一个剩余参数，而且必须位于参数列表的最后。
如果函数使用this，请在函数的第一个参数中声明this的类型（放在其他参数之前）
function fancyDate(this: Date){return ${ this. getDate()}/${ this. getMonth()}/${ this. getFullYear()}
```

