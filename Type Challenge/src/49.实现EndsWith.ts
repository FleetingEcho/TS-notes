/* 
Implement EndsWith<T, U> which takes two exact string types and returns whether T ends with U
 */
type aEnd = EndsWith<'abc', 'ac'> // expected to be false
type bEnd = EndsWith<'abc', 'bc'> // expected to be true

// =========
type EndsWith<T extends string, U extends string> = T extends `${infer _}${U}` ? true : false
