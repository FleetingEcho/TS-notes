namespace Zip{
    type Zip<T extends any[], U extends any[], Z extends any[] = []> =
        T extends [first: infer T1, ...rest: infer TRest] ?
            U extends [first: infer U1, ...rest: infer URest] ?
                Zip<TRest, URest, [...Z, [T1, U1]]>
                : Z : Z

    type exp = Zip<[1, 2], [true, false]> // expected to be [[1, true], [2, false]]

}
