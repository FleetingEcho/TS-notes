/* 
for-bar-baz -> forBarBaz
*/

let str: CamelCase<'for-bar-baz'>
type CamelCase<S extends string> = S extends `${infer F}${infer R}`
	? F extends '-'
		? Capitalize<R> extends R
			? `${F}${CamelCase<R>}`
			: CamelCase<Capitalize<R>>
		: `${F}${CamelCase<R>}`
	: S
