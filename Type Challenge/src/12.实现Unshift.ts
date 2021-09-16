/* 
Implement the type version of Array.unshift
*/
namespace TypeUnshift {
	type Result = Unshift<[1, 2], 0> // [0, 1, 2,]
	// ================
	type Unshift<T extends any[], R> = [R, ...T]
}
