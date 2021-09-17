namespace RequiredByKeys {
	interface User {
		name?: string
		age?: number
		address?: string
	}

	type UserPartialName = RequiredByKeys<User, 'name'> // { name: string; age?: number; address?: string }

	// ========
	type Merge<A, B> = Pick<A & B, keyof A | keyof B>
	type RequiredByKeys<T, K = keyof T> = Merge<Required<Pick<T, K & keyof T>>, Omit<T, K & keyof T>>
}
