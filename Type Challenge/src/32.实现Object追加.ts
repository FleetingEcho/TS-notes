/* 
Implement a type that adds a new field to the interface. The type takes the three arguments. The output should be an object with the new field

*/
type Test = { id: '1' }
type Result = AppendToObject<Test, 'value', 4> // expected to be { id: '1', value: 4 }

// type AppendToObject<T extends object, K extends string, V extends any> = T & { [key in K]: V }

type AppendToObject<T, U extends string, V> = { [a in keyof T | U]: a extends keyof T ? T[a] : V }
