/* 
FooBarBaz -> for-bar-baz
*/

type KebabCase<S extends string> = S extends `${infer Start}${infer End}`
	? End extends Uncapitalize<End> //自定义
		? Uncapitalize<`${Start}${KebabCase<End>}`>
		: Uncapitalize<`${Start}-${KebabCase<End>}`>
	: S

let a: KebabCase<'FooBarBaz'>
