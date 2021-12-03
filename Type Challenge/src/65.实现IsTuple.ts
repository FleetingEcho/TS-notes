namespace IsTuple{
    type IsTuple<T extends any> = T extends readonly any[]
        ? number extends T["length"]
            ? false
            : true
        : false;


    type case1 = IsTuple<[number]> // true
    type case2 = IsTuple<readonly [number]> // true
    type case3 = IsTuple<number[]> // false
}
