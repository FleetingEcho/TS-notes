/* 
Implement a type IsUnion, which takes an input type T and returns whether T resolves to a union type.
*/

type case1 = IsUnion<string> // false
type case2 = IsUnion<string | number> // true  Union type
type case3 = IsUnion<[string | number]> // false

// T extends T(例如A|B|C) 即如 JS 中的 for (const val of ['A', 'B', 'C']) { console.log(val) }
// 所以上面有了<T, B = T>这种情况。在T extends T遍历时，每次T都是遍历到的值，而又想拿到数据源，直接通过B来。
type IsUnion<T, B = T> = T extends T ? ([Exclude<B, T>] extends [never] ? false : true) : never
// type IsUnion2<T, U = T> = T extends U ? ([T, U] extends [U, T] ? false : true) : never
// type IsUnion3<T, U = T> = T extends T ? (U | T extends U & T ? false : true) : never
