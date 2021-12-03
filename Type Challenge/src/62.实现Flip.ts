namespace Flip{

    type Flip<T> = {
        [
        Key in keyof T as
            T[Key] extends symbol | string | number
                ? T[Key]
                : T[Key] extends true
                    ? 'true'
                    : T[Key] extends false
                        ? 'false'
                        : never
        ]: Key
    }


    type a =Flip<{ a: "x", b: "y", c: "z" }>; // {x: 'a', y: 'b', z: 'c'}
    type b=Flip<{ a: 1, b: 2, c: 3 }>; // {1: 'a', 2: 'b', 3: 'c'}
    type c= Flip<{ a: false, b: true }>; // {false: 'a', true: 'b'}
}
