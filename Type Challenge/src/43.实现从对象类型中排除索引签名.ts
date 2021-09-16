namespace RemoveIndexSignature {
	type Foo = {
		[key: string]: any
		foo(): void
	}

	type A = RemoveIndexSignature<Foo> // expected { foo(): void }

	// ===========
	type IsKey<K> = string extends K ? never : number extends K ? never : K
	type RemoveIndexSignature<T> = { [K in keyof T as IsKey<K>]: T[K] }
}
