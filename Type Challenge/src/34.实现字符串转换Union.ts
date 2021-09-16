/* 
Implement the String to Union type. Type take string argument. The output should be a union of input letters
*/
namespace TypeStringToUnion {
	type Test = '123'
	type Result = StringToUnion<Test> // expected to be "1" | "2" | "3"

	// your answers
	type StringToUnion<S extends string> = S extends `${infer P}${infer L}` ? P | StringToUnion<L> : never
}
