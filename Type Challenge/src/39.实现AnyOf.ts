type Sample1 = AnyOf<[1, '', false, [], {}]> // expected to be true.
type Sample2 = AnyOf<[0, '', false, [], {}]> // expected to be false.

type AnyOf<T extends readonly any[]> = T[number] extends infer Falsy | {} ? (Exclude<Falsy, 0 | '' | [] | false> extends never ? false : true) : false

// =====type 2
// type Falsy = 0 | [] | '' | false | { [P in any]: never }

// type AnyOf<T extends readonly any[]> = T extends [infer First, ...infer Rest] ? (First extends Falsy ? AnyOf<Rest> : true) : false
