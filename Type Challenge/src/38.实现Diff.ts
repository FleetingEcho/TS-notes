/* 
Get an Object that is the difference between O & O1
*/
type Diff<O, O1> = Omit<O & O1, keyof (O | O1)> // Omit<全部， 共有的>

// 在对象中使用交、并集

type Foo = {
	name: string
	age: string
}
type Bar = {
	name: string
	age: string
	gender: number
}

type result = keyof (Foo | Bar) // "name" | "age"

// ============
interface Colorful {
	color: string
}
interface Circle {
	radius: number
}

type ColorfulCircle = keyof (Colorful & Circle) // "color" | "radius"
