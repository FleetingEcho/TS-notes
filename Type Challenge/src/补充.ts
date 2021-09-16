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
