/* 
Implement a generic PartialByKeys<T, K> which takes two type argument T and K.
K specify the set of properties of T that should set to be optional. 
When K is not provided, it should make all properties optional just like the normal Partial<T>.

*/
interface User {
	name: string
	age: number
	address: string
}

type UserPartialName = PartialByKeys<User, 'name'> // { name?:string; age:number; address:string }

// ===
type Copy<T> = {
	[K in keyof T]: T[K]
}
type PartialByKeys<T, K extends keyof any = keyof T> = Copy<Partial<Pick<T, Extract<keyof T, K>>> & Omit<T, K>>
