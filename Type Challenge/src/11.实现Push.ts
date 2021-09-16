/* 
Implement the generic version of Array.push
 */
namespace TypePush {
	type Result = Push<[1, 2], '3'> // [1, 2, '3']

	// ===================
	type Push<T extends any[], R> = [...T, R]
}
