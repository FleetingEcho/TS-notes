/* 
实现一个utils If，它接受条件C、truthy返回类型T和falsy返回类型F。C预期为true或false，而T和F可以是任何类型。
*/
type A = If<true, 'a', 'b'> // expected to be 'a'
type B = If<false, 'a', 'b'> // expected to be 'b'

// ==================
type If<T, U, R> = T extends boolean ? (T extends true ? U : R) : never
