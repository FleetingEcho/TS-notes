namespace ReverseType {
	type a = Reverse<['a', 'b']> // ['b', 'a']
	type b = Reverse<['a', 'b', 'c']> // ['c', 'b', 'a']

	// =========
	type Reverse<T> = T extends [infer L, ...infer R] ? [...Reverse<R>, L] : []
}
