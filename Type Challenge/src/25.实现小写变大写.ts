/* 
Implement myCapitalize<T> which converts the first letter of a string to uppercase and leave the rest as-is.
*/

type capitalized = myCapitalize<'hello world'> // expected to be 'Hello world'

type myCapitalize<S extends string> = S extends `${infer L}${infer R}` ? `${Uppercase<L>}${R}` : S
