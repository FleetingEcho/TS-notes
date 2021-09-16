/* 
Implement Trim<T> which takes an exact string type and returns a new string with the whitespace from both ends removed.

*/

namespace TypeTrim {
	type trimed = Trim<'  Hello World  '> // expected to be 'Hello World'

	type TrimLeft<S extends string> = S extends `${' ' | '\t' | '\n'}${infer R}` ? TrimLeft<R> : S
	type TrimRight<S extends string> = S extends `${infer R}${' ' | '\n' | '\t'}` ? TrimRight<R> : S
	type Trim<S extends string> = TrimRight<TrimLeft<S>>
}
