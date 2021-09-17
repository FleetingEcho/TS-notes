type result = Split<'a,b,c', ','> // ['a', 'b', 'c']
type result1 = Split<'a,b,', ''> // ['a', ',', 'b', ',']
type result2 = Split<',a,b', ''> // [',' ,'a', ',', 'b']
type result3 = Split<'a', ','> // ['a']
type result4 = Split<'', ','> // []
type result5 = Split<'Hi! How are you?', ' '> // ['Hi!', 'How', 'are', 'you?']

//answer

type Split<T extends string, S extends string> = T extends `${infer X}${S}${infer Y}` ? [X, ...Split<Y, S>] : T extends '' ? [] : [T]
