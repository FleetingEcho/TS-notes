/* 
不使用 Omit 实现 TypeScript 的 Omit<T, K> 范型。
Omit 会创建一个省略 K 中字段的 T 对象。

*/

interface Todo {
	title: string
	description: string
	completed: boolean
}

type TodoPreview = MyOmit<Todo, 'description' | 'title'>

const todo: TodoPreview = {
	completed: false,
}

type MyOmit<T, K> = {
	[key in Exclude<keyof T, K>]: T[key]
}
