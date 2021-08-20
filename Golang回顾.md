​ Golang 回顾

简单类型

```go
空值：nil
整型类型： int(取决于操作系统), int8, int16, int32, int64, uint8, uint16, …
浮点数类型：float32, float64
字节类型：byte (等价于uint8)
字符串类型：string
布尔值类型：boolean，(true 或 false)
```

中文占 3 个 byte, 英文一个。

```tsx
查看变量类型
reflect.TypeOf().Kind()


str2 := "Go语言"
因为字符串是以 byte 数组的形式存储的，所以，str2[2] 的值并不等于语。str2 的长度 len(str2) 也不是 4，而是 8（ Go 占 2 byte，语言占 6 byte）。



正确的处理方式是将 string 转为 rune 数组
str2 := "Go语言"
runeArr := []rune(str2)
fmt.Println(reflect.TypeOf(runeArr[2]).Kind()) // int32
fmt.Println(runeArr[2], string(runeArr[2]))    // 35821 语
fmt.Println("len(runeArr)：", len(runeArr))    // len(runeArr)： 4


转换成 []rune 类型后，字符串中的每个字符，无论占多少个字节都用 int32 来表示，因而可以正确处理中文。

```

```go
切片使用数组作为底层结构。切片包含三个组件：容量，长度和指向底层数组的指针,切片可以随时进行扩展
sub2... 是切片解构的写法，将切片解构为 N 个独立的元素。


// 仅声明
m1 := make(map[string]int)
// 声明时初始化
m2 := map[string]string{
	"Sam": "Male",
	"Alice": "Female",
}
// 赋值/修改
m1["Tom"] = 18

str := "Golang"
var p *string = &str // p 是指向 str 的指针
*p = "Hello"
fmt.Println(str) // Hello 修改了 p，str 的值也发生了改变
```

```go
指针
一般来说，指针通常在函数传递参数，或者给某个类型定义新的方法时使用。Go 语言中，参数是按值传递的，如果不使用指针，函数内部将会拷贝一份参数的副本，对参数的修改并不会影响到外部变量的值。如果参数使用指针，对参数的传递将会影响到外部变量。



switch
和其他语言不同的地方在于，Go 语言的 switch 不需要 break，匹配到某个 case，执行完该 case 定义的行为后，默认不会继续往下执行。如果需要继续往下执行，需要使用 fallthrough，
```

```go
可以通过 errorw.New 返回自定义的错误

func hello(name string) error {
	if len(name) == 0 {
		return errors.New("error: name is null")
	}
	fmt.Println("Hello,", name)
	return nil
}

func main() {
	if err := hello(""); err != nil {
		fmt.Println(err)
	}
}
// error: name is null

```

```go
error 往往是能预知的错误，但是也可能出现一些不可预知的错误，例如数组越界，这种错误可能会导致程序非正常退出，在 Go 语言中称之为 panic。


func get(index int) (ret int) {
	defer func() {
		if r := recover(); r != nil {
			fmt.Println("Some error happened!", r)
			ret = -1 //在这里也可以不处理返回值，如果不处理返回值，返回值将被置为默认值 0。
      return
		}
	}()
	arr := [3]int{2, 3, 4}
	return arr[index]
}

func main() {
	fmt.Println(get(5))
	fmt.Println("finished")
}

```

```go
实例化一个struct
type Student struct {
	name string
	age  int
}

方式一
stu := &Student{
		name: "Tom",
	}

方式二

stu2 := new(Student)
```

```go
Interface

一般而言，接口定义了一组方法的集合，接口不能被实例化，一个类型可以实现多个接口。
并不需要显式地声明实现了哪一个接口，只需要直接实现该接口对应的方法即可。


如何确保某个类型实现了某个接口的所有方法呢？
Person 是一个interface, Student是一个struct
var _ Person = (*Student)(nil)
var _ Person = (*Worker)(nil)


将空值 nil 转换为 *Student 类型，再转换为 Person 接口，如果转换失败，说明 Student 并没有实现 Person 接口的所有方法。




实例可以强制类型转换为接口，接口也可以强制类型转换为实例。
func main() {
	var p Person = &Student{
		name: "Tom",
		age:  18,
	}

	stu := p.(*Student) // 接口转为实例
	fmt.Println(stu.getAge())
}

```

```go
空接口

如果定义了一个没有任何方法的空接口，那么这个接口可以表示任意类型
func main() {
	m := make(map[string]interface{})
	m["name"] = "Tom"
	m["age"] = 18
	m["scores"] = [3]int{98, 99, 85}
	fmt.Println(m) // map[age:18 name:Tom scores:[98 99 85]]
}

```

并发编程

```go

Go 语言提供了 sync 和 channel 两种方式支持协程(goroutine)的并发。
例如我们希望并发下载 N 个资源，多个并发协程之间不需要通信，那么就可以使用 sync.WaitGroup，等待所有并发协程执行结束。

 sync方式
import (
	"fmt"
	"sync"
	"time"
)

var wg sync.WaitGroup

func download(url string) {
	fmt.Println("start to download", url)
	time.Sleep(time.Second) // 模拟耗时操作
	wg.Done()
}

func main() {
	for i := 0; i < 3; i++ {
		wg.Add(1)
		go download("a.com/" + string(i+'0'))
	}
	wg.Wait()
	fmt.Println("Done!")
}

wg.Add(1)：为 wg 添加一个计数，wg.Done()，减去一个计数。
go download()：启动新的协程并发执行 download 函数。
wg.Wait()：等待所有的协程执行结束。


channel方式

var ch = make(chan string, 10) // 创建大小为 10 的缓冲信道

func download(url string) {
	fmt.Println("start to download", url)
	time.Sleep(time.Second)
	ch <- url // 将 url 发送给信道
}

func main() {
	for i := 0; i < 3; i++ {
		go download("a.com/" + string(i+'0'))
	}
	for i := 0; i < 3; i++ {
		msg := <-ch // 等待信道返回消息。
		fmt.Println("finish", msg)
	}
	fmt.Println("Done!")
}

```

```go
单元测试(unit test)
假设我们希望测试 package main 下 calc.go 中的函数，要只需要新建 calc_test.go 文件，在calc_test.go中新建测试用例即可。

// calc.go
package main

func add(num1 int, num2 int) int {
	return num1 + num2
}

// calc_test.go
package main

import "testing"

func TestAdd(t *testing.T) {
	if ans := add(1, 2); ans != 3 {
		t.Error("add(1, 2) should be equal to 3")
	}
}

运行 go test，将自动运行当前 package 下的所有测试用例，如果需要查看详细的信息，可以添加-v参数。

```

```go
值引用是复制结构体，开辟一块新的内存空间
例如 a:=b,这样修改a.name=“ls”,不会影响到b.name


指针引用是指向结构体内存地址的引用，同一块内存空间
例如 a:=&b ,这样修改a.name=“ls”,会影响到b.name


指针结构体
var person *Person= &Person{}

var person *Person= new(Person)

空结构体 struct{} 实例不占据任何的内存空间。

```

```go
run一个有依赖的文件
例如package main 两个文件中有单独的方法，跨包访问

go run main.go calc.go
Go 语言也有 Public 和 Private 的概念，粒度是包。如果类型/接口/方法/函数/字段的首字母大写，则是 Public 的，对其他 package 可见，如果首字母小写，则是 Private 的，对其他 package 不可见
```

```go
先用go mod init JakeTemp ， 生成了go.mod

然后写自己的代码，
运行 go run .    将会自动触发第三方包的下载，，具体的版本信息也记录在了go.mod中

```
