/* 
Merge two types into a new type. Keys of the second type overrides keys of the first type.
 */

type A = {
	name: string
	color: string
}
type B = {
	name: number
	color: number
}

let MergedVal: Merge<A, B>

// type Merge<A, B> = {
// 	[K in keyof A | keyof B]: K extends keyof B ? B[K] : K extends keyof A ? A[K] : never
// }

type ToObject<T> = {
	[P in keyof T]: T[P]
} //it is able to convert Intersection Type just like { a: string } & { b: number } to Object Type like { a: string; b: number }
type BaseMerge<A, B> = { [key in Exclude<keyof A, keyof B>]: A[key] } & B
type Merge<A, B> = ToObject<BaseMerge<A, B>>
