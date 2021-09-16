type Butterfly = DropChar<' b u t t e r f l y ! ', ' '> // 'butterfly!'
// ans

type DropChar<S, C extends string> = S extends `${infer H}${C}${infer T}` ? DropChar<`${H}${T}`, C> : S
