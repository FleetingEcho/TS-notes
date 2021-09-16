/* 
从类型 T 中选择出属性 K，构造成一个新的类型。
*/
interface Todo {
	title: string
	description: string
	completed: boolean
}

type TodoPreview = MyPick<Todo, 'title' | 'completed'>

const todo: TodoPreview = {
	title: 'Clean room',
	completed: false,
}

//===============
type MyPick<T, U extends keyof T> = {
	[K in U]: T[K]
}
