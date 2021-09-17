namespace TupleToObject {
	type a = TupleToNestedObject<['a'], string> // {a: string}
	type b = TupleToNestedObject<['a', 'b'], number> // {a: {b: number}}
	type c = TupleToNestedObject<[], boolean> // boolean. if the tuple is empty, just return the U type

	// =========
	type TupleToNestedObject<T, U> = T extends [infer L, ...infer R]
		? L extends string
			? {
					[key in L]: TupleToNestedObject<R, U>
			  }
			: never
		: U
}
