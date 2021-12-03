namespace FlattenDepth{
    type FlattenOnce<T> = T extends [infer A, ...infer B] ? A extends any[] ? [...A, ...FlattenOnce<B>] : [A, ...FlattenOnce<B>] : T
    type FlattenDepth<T, D = 1, U extends any[] = []> = FlattenOnce<T> extends T
        ? T
        : U['length'] extends D ? T : FlattenDepth<FlattenOnce<T>, D, [...U, unknown]>

    //use
    type a = FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2> // [1, 2, 3, 4, [5]]. flattern 2 times
    type b = FlattenDepth<[1, 2, [3, 4], [[[5]]]]> // [1, 2, 3, 4, [[5]]]. Depth defaults to be 1
}
