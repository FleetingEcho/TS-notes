namespace Chunk{
    type Chunk<T extends any[],C extends number,S extends any[] = []> =
        S['length'] extends C?
            [S,...Chunk<T,C>]
            : T extends [infer F,...infer R]?
                Chunk<R,C,[...S,F]>
                : S['length'] extends 0? []: [S]

    type exp1 = Chunk<[1, 2, 3], 2> // expected to be [[1, 2], [3]]
    type exp2 = Chunk<[1, 2, 3], 4> // expected to be [[1, 2, 3]]
    type exp3 = Chunk<[1, 2, 3], 1> // expected to be [[1], [2], [3]]
}
