type Flipped = FlipArguments<(arg0: string, arg1: number, arg2: boolean) => void>
// (arg0: boolean, arg1: number, arg2: string) => void

type Reverse<T extends any[]> = T extends [infer L, ...infer R] ? [...Reverse<R>, L] : T
type FlipArguments<T> = T extends (...args: infer Args) => infer R ? (...args: Reverse<Args>) => R : never
