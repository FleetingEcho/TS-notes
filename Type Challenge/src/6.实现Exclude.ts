/* 
实现内置的Exclude <T，U>
从T中排除可分配给U的那些类型
*/

type myExclude<T, U> = T extends U ? never : T
