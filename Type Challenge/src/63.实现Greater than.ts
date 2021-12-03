namespace GreaterThanWrapper {
	type Tuple<T extends number, U extends any[] = []> = U['length'] extends T
		? U
		: Tuple<T, [...U, 1]>
	type GreaterThan<T extends number, U extends number> = keyof Tuple<T> extends keyof Tuple<U>
		? false
		: true

	type a = GreaterThan<2, 1> //should be true
	type b = GreaterThan<1, 1> //should be false
	type C = keyof [1] extends keyof [1, 1, 1] ? true : false
}
