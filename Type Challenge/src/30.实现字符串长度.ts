/* 
Compute the length of a string literal, which behaves like String#length.

*/
// your answers
type LengthOfString<S extends string, R extends any[] = []> = S extends '' ? R['length'] : S extends `${infer A}${infer B}` ? LengthOfString<B, [A, ...R]> : R

// 放到arr里，最后返回length.
let str: LengthOfString<'jakeOttawa', []>
