namespace KeyOfUse {
	const COLORS = {
		red1: 'red',
		blue: 'blue',
	}

	// 首先通过typeof操作符获取color变量的类型，然后通过keyof操作符获取该类型的所有键，
	type Colors = keyof typeof COLORS
	let color: Colors
	color = 'red1' // Ok
	color = 'blue' // Ok

	// Type '"yellow"' is not assignable to type '"red" | "blue"'.
	// color = 'yellow'// Error
	interface Person {
		name: string
		age: number
		location: string
	}

	type K1 = keyof Person // "name" | "age" | "location"
	type K2 = keyof Person[] // number | "length" | "push" | "concat" | ...
	type K3 = keyof { [x: string]: Person } // string | number

	interface StringIndexArray {
		[index: string]: string
	}

	interface NumberIndexArray {
		[index: number]: string
	}

	type K11 = keyof StringIndexArray // type K11 = string | number
	type K22 = keyof NumberIndexArray // type K22 = number
}

namespace UnionTrains {
	namespace InterfaceKeyVal {
		// Q1获取 值的Union Type
		const BayIDList = {
			Bay1: 'Bay1-ID',
			Bay2: 'Bay2-ID',
			Bay3: 'Bay3-ID',
			Bay4: 'Bay4-ID',
			Bay5: 'Bay5-ID',
		} as const

		type Values = typeof BayIDList[keyof typeof BayIDList] // "Bay1-ID" | "Bay2-ID" | "Bay3-ID" | "Bay4-ID" | "Bay5-ID"
		type Keys = keyof typeof BayIDList //  "Bay1" | "Bay2" | "Bay3" | "Bay4" | "Bay5"

		// Q2
		interface Todo {
			id: number
			text: string
			due: Date
		}
		type TodoKeys = keyof Todo // "id" | "text" | "due"
		type TodoValues = Todo[keyof Todo] //  string | number | Date

		//Q3
		const data = {
			a: ['x', 'y', 'z'],
			b: [1, 2, 3],
			c: 100,
		} as const
		// 要求获取上述对象值中的数组元素的类型
		// type TElement = "x" | "y" | "z" | 3 | 1 | 2

		type TElement = GetValueElementType<typeof data>

		// 实现1：通过 extends 判断对象的值类型，通过数组下标获取元素类型
		type GetValueElementType<T> = { [K in keyof T]: T[K] extends ReadonlyArray<any> ? T[K][number] : never }[keyof T]

		// 实现2：通过 extends 判断对象的值类型，通过 infer 推断，获取数组元素类型
		// type GetValueElementType<T> = { [K in keyof T]: T[K] extends ReadonlyArray<infer E> ? E : never }[keyof T]
	}
}
