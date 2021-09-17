interface Model {
	name: string
	age: number
	locations: string[] | null
}
type modelEntries = ObjectEntries<Model> // ['name', string] | ['age', number] | ['locations', string[] | null];

type ObjectEntries<T, K = Required<T>> = {
	[P in keyof K]: [P, K[P]]
}[keyof K]
