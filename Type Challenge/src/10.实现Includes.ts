/* 
在类型系统中实现 JavaScript Array.includes 函数。 一个类型接受两个参数。 
输出应该是布尔值 true 或 false。
*/
type isPillarMen = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'>
// expected to be `false`

type Includes<T extends any[], R> = R extends T[number] ? true : false
