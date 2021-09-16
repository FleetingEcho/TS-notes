/* 
In this challenge, you would need to write a type that takes an array and emitted the flatten array type.
*/

type flatten = Flatten<[1, 2, [3, 4], [[[5]]]]> // [1, 2, 3, 4, 5]

//

type Flatten<T extends Array<any>> = T['length'] extends 0
	? T
	: T extends [infer K, ...infer R]
	? K extends Array<any>
		? [...Flatten<K>, ...Flatten<R>]
		: [K, ...Flatten<R>]
	: never

// type Flatten<T> = T extends any[] ? (T extends [f: infer A, ...rest: infer R] ? [...Flatten<A>, ...Flatten<R>] : []) : [T]
