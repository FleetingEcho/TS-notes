/* 
在类型系统中实现 JavaScript Array.concat 函数。

一个类型接受两个参数。 输出应该是一个新数组，其中包含按 ltr 顺序的输入
*/
type Result = Concat<[1], [2]> // expected to be [1, 2]

// ===============

type Concat<T extends any[], R extends any[]> = [...T, ...R]
