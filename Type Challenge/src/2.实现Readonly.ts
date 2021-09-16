/* 
该 Readonly 会接收一个 泛型参数，并返回一个完全一样的类型，只是所有属性都会被 readonly 所修饰。
*/
interface Todo {
	title: string
	description: string
}

const todo: MyReadonly<Todo> = {
	title: 'Hey',
	description: 'foobar',
}

// todo.title = 'Hello' // Error: cannot reassign a readonly property
// todo.description = 'barFoo' // Error: cannot reassign a readonly property

// =================================
export type MyReadonly<T> = {
	readonly [K in keyof T]: T[K]
}
