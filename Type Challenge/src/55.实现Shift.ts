type Result = Shift<[3, 2, 1]> // [2, 1]

// your answers
type Shift<T extends any[]> = T extends [infer _, ...infer R] ? R : never
