namespace Flatten {
	type a = FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2> // [1, 2, 3, 4, [5]]. flattern 2 times
	type b = FlattenDepth<[1, 2, [3, 4], [[[5]]]]> // [1, 2, 3, 4, [[5]]]. Depth defaults to be 1

	type FlattenDepth<T extends any[], C extends number = 1, U extends any[] = []> = T extends [infer L, ...infer R]
		? L extends any[]
			? U['length'] extends C
				? [L, ...FlattenDepth<R, C, U>] //数组
				: [...FlattenDepth<L, C, [0, ...U]>, ...FlattenDepth<R, C, U>]
			: [L, ...FlattenDepth<R, C, U>]
		: T
}
