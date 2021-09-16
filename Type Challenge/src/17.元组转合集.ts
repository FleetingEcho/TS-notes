/* 
实现泛型TupleToUnion<T>，它覆盖元组的值与其值联合。
*/
type Arr = ['1', '2', '3']

let a: TupleToUnion<Arr> // expected to be '1' | '2' | '3'

// ===============
type TupleToUnion<T> = T extends unknown[] ? T[number] : never
