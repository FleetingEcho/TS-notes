namespace TrimRight{

    type TrimRight<S extends string> = S extends `${infer S} `|`${infer S}\n\t`? TrimRight<S>: S

    type Trimed = TrimRight<'   Hello World    '> // expected to be '   Hello World'

}
