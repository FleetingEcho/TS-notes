type Zero = MinusOne<1> // 0
type FiftyFour = MinusOne<55> // 54

// `${K['length']}`  important
// use `${K['length']}` extends T instead of T extends `${K['length']}`
type DigitalToArray<T extends string, K extends any[] = []> = `${K['length']}` extends T ? K : DigitalToArray<T, [...K, 1]>

type TimesTen<T extends any[] = []> = [...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T]

type StringToArray<T extends string, K extends any[] = []> = T extends `${infer L}${infer R}` ? StringToArray<R, [...TimesTen<K>, ...DigitalToArray<L>]> : K

type MinusOne<T extends number> = StringToArray<`${T}`> extends [infer F, ...infer R] ? R['length'] : never
