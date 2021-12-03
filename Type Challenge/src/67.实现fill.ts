namespace Fill{
    type exp = Fill<[1, 2, 3], 0> // expected to be [0, 0, 0]

    type Fill<
        T extends unknown[],
        N,
        Start extends number = 0,
        End extends number = T['length'],
        CurrentIndex extends any[] = [],
        InRange = false
        > = T extends [infer First, ...infer Rest]
        ? End extends CurrentIndex['length']
            ? T
            : Start extends CurrentIndex['length']
                ? [N, ...Fill<Rest, N, Start, End, [...CurrentIndex, 1], true>]
                : InRange extends true
                    ? [N, ...Fill<Rest, N, Start, End, [...CurrentIndex, 1], true>]
                    : [First, ...Fill<Rest, N, Start, End, [...CurrentIndex, 1]>]
        : []

}
