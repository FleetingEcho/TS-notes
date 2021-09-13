# Go42 Notes

## 第一章 Go Install

https://go.dev/

![image-20210912134554568](go 语言 四十二章经.assets/image-20210912134554568.png)

## 第二章 数据类型

```go
1.基本数据类型
+ 1.基本类 bool, string ,int,float64,float32
+ 2.派生类
      指针类型（Pointer）
      数组类型
      结构类型(struct)
      Channel 类型
      函数类型
      切片类型
      接口类型（interface）
      Map 类型


2.数字类型

Go 也有基于架构的类型，例如：int、uint 和 uintptr，这些类型的长度都是根据运行程序所在的操作系统类型所决定的。

+
| 类型   | 符号   | 长度范围                                               |
| :----- | :----- | :----------------------------------------------------- |
| uint8  | 无符号 | 8位整型 (0 到 255)                                     |
| uint16 | 无符号 | 16位整型 (0 到 65535)                                  |
| uint32 | 无符号 | 32位整型 (0 到 4294967295)                             |
| uint64 | 无符号 | 64位整型 (0 到 18446744073709551615)                   |
| int8   | 有符号 | 8位整型 (-128 到 127)                                  |
| int16  | 有符号 | 16位整型 (-32768 到 32767)                             |
| int32  | 有符号 | 32位整型 (-2147483648 到 2147483647)                   |
| int64  | 有符号 | 64位整型 (-9223372036854775808 到 9223372036854775807) |

 浮点型：
| 类型    | 长度                    |
| :------ | :---------------------- |
| float32 | IEEE-754   32位浮点型数 |
| float64 | IEEE-754   64位浮点型数 |

 其他数字类型：
      byte	类似 uint8
      rune	类似 int32
      uint32	或 64 位
      int	与 uint 一样大小
      uintptr	无符号整型，用于存放一个指针

字符串
字符串转int

string转int：    int, err := strconv.Atoi(string)
string转int64：  int64, err := strconv.ParseInt(string, 10, 64)
int转string：    string := strconv.Itoa(int)
int64转string：  string := strconv.FormatInt(int64, 10)


类型初始化后,零值
int 为 0
float 为 0.0
bool 为 false
string 为空字符串 ""
nil 用于 interface、func、map 、slice 和 channel,error 的“零值”



for range 是遍历 rune类型，字符和汉字通用

连乘
1e3 =1000 ,表示10的连乘
你可以通过增加前缀 0 来表示 8 进制数（如：077），
增加前缀 0x 来表示 16 进制数（如：0xFF）



因为 Unicode 至少占用 2 个字节，所以我们使用 int16 或者 int 类型来表示。如果需要使用到 4 字节，则会加上 \U 前缀；前缀 \u 则总是紧跟着长度为 4 的 16 进制数，前缀 \U 紧跟着长度为 8 的 16 进制数。

var ch int = '\u0041'
var ch2 int = '\u03B2'
var ch3 int = '\U00101234'



```

## 第三章 变量

```go
变量

标识符(identifiers)，关键字(keywords)，运算符(operators )和标点符号(punctuation)以及字面量(literals) 。
```

## 第四章 常量

```go

显式类型定义： const b string = "abc"
隐式类型定义： const b = "abc"

var (
  a int
  b bool
  str string
)

类型初始化后,零值
int 为 0
float 为 0.0
bool 为 false
string 为空字符串 ""
nil 用于 interface、func、map 、slice 和 channel 的“零值”


const 只能定义 bool,int uint float64（整数型、浮点型和复数）和 string。
指针属于引用类型，其它的引用类型还包括 slices，maps和 channel
被引用的变量会存储在堆中，以便进行垃圾回收，且比栈拥有更大的内存空间。
编译器会做逃逸分析，所以由Go的编译器决定在哪(堆or栈)分配内存，保证程序的正确性。


在一个 nil 的slice中添加元素是没问题的，
但对一个map做同样的事将会生成一个运行时的panic：
    var m map[string]int
    m["one"] = 1 //error
```

```go

const (
    a = iota
    b
    c
)
a=0, b=1, c=2
第一个 iota 等于 0，每当 iota 在新的一行被使用时，它的值都会自动加 1；

const (
    a = iota
    b = 8
    c
)
a, b, c分别为0, 8, 8，新的常量b声明后，iota 不再向下赋值，后面常量如果没有赋值，则继承上一个常量值。


实用 常量枚举

type ByteSize float64
const (
    _ = iota // 通过赋值给空白标识符来忽略值
    KB ByteSize = 1<<(10*iota)
    MB
    GB
    TB
    PB
    EB
    ZB
    YB
)

如果你的函数非常简短，你也可以将它们放在同一行：
func Sum(a, b int) int { return a + b }


```

## 第五章 作用域

```go



func main() {
	if a := 1; false {
	} else if b := 2; false {
	} else if c := 3; false {
	} else {
		println(a, b, c) //1,2,3
	}
}



简单总结如下：

有花括号"{ }"一般都存在作用域的划分；
:= 简式声明会屏蔽所有上层代码块中的变量（常量），建议使用规则来规范，如对常量使用全部大写，而变量尽量小写；
在if等语句中存在隐式代码块，需要注意；
闭包函数可以理解为一个代码块，并且他可使用包含它的函数内的变量；


注意，简式变量只能在函数内部声明使用，但是它可能会覆盖函数外全局同名变量。

而且你不能在一个单独的声明中重复声明一个变量，但在多变量声明中这是允许的，而且其中至少要有一个新的声明变量。重复变量需要在相同的代码块内，否则你将得到一个隐藏变量。

如果你在代码块中犯了这个错误，将不会出现编译错误，但应用运行结果可能不是你所期望。所以尽可能避免和全局变量同名。


```

## 第六章 约定和惯例

```go
type interface 命名规范  加 -er结尾


const (
    ROLE_KEY string = "role" // 大写
)

type Role string

type RolesHierarchy []Role

type RoleChecker interface { //加 -er结尾
    IsRole(Role, RolesHierarchy) bool
}

type RoleCheckerAssumer interface { //加 -er结尾
    RoleChecker
}

func (r Role) String() string {
    return string(r)
}

func NewRole(session ServerSession) Role {
    return session.GetValue(ROLE_KEY).(Role)
}

func (this Role) IsRole(role Role, hierarchy RolesHierarchy) bool {
  return true
}


函数或方法的注释需要以函数名开始，且两者之间没有空行，示例如下：
// ContainsRune reports whether the rune is contained in the UTF-8-encoded byte slice b.
func ContainsRune(b []byte, r rune) bool {
	return IndexRune(b, r) >= 0
}
在方法，结构体或者包注释前面加上“Deprecated:”表示不建议使用，示例如下：


// Deprecated: Old 老旧方法，不建议使用
func Old(a int)(int){
    return a
}

```

## 第七章 代码结构化

```go


import 其实是导入目录，而不是定义的package名字，虽然我们一般都会保持一致，但其实是可以随便定义目录名，只是使用时会很容易混乱，不建议这么做。

除了符号 _，包中所有代码对象的标识符必须是唯一的，以避免名称冲突。但是相同的标识符可以在不同的包中使用，因为可以使用包名来区分它们。


特殊的import方式

点操作    import( . “fmt” )
这个包导入之后在你调用这个包的函数时，你可以省略前缀的包名，如可以省略的写成Println(“hello world!”)


别名操作
把包命名成另一个容易记忆的名字。在实际项目中有这样使用，但请谨慎使用，不要广泛采用这种形式。
import(
    f "fmt"
)

_操作
_操作其实是引入该包，而不直接使用包里面的函数，而是调用了该包里面的init函数。
import (
    _ "github.com/revel/modules/testrunner/app"
    _ "guild_website/app"
)


如果存在 init 函数的话，则对该函数进行定义（这是一个特殊的函数，每个含有该函数的包都会首先执行这个函数）。

程序开始执行并完成初始化后，第一个调用（程序的入口点）的函数是 main.main()（如果有 init() 函数则会先执行该函数）。


main函数一旦返回就表示程序已成功执行并立即退出。

Go 程序的执行（程序启动）顺序如下：
程序的初始化和执行都起始于main包。如果main包还导入了其它的包，那么就会在编译时将它们依次导入。有时一个包会被多个包同时导入，那么它只会被导入一次（例如很多包可能都会用到fmt包，但它只会被导入一次，因为没有必要导入多次）。当一个包被导入时，如果该包还导入了其它的包，那么会先将其它包导入进来，然后再对这些包中的包级常量和变量进行初始化，接着执行init函数（如果有的话），依次类推。等所有被导入的包都加载完毕了，就会开始对main包中的包级常量和变量进行初始化，然后执行main包中的init函数（如果存在的话），最后执行main函数。


标准库

    unsafe: 包含了一些打破 Go 语言“类型安全”的命令，一般的程序中不会被使用，可用在 C/C++ 程序的调用中。
    syscall-os-os/exec:
    	os: 提供给我们一个平台无关性的操作系统功能接口，采用类UNIX设计，隐藏了不同操作系统间差异，让不同的文件系统和操作系统对象表现一致。
    	os/exec: 提供我们运行外部操作系统命令和程序的方式。
    	syscall: 底层的外部包，提供了操作系统底层调用的基本接口。
    archive/tar 和 /zip-compress：压缩(解压缩)文件功能。
    fmt-io-bufio-path/filepath-flag:
    	fmt: 提供了格式化输入输出功能。
    	io: 提供了基本输入输出功能，大多数是围绕系统功能的封装。
    	bufio: 缓冲输入输出功能的封装。
    	path/filepath: 用来操作在当前系统中的目标文件名路径。
    	flag: 对命令行参数的操作。　　
    strings-strconv-unicode-regexp-bytes:
    	strings: 提供对字符串的操作。
    	strconv: 提供将字符串转换为基础类型的功能。
    	unicode: 为 unicode 型的字符串提供特殊的功能。
    	regexp: 正则表达式功能。
    	bytes: 提供对字符型分片的操作。
    math-math/cmath-math/big-math/rand-sort:
    	math: 基本的数学函数。
    	math/cmath: 对复数的操作。
    	math/rand: 伪随机数生成。
    	sort: 为数组排序和自定义集合。
    	math/big: 大数的实现和计算。 　　
    container-/list-ring-heap: 实现对集合的操作。
    	list: 双链表。
    	ring: 环形链表。
   time-log:
        time: 日期和时间的基本操作。
        log: 记录程序运行时产生的日志。
    encoding/Json-encoding/xml-text/template:
        encoding/Json: 读取并解码和写入并编码 Json 数据。
        encoding/xml:简单的 XML1.0 解析器。
        text/template:生成像 HTML 一样的数据与文本混合的数据驱动模板。
    net-net/http-html:
        net: 网络数据的基本操作。
        http: 提供了一个可扩展的 HTTP 服务器和客户端，解析 HTTP 请求和回复。
        html: HTML5 解析器。
    runtime: Go 程序运行时的交互操作，例如垃圾回收和协程创建。
    reflect: 实现通过程序运行时反射，让程序操作任意类型的变量。



Go语言中init函数用于包(package)的初始化，该函数是Go语言的一个重要特性，有下面的特征：

init函数是用于程序执行前做包的初始化的函数，比如初始化包里的变量等
每个包可以拥有多个init函数
包的每个源文件也可以拥有多个init函数
同一个包中多个init函数的执行顺序Go语言没有明确的定义(说明)
不同包的init函数按照包导入的依赖关系决定该初始化函数的执行顺序
init函数不能被其他函数调用，而是在main函数执行之前，自动被调用

```

## 第八章 Go 项目开发与编译

```go
Go 项目目录下一般有三个子目录：

* src存放源代码
* pkg编译后生成的文件
* bin编译后生成的可执行文件

当我们运行go install main.go 会在GOPATH的bin 目录中生成可执行文件。

查看本地的Godoc

1.命令行下进入目录下并输入命令： godoc -http=:6060 -goroot="."
2.然后在浏览器打开地址：http://localhost:6060
3.然后你会看到本地的 Godoc 页面，从左到右一次显示出目录中的包。
```

```go
Go程序的编译
在Go语言中，和编译有关的命令主要是go run ,go build , go install这三个命令。

go run只能作用于main包文件.
go run 命令在第二次执行的时候，如果发现导入的代码包没有发生变化，那么 go run 不会再次编译这个导入的代码包，直接进行链接生成最终可执行文件并运行程序。

go install用于编译并安装指定的代码包及它们的依赖包，并且将编译后生成的可执行文件放到 bin 目录下（GOPATH/bin），编译后的包文件放到当前工作区的 pkg 的平台相关目录下。


go build用于编译指定的代码包以及它们的依赖包。如果用来编译非main包的源码，则只做检查性的编译，而不会输出任何结果文件。如果是一个可执行程序的源码（即是 main 包），这个过程与go run 大体相同，除了会在当前目录生成一个可执行文件外。


使用go build时有一个地方需要注意，对外发布编译文件如果不希望被人看到源代码，请使用go build -ldflags 命令，设置编译参数-ldflags "-w -s" 再编译后发布。避免使用gdb来调试而清楚看到源代码。

```

```go

Go modules 包依赖管理

* GO111MODULE=off
  无模块支持，go 会从 GOPATH 和 vendor 文件夹寻找包。
* GO111MODULE=on
  模块支持，go 会忽略 GOPATH 和 vendor 文件夹，只根据 go.mod下载依赖。
* GO111MODULE=auto
  在 GOPATH/src外面且根目录有 go.mod文件时，开启模块支持。

在使用模块的时候， GOPATH是无意义的，不过它还是会把下载的依赖储存在 GOPATH/pkg/mod 中。
运行命令，go help mod ，我们可以看到mod的操作子命令，主要是init、 edit、 tidy。


go mod 命令

命令含义：
download   下载依赖的module到本地cache
edit        编辑go.mod文件
graph      打印模块依赖图
init        在当前文件夹下初始化一个新的module, 创建go.mod文件
tidy       增加丢失的module，去掉未用的module
vendor     将依赖复制到vendor下
verify      校验依赖
why       解释为什么需要依赖
```

```go
使用Modules来管理项目


为了使用modules来管理项目，我们可以以下几个步骤来操作：

（1）首先需要设置GO111MODULE ，这里我们设置为auto。

（2）考虑和原来GOPATH有所隔离，新建立了一个目录D:\gomodules来存放modules管理的项目。

（3）在D:\gomodules下建立ind项目，建立对应的目录，D:\gomodules\ind

（4）在ind目录中，我们编写了该项目的主要文件main.go

 (5) go mod init ind

 (6) go mod tidy


如果有更新，重复运行go mod tidy。如果出错再使用replace

replace (
	golang.org/x/net v0.0.0-20180218175443-cbe0f9307d01 => JakeGin/cmd
	golang.org/x/net v0.0.0-20181114220301-adae6a3d119a =>  JakeGin/cmd
)

Replace命令：
go mod edit -replace=old[@v]=new[@v]

go.mod文件可以通过require，replace和exclude语句使用的精确软件包集。

（1）require语句指定的依赖项模块

（2）replace语句可以替换依赖项模块

（3）exclude语句可以忽略依赖项模块
```

## 第九章 运算符

```go
位运算

& 按位与运算符”&”是双目运算符。 其功能是参与运算的两数各对应的二进位相与。(全是1才是1)

| 按位或运算符”|”是双目运算符。 其功能是参与运算的两数各对应的二进位相或。（一个1就是1）

^ 按位异或运算符”^”是双目运算符。 其功能是参与运算的两数各对应的二进位相异或，当两对应的二进位相异时，结果为1。

（2<< 3） 2^3
（2>> 3） 2^(1/3)

<< 左移运算符”<<”是双目运算符。左移n位就是乘以2的n次方。 其功能把”<<”左边的运算数的各二进位全部左移若干位，由”<<”右边的数指定移动的位数，高位丢弃，低位补0。

>> 右移运算符”>>”是双目运算符。右移n位就是除以2的n次方。 其功能是把”>>”左边的运算数的各二进位全部右移若干位，”>>”右边的数指定移动的位数。

```

```go
&	返回变量存储地址 &a; 将给出变量的实际地址。
*	指针变量。 *a; 是一个指针变量


优先级	运算符
7      	^ !
6      	* / % << >> & &^
5      	+ - | ^
4      	== != < <= >= >
3      	<-
2      	&&
1      	||

浮点数除以 0.0 会返回一个无穷尽的结果，使用 +Inf 表示。
带有 ++ 和 — 的只能作为语句，而非表达式，因此 n = i++ 这种写法是无效的。
函数 rand.Float32 和 rand.Float64 返回介于 [0.0，1.0) 之间的伪随机数，其中包括 0.0 但不包括 1.0。函数 rand.Intn 返回介于 [0，n) 之间的伪随机数。

你可以使用 Seed(value) 函数来提供伪随机数的生成种子，一般情况下都会使用当前时间的纳秒级数字。
```

## 第十章 string

```go
1.双引号：字符串使用双引号括起来，其中的相关的转义字符将被替换。例如：
str := "Hello World! \n Hello Gopher! \n"

输出：
Hello World!
Hello Gopher!

2. 反引号：字符串使用反引号括起来，其中的相关的转义字符不会被替换。
str :=  `Hello World! \n Hello Gopher! \n`

输出：
Hello World! \nHello Gopher! \n
双引号中的转义字符被替换，而反引号中原生字符串中的 \n 会被原样输出。



Go 语言中的string类型存储的字符串是不可变的， 如果要修改string内容需要将string转换为[]byte或[]rune，并且修改后的string内容是重新分配的。

那么byte和rune的区别是什么(下面写法是type别名):

type byte = uint8
type rune = int32

每个中文字符占3个bytes.
s := "其实就是rune"
fmt.Println(len(s))                    // "16"
fmt.Println(utf8.RuneCountInString(s)) // "8"


实际上，Go语言的range循环在处理字符串的时候，会自动隐式解码UTF8字符串。

"获取字符串中某个字节的地址的行为是非法的，例如：&str[i]。"


+ 拼接字符串性能差
里面的字符串都是不可变的，每次运算都会产生一个新的字符串，所以会产生很多临时的无用的字符串，不仅没有用，还会给 gc 带来额外的负担，所以性能比较差。


strings.Join([]string{"hello", "world"}, ", ")
适用于已有数组的情况下，效率很高


效率高
var buffer bytes.Buffer
buffer.WriteString("hello")
buffer.WriteString(", ")
buffer.WriteString("world")
fmt.Print(buffer.String())


strings.Builder同样高性能

var b1 strings.Builder
b1.WriteString("ABC")
b1.WriteString("DEF")
fmt.Print(b1.String())


```

## 有关 string 处理

```go

标准库中有四个包对字符串处理尤为重要：bytes、strings、strconv和unicode包。

strings包提供了许多如字符串的查询、替换、比较、截断、拆分和合并等功能。

bytes包也提供了很多类似功能的函数，但是针对和字符串有着相同结构的[]byte类型。因为字符串是只读的，因此逐步构建字符串会导致很多分配和复制。在这种情况下，使用bytes.Buffer类型将会更有效，稍后我们将展示。

strconv包提供了布尔型、整型数、浮点数和对应字符串的相互转换，还提供了双引号转义相关的转换。

unicode包提供了IsDigit、IsLetter、IsUpper和IsLower等类似功能，它们用于给字符分类。

strings 包提供了很多操作字符串的简单函数，通常一般的字符串操作需求都可以在这个包中找到。下面简单举几个例子：

判断是否以某字符串打头/结尾
strings.HasPrefix(s, prefix string) bool
strings.HasSuffix(s, suffix string) bool

字符串分割
strings.Split(s, sep string) []string

返回子串索引
strings.Index(s, substr string) int
strings.LastIndex 最后一个匹配索引

字符串连接
strings.Join(a []string, sep string) string
另外可以直接使用“+”来连接两个字符串

字符串替换
strings.Replace(s, old, new string, n int) string

字符串转化为大小写
strings.ToUpper(s string) string
strings.ToLower(s string) string

统计某个字符在字符串出现的次数
strings.Count(s, substr string) int

判断字符串的包含关系
strings.Contains(s, substr string) bool




```

## 第十一章 数组(Array)

```go
数组长度也是数组类型的一部分，所以[5]int和[10]int是属于不同类型的。
注意事项：如果我们想让数组元素类型为任意类型的话可以使用 interface 作为类型。当使用值时我们必须先做一个类型判断。

常见初始化方式

var arrAge  = [5]int{18, 20, 15, 22, 16}
var arrName = [5]string{3: "Chris", 4: "Ron"} //指定索引位置初始化
// {"","","","Chris","Ron"}
var arrCount = [4]int{500, 2: 100} //指定索引位置初始化 {500,0,100,0}
var arrLazy = [...]int{5, 6, 7, 8, 22} //数组长度初始化时根据元素多少确定
var arrPack = [...]int{10, 5: 100} //指定索引位置初始化，数组长度与此有关 {10,0,0,0,0,100}
var arrRoom [20]int
var arrBed = new([20]int)

len() 长度根据实际初始化时数据的长度来定，这里为2
数组长度最大为 2Gb。
var arr1 = new([5]int)  指针

把一个大数组传递给函数会消耗很多内存。有两种方法可以避免这种现象：
传递数组的指针
使用数组的切片


```

## 第十二章 切片(slice)

```go

切片的长度永远不会超过它的容量，所以对于 切片 s 来说该不等式永远成立：0 <= len(s) <= cap(s)。

绝对不要用指针指向 slice，切片本身已经是一个引用类型，所以它本身就是一个指针!
 var identifier []type  一个切片在未初始化之前默认为 nil，长度为 0。


a := [5]int{1, 2, 3, 4, 5}
t := a[1:3:5]
这里t的容量（capacity）是5-1=4 ，长度是2。

为了节省内存
raw := make([]byte, 10000)
res := make([]byte, 3)
copy(res, raw[:3]) // 利用copy 函数复制，raw 可被GC释放



在某些情况下，在一个slice中添加新的数据，在原有数组无法保持更多新的数据时，将导致分配一个新的数组。而现在其他的slice还指向老的数组（和老的数据）。

func main() {
    s1 := []int{1, 2, 3}
    fmt.Println(len(s1), cap(s1), s1) // 输出 3 3 [1 2 3]
    s2 := s1[1:]
    fmt.Println(len(s2), cap(s2), s2) // 输出 2 2 [2 3]
    for i := range s2 {
        s2[i] += 20
    }
    // s2的修改会影响到数组数据，s1输出新数据
    fmt.Println(s1) // 输出 [1 22 23]
    fmt.Println(s2) // 输出 [22 23]
    s2 = append(s2, 4) // append  导致了slice 扩容
    for i := range s2 {
        s2[i] += 10
    }
    // s1 的数据现在是陈旧的老数据，而s2是新数据，他们的底层数组已经不是同一个了。
    fmt.Println(s1) // 输出[1 22 23]
    fmt.Println(s2) // 输出[32 33 14]
}

append()函数操作后，有没有生成新的切片需要看原有切片的容量是否足够。
append()函数操作如果导致分配新的切片来保证已有切片元素和新增元素的存储，也就是返回的切片可能已经指向一个不同的相关数组了，那么新的切片已经和原来切片没有任何关系，即使修改了数据也不会同步。

所以，最好每次指向原slice。

s0 := []int{0, 0}
s1 := append(s0, 2)                // append 单个元素     s1 == []int{0, 0, 2}
s2 := append(s1, 3, 5, 7)          // append 多个元素    s2 == []int{0, 0, 2, 3, 5, 7}
s3 := append(s2, s0...)            // append 一个切片     s3 == []int{0, 0, 2, 3, 5, 7, 0, 0}
s4 := append(s3[3:6], s3[2:]...)   // append 切片片段    s4 == []int{3, 5, 7, 2, 3, 5, 7, 0, 0}
```

## 第十三章 字典(Map)

```go
Map中
key 可以是任意可以用 == 或者 != 操作符比较的类型，
比如 string、int、float, 以及 指针，interface

所以，arr、slice和struct不能作为 key
含有数组切片的结构体不能作为 key，只包含内建类型的 struct 是可以作为 key 的,如果要用结构体作为 key 可以提供 Key() 和 Hash() 方法，这样可以通过结构体的域计算出唯一的数字或者字符串的 key。

value 可以是任意类型的；通过使用空接口类型，我们可以存储任意值，但是使用这种类型作为值时需要先做一次类型断言。map 也可以用函数作为自己的值，这样就可以用来做分支结构：key 用来选择要执行的函数。

map 传递给函数的代价很小：在 32 位机器上占 4 个字节，64 位机器上占 8 个字节，无论实际上存储了多少数据。(实际只是传指针的副本)

通过 key 在 map 中寻找值是很快的，比线性查找快得多，但是仍然比从数组和切片的索引中直接读取要慢 100 倍；所以如果你很在乎性能的话还是建议用切片来解决问题。

如果你需要更新原有集合中的数据，使用索引操作符来获得数据。

当 map 增长到容量上限的时候，如果再增加新的 key-value 对，map 的大小会自动加 1。所以出于性能的考虑，对于大的 map 或者会快速扩张的 map，即使只是大概知道容量，也最好先标明。


在一个 nil 的slice中添加元素是没问题的，但对一个map做同样的事将会生成一个运行时的panic。


判断Key是否存在

if _, ok := x["two"]; !ok {
        fmt.Println("no entry")
    }

// 声明但未初始化map，此时是map的零值状态
map1 := make(map[string]string, 5)

map2 := make(map[string]string)

// 创建了初始化了一个空的的map，这个时候没有任何元素
map3 := map[string]string{}

// map中有三个值
map4 := map[string]string{"a": "1", "b": "2", "c": "3"}
从 map1 中删除 key1，直接 delete(map1, key1) 就可以。如果 key1 不存在，该操作不会产生错误。
delete(map4, "a")

map 默认是无序的，不管是按照 key 还是按照 value 默认都不排序。
如果你想为 map 排序，需要将 key（或者 value）拷贝到一个切片，再对切片排序（使用 sort 包）。


在”range”语句中生成的数据的值是真实集合元素的拷贝。它们不是原有元素的引用。
这意味着更新这些值将不会修改原来的数据。同时也意味着使用这些值的地址将不会得到原有数据的指针。

```

## 第十四章 流程控制

```go
Switch使用

switch result := calculate(); {
    case result < 0:
        ...
    case result > 0:
        ...
    case val1,val2,val3:
        ...
    default:
        // 0
}
一旦成功地匹配到某个分支，在执行完相应代码后就会退出整个 switch 代码块，也就是说您不需要特别使用 break 语句来表示结束。

fallthrough 强制执行后面的case代码，fallthrough不会判断下一条case的expr结果是否为true。

```

### Select 使用

```go


select 是Go中的一个控制结构，类似于switch语句，用于处理异步IO操作。select 会监听 case 语句中 channel 的读写操作，当case中channel读写操作为非阻塞状态（即能读写）时，将会触发相应的动作。

select 中的 case 语句必须是一个channel操作

select 中的 default 子句总是可运行的。


+ 如果有多个case都可以运行，select会随机公平地选出一个执行，其他不会执行。
+ 如果没有可运行的case语句，且有default语句，那么就会执行default的动作。
+ 如果没有可运行的case语句，且没有default语句，select将阻塞，直到某个case通信可以运行。



func main() {
    var c1, c2, c3 chan int
    var i1, i2 int
    select {
    case i1 = <-c1:
        fmt.Printf("received ", i1, " from c1\n")
    case c2 <- i2:
        fmt.Printf("sent ", i2, " to c2\n")
    case i3, ok := (<-c3):
        if ok {
            fmt.Printf("received ", i3, " from c3\n")
        } else {
            fmt.Printf("c3 is closed\n")
        }
    case <-time.After(time.Second * 3): //超时退出
        fmt.Println("request time out")
    }
}
// 输出：request time out


```

### for 循环

```go
for range 循环  rune集合，可以遍历字符串
for i, val := range coll { }

要注意的是，val 始终为集合中对应索引的值拷贝，因此它一般只具有只读性质，对它所做的任何修改都不会影响到集合中原有的值（注：如果 val 为指针，则会产生指针的拷贝，依旧可以修改集合中的原值）。


type field struct {
    name string
}
func (p *field) print() {
    fmt.Println(p.name)
}
func main() {
    data := []field{{"one"}, {"two"}, {"three"}}
    for _, v := range data {
        go v.print()
    }
    time.Sleep(3 * time.Second)
    // goroutines （可能）显示: three, three, three
}

需要改成


func main() {
    data := []string{"one", "two", "three"}
    for _, v := range data {
        go func(in string) {
            fmt.Println(in)
        }(v)
    }
    time.Sleep(3 * time.Second)
    // goroutines输出: one, two, three
}

```

### 流程控制

```go
break

一个 break 的作用范围为该语句出现后的最内部的结构，它可以被用于任何形式的 for 循环（计数器、条件判断等）。
但在 switch 或 select 语句中，break 语句的作用结果是跳过整个代码块，执行后续的代码。

continue

关键字 continue 忽略剩余的循环体而直接进入下一次循环的过程，但不是无条件执行下一次循环，执行之前依旧需要满足循环的判断条件。
关键字 continue 只能被用于 for 循环中。


label

for、switch 或 select 语句都可以配合标签（label）形式的标识符使用，即某一行第一个以冒号（:）结尾的单词（Gofmt 会将后续代码自动移至下一行）
（标签的名称是大小写敏感的，为了提升可读性，一般建议使用全部大写字母）
continue 语句指向 LABEL1，当执行到该语句的时候，就会跳转到 LABEL1 标签的位置。

使用标签和 Goto 语句是不被鼓励的：它们会很快导致非常糟糕的程序设计，而且总有更加可读的替代方案来实现相同的需求。


```

## 第十五章 错误处理

```go
新建错误
err := errors.New("math - square root of negative number")

通常你想要返回包含错误参数的更有信息量的字符串
if f < 0 {
    return 0, fmt.Errorf("square root of negative number %g", f)
}

不能随意地用 panic 中止程序，必须尽力补救错误让程序能继续执行。
自定义包中的错误处理和 panicking，这是所有自定义包实现者应该遵守的最佳实践：

1）在包内部，总是应该从 panic 中 recover：不允许显式的超出包范围的 panic()

2）向包的调用者返回错误值（而不是 panic）。
recover() 的调用仅当它在 defer 函数中被直接调用时才有效。

总结：panic 会导致栈被展开直到 defer 修饰的 recover() 被调用或者程序中止。
func protect(g func()) {
    defer func() {
        log.Println("done")
        // 即使有panic，Println也正常执行。
        if err := recover(); err != nil {
            log.Printf("run time panic: %v", err)
        }
    }()
    log.Println("start")
    g() //   可能发生运行时错误的地方
}

```

### defer 规则

```go

规则一 当defer被声明时，其参数就会被实时解析 ！
规则二 defer执行顺序为先进后出
规则三 defer可以读取有名返回值，也就是可以改变有名返回参数的值。


实时解析

func main() {
    var i int = 1
    defer fmt.Println("result =>", func() int { return i * 2 }())
    i++
    // 输出: result => 2 (而不是 4)
}

执行顺序先进后出

func main() {
    defer fmt.Print(" !!! ")
    defer fmt.Print(" world ")
    fmt.Print(" hello ")
}
//输出:  hello  world  !!!




必须要先声明defer，否则不能捕获到panic异常。recover() 的调用仅当它在 defer 函数中被直接调用时才有效。


panic 是用来表示非常严重的不可恢复的错误的。在Go语言中这是一个内置函数，接收一个interface{}类型的值（也就是任何值了）作为参数。

函数执行的时候panic了，函数不往下走，开始运行defer，defer处理完再返回。这时候（defer的时候），recover内置函数可以捕获到当前的panic（如果有的话），被捕获到的panic就不会向上传递了。
recover之后，逻辑并不会恢复到panic那个点去，函数还是会在defer之后返回。
Panic—->defer—>recover



有返回值

最先是所有结果值在进入函数时都会初始化为其类型的零值（姑且称为ret赋值），然后执行defer命令,最后才是return操作。
如果是有名返回值，返回值变量其实可视为是引用赋值，可以能被defer修改。
而在匿名返回值时，给ret的值相当于拷贝赋值，defer命令时不能直接修改。
```

```go
defer 与 return 关系


func main() {
    fmt.Println("=========================")
    fmt.Println("return:", fun1())
    fmt.Println("=========================")
    fmt.Println("return:", fun2())
    fmt.Println("=========================")
    fmt.Println("return:", fun3())
    fmt.Println("=========================")
    fmt.Println("return:", fun4())
}
func fun1() (i int) {
    defer func() {
        i++
        fmt.Println("defer2:", i) // 打印结果为 defer: 2
    }()
    // 规则二 defer执行顺序为先进后出
    defer func() {
        i++
        fmt.Println("defer1:", i) // 打印结果为 defer: 1
    }()
    // 规则三 defer可以读取有名返回值（函数指定了返回参数名）
    return 0 //实际为2 。  换句话说其实怎么写都是直接 return 的效果
}
func fun2() int {
    var i int
    defer func() {
        i++
        fmt.Println("defer2:", i) // 打印结果为 defer: 2
    }()
    defer func() {
        i++
        fmt.Println("defer1:", i) // 打印结果为 defer: 1
    }()
    return i
}
func fun3() (r int) {
    t := 5
    defer func() {
        t = t + 5
        fmt.Println(t)
    }()
    return t
}
func fun4() int {
    i := 8
    // 规则一 当defer被声明时，其参数就会被实时解析
    defer func(i int) {
        i = 99
        fmt.Println(i)
    }(i)
    i = 19
    return i
}


程序输出：
=========================
defer1: 1
defer2: 2
return: 2
=========================
defer1: 1
defer2: 2
return: 0
=========================
10
return: 5
=========================
99
return: 19


在有名返回值情况下，return语句怎么写都改变不了最终返回的实际值，在上面fun1() (i int) 中，return 100和return 0 没有任何作用，返回的还是i的实际值，所以我们一般直接写为return。这点要注意，有时函数可能返回非我们希望的值，所以改为匿名返回也是一种办法。



可以使用defer计算函数执行时间
规则一 当defer被声明时，其参数就会被实时解析 ！

func main(){
        defer timeCost(time.Now())
        fmt.Println("start program")
        time.Sleep(5*time.Second)
        fmt.Println("finish program")
}
func timeCost(start time.Time){
        terminal:=time.Since(start)
        fmt.Println(terminal)
}


另一种计算时间差

start := time.Now()
longCalculation()
end := time.Now()
delta := end.Sub(start)
fmt.Printf("longCalculation took this amount of time: %s\n", delta)

```

## 第十六章 函数

```go
除了main()、init()函数外，其它所有类型的函数都可以有参数与返回值。
func FunctionName (a typea, b typeb) (t1 type1, t2 type2){}

可变参数

func doFix (prefix string, values ...int)
返回值
func testa  (a, b int, z float32) bool
func swap  (a int, b int) (t1 int, t2 int)


声明了返回值必须return
Go 语言不允许函数重载
函数类型的未初始化变量的值为nil

匿名函数
f := func() int { return 7 }


```

```go
常用函数内声明函数方式

var isValid func(a, b int) bool
isValid = func(a, b int) bool {
    return true
}




两种声明方式


type funcType func(time.Time)     // 定义函数类型funcType

func CurrentTime(start time.Time) {
	fmt.Println(start)
}

func main() {
	f := func(t time.Time) time.Time { return t } // 方式一：直接赋值给变量
	fmt.Println(f(time.Now()))

	var timer funcType = CurrentTime // 方式二：定义函数类型funcType变量timer
	timer(time.Now())

	funcType(CurrentTime)(time.Now())  // 先把CurrentTime函数转为funcType类型，然后传入参数调用
// 这种处理方式在Go 中比较常见
}
```

```go
函数调用

Go 语言中函数默认使用按值传递来传递参数，也就是传递参数的副本。函数接收参数副本之后，在使用变量的过程中可能对副本的值进行更改，但不会影响到原来的变量。

如果我们希望函数可以直接修改参数的值, 传地址
在函数调用时，像切片（slice）、字典（map）、接口（interface）、通道（channel）等这样的引用类型都是默认使用引用传递（传递地址）。



// 变参函数，参数不定长
func list(nums ...int) {
	fmt.Println(nums)
}

func main() {
	// 常规调用，参数可以多个
	list(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)

	// 在参数同类型时，可以组成slice使用 parms... 进行参数传递
	numbers := []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
	list(numbers...) // slice时使用
}

```

```go
内置函数
| append | 用于附加连接切片 |
| :----- | :--------------- |
| copy   | 用于复制切片     |
| delete | 从字典删除元素   |
| complex | 从浮点实部和虚部构造复数值 |
| :------ | :------------------------- |
| real    | 提取复数值的实部           |
| imag    | 提取复数值的虚部           |
| panic   | 用来表示非常严重的不可恢复的异常错误 |
| :------ | :----------------------------------- |
| recover | 用于从 panic 或 错误场景中恢复       |
delete(m, k)  //从字典m中删除元素 m[k]
append(s S, x ...T) S  // T 是类型S的元素
copy(dst, src []T) int //从源src复制到目标dst，并返回复制的元素数
copy(dst []byte, src string) int

copy接受byte类型
var b = make([]byte, 5)
n3 := copy(b, "Hello, World!")  // n3 == 5, b == []byte("Hello")

close  关闭channel
new 和 make 均是用于分配内存
    new用于值类型的内存分配，并且置为零值，返回地址。
    make只用于slice、map以及channel这三种引用数据类型的内存分配和初始化。
new(T) 分配内存和类型 T 的零值并返回其地址，也就是指向类型 T 的指针
make(T) 它返回类型T的值（不是* T）

c := make(chan int, 10)         // channel with a buffer size of 10

new(S)为S类型的变量分配内存，并初始化（a = 0，b = 0.0），返回包含该位置地址的类型* S的值。
type S struct { a int; b float64 }
new(S)

0 <= len(s) <= cap(s)

```

```go
递归与回调

使用递归函数时经常会遇到的一个重要问题就是栈溢出：一般出现在大量的递归调用导致的内存分配耗尽。

匿名函数
func(x, y int) int { return x + y }
这样的函数不能够独立存在，但可以被赋值于某个变量，即保存函数的地址到变量中,或者直接调用

fplus := func(x, y int) int { return x + y }
fplus是地址

z:=func(x, y int) int { return x + y } (3, 4)//直接调用
z是变量值

func N() func(int) int {
    return 1
}
var f = N()
var f1 = N()
f和f1是不同的实例，它们的地址是不一样的。


闭包函数
匿名函数同样也被称之为闭包。
闭包=函数+引用环境

闭包获取捕获变量相当于引用传递，而非值传递；对于闭包函数捕获的常量和变量，无论闭包何时何处被调用，闭包都可以使用这些常量和变量，而不用关心它们表面上的作用域。
```

```go
变参函数

func Greeting(who ...string) {
	for k, v := range who {
		fmt.Println(k, v)
	}
}
func main() {
	s := []string{"James", "Jasmine"}
	Greeting(s...)  // 注意这里切片s... ，把切片打散传入，与s具有相同底层数组的值。
}
```

## 第十七章 type 关键字

```go
type 用于 定义结构体，接口，还可以自定义类型，定义类型别名等

所有的转换都必须显式说明

type 定义类型别名

type A struct {
	Face int
}
type Aa=A // 类型别名

结构化的类型没有真正的值，它使用 nil 作为默认值


自定义类型不会继承原有类型的方法，但接口方法或组合类型的内嵌元素则保留原有的方法。

```

## 第十八章 Struct 结构体

```go
Go 通过结构体的形式支持用户自定义类型，或者叫定制类型。

结构体是值类型，因此可以通过 new 函数来创建。
在结构体中，非空字段名称必须是唯一的
结构体里的字段一般都有名字，像 field1、field2 等，如果字段在代码中从来也不会被用到，那么可以命名它为 _。
type identifier struct {
    field1 type1
    field2 type2
    ...
}


struct {
	x, y int
	u float32
	_ float32  // 填充
	A *[]int
	F func()
}


对于匿名字段，必须将匿名字段指定为类型名称T或指向非接口类型名称* T的指针，并且T本身可能不是指针类型。
struct {
	T1        // 字段名 T1
	*T2       // 字段名 T2
	P.T3      // 字段名 T3
	*P.T4     // f字段名T4
	x, y int    // 字段名 x 和 y
}

使用 new 函数给一个新的结构体变量分配内存，它返回指向已分配内存的指针：
type S struct { a int; b float64 }
new(S) //new(S)为S类型的变量分配内存，并初始化（a = 0，b = 0.0），返回包含该位置地址的类型* S的值。

我们一般的惯用方法是：t := new(T)，变量 t 是一个指向 T的指针，此时结构体字段的值是它们所属类型的零值。 此时t为 instance
也可以这样写：var t T ，也会给 t 分配内存，并零值化内存，但是这个时候 t 是类型T。 此时t是一个object

使用点号符“.”可以获取结构体字段的值structname.fieldname。无论变量是一个结构体类型还是一个结构体类型指针，都使用同样的表示法来引用结构体的字段。

type Temp struct { i int }
var v Temp    // v是结构体类型变量
var p *Temp   // p是指向一个结构体类型变量的指针
v.i
p.i

type Interval struct {
    start  int
    end   int
}
结构体变量有下面几种初始化方式，前面一种按照字段顺序，后面两种则对应字段名来初始化赋值：


intr := Interval{0, 3}            (A)
intr := Interval{end:5, start:1}    (B)
intr := Interval{end:5}           (C)


复合字面量是构造结构体，数组，切片和字典的值，并每次都创建新值。

声明和初始化一个结构体实例（一个结构体字面量：struct-literal）方式如下：

1.定义结构体类型Point3D和Line：

type Point3D struct { x, y, z float64 }
type Line struct { p, q Point3D }

2.声明并初始化
origin := Point3D{}                      //  Point3D 是零值
line := Line{origin, Point3D{y: -4, z: 12.3}}  //   line.q.x 是零值

这里 Point3D{}以及 Line{origin, Point3D{y: -4, z: 12.3}}都是结构体字面量。

```

初始化的区别： new vs &

```go


表达式 new(Type) 和 &Type{} 是等价的。&struct1{a, b, c} 是一种简写，底层仍然会调用 new ()，这里值的顺序必须按照字段顺序来写。

```

```go
可见性原则

结构体类型和字段的命名遵循可见性规则，一个导出的结构体类型中有些字段是导出的，也即首字母大写字段会导出；另一些不可见，也即首字母小写为未导出，对外不可见。


```

### 结构体的内存布局

```go

* 结构体的内存布局

Go 语言中，结构体和它所包含的数据在内存中是以连续块的形式存在的，即使结构体中嵌套有其他的结构体，这在性能上带来了很大的优势。

* 递归结构体

递归结构体类型可以通过引用自身指针来定义。这在定义链表或二叉树的节点时特别有用，此时节点包含指向临近节点的链接。例如：

type Element struct {
	next, prev *Element //引用自身指针
	list *List
	Value interface{}
}

* 可见性

通过参考应用可见性规则，如果结构体名不能导出，可使用 new 函数使用工厂方法的方法达到同样的目的。例如：
type bitmap struct {
	Size int
	data []byte
}

func NewBitmap(size int) *bitmap {
	div, mod := size/8, size%8
	if mod > 0 {
		div++
	}
	return &bitmap{size, make([]byte, div)}
}

在包外，只有通过NewBitmap函数才可以初始bitmap结构体。同理，在bitmap结构体中，由于其字段data是小写字母开头即并未导出，bitmap结构体的变量不能直接通过选择器读取data字段的数据。


* 带标签的结构体

结构体中的字段除了有名字和类型外，还可以有一个可选的标签（tag）。它是一个附属于字段的字符串，可以是文档或其他的重要标记。

标签的内容不可以在一般的编程中使用，只有 reflect 包能获取它。

reflect包可以在运行时反射得到类型、属性和方法。如变量是结构体类型，可以通过 Field() 方法来索引结构体的字段，然后就可以得到Tag 属性。例如：


type Student struct {
	name string "学生名字"          // 结构体标签
	Age  int    "学生年龄"          // 结构体标签
	Room int    `json:"Roomid"` // 结构体标签
}

func main() {
	st := Student{"Titan", 14, 102}
	fmt.Println(reflect.TypeOf(st).Field(0).Tag)
	fmt.Println(reflect.TypeOf(st).Field(1).Tag)
	fmt.Println(reflect.TypeOf(st).Field(2).Tag)
}

// 程序输出：
// 学生名字
// 学生年龄
// json:"Roomid"

```

### 匿名成员

```go
Go语言结构体中可以包含一个或多个匿名（内嵌）字段，即这些字段没有显式的名字，只有字段的类型是必须的，此时类型就是字段的名字（这一特征决定了在一个结构体中，每种数据类型只能有一个匿名字段）。

匿名（内嵌）字段本身也可以是一个结构体类型，即结构体可以包含内嵌结构体。

type Human struct {
	name string
}

type Student struct { // 含内嵌结构体Human
	Human // 匿名（内嵌）字段
	int   // 匿名（内嵌）字段
}
Go语言结构体中这种含匿名（内嵌）字段和内嵌结构体的结构，可近似地理解为面向对象语言中的继承概念。

Go 语言中的继承是通过内嵌或者说组合来实现的
```

### 嵌入与聚合

```go
结构体中包含匿名（内嵌）字段叫嵌入或者内嵌；而如果结构体中字段包含了类型名，还有字段名，则是聚合。


type Human struct {
	name string
}

type Person1 struct {           // 内嵌
	Human
}

type Person2 struct {           // 内嵌， 这种内嵌与上面内嵌有差异
	*Human
}

type Person3 struct{             // 聚合
	human Human
}

嵌入在结构体中广泛使用，在Go语言中如果只考虑结构体和接口的嵌入组合方式，一共有下面四种：


1.在 interface 中嵌入 interface

这里指的是在接口中定义中嵌入接口类型，而不是接口的一个实例，相当于合并了两个接口类型定义的全部函数。下面只有同时实现了Writer和 Reader 的接口，才可以说是实现了Teacher接口，即可以作为Teacher的实例。
type Writer interface{
   Write()
}

type Reader interface{
   Read()
}

type Teacher interface{
  Reader //匿名（内嵌）字段
  Writer //匿名（内嵌）字段
}


2.在 interface 中嵌入 type struct

Interface 不能嵌入非interface的类型。

3.在 type struct 中内嵌 interface
初始化的时候，内嵌接口要用一个实现此接口的结构体赋值；或者定义一个新结构体，可以把新结构体作为receiver，实现接口的方法就实现了接口（先记住这句话，后面在讲述方法时会解释），这个新结构体可作为初始化时实现了内嵌接口的结构体来赋值。


type Writer interface {
	Write()
}

type Author struct {
	name string
	Writer
}

// 定义新结构体，重点是实现接口方法Write()
type Other struct {
	i int
}

func (a Author) Write() {
	fmt.Println(a.name, "  Write.")
}

// 新结构体Other实现接口方法Write()，也就可以初始化时赋值给Writer 接口
func (o Other) Write() {
	fmt.Println(" Other Write.")
}

func main() {

	//  方法一：Other{99}作为Writer 接口赋值
	Ao := Author{"Other", Other{99}}
	Ao.Write()

	// 方法二：简易做法，对接口使用零值，可以完成初始化
	Au := Author{name: "Hawking"}
	Au.Write()
}

// 程序输出：
// Other   Write.
// Hawking   Write.

4.在 type struct 中嵌入 type struct

在结构体嵌入结构体很好理解，但不能嵌入自身值类型，可以嵌入自身的指针类型即递归嵌套。
在初始化时，内嵌结构体也进行赋值；外层结构自动获得内嵌结构体所有定义的字段和实现的方法。
下面代码完整演示了结构体中嵌入结构体，初始化以及字段的选择调用：

type Human struct {
	name   string // 姓名
	Gender string // 性别
	Age    int    // 年龄
	string        // 匿名字段
}

type Student struct {
	Human     // 匿名字段
	Room  int // 教室
	int       // 匿名字段
}

func main() {
	//使用new方式
	stu := new(Student)
	stu.Room = 102
	stu.Human.name = "Titan"
	stu.Gender = "男"
	stu.Human.Age = 14
	stu.Human.string = "Student"

	fmt.Println("stu is:", stu)// stu is: &{ {Titan 男 14 Student} 102 0}  指针变量
    // stu.name  相当于(*stu).name，这是一个语法糖
	fmt.Printf("Student.Room is: %d\n", stu.Room)
	fmt.Printf("Student.int is: %d\n", stu.int) // 初始化时已自动给予零值：0
	fmt.Printf("Student.Human.name is: %s\n", stu.name) //  (*stu).name
	fmt.Printf("Student.Human.Gender is: %s\n", stu.Gender)
	fmt.Printf("Student.Human.Age is: %d\n", stu.Age)
	fmt.Printf("Student.Human.string is: %s\n", stu.string)

	// 使用结构体字面量赋值
	stud := Student{Room: 102, Human: Human{"Hawking", "男", 14, "Monitor"}}

	fmt.Println("stud is:", stud)
	fmt.Printf("Student.Room is: %d\n", stud.Room)
	fmt.Printf("Student.int is: %d\n", stud.int) // 初始化时已自动给予零值：0
	fmt.Printf("Student.Human.name is: %s\n", stud.Human.name)
	fmt.Printf("Student.Human.Gender is: %s\n", stud.Human.Gender)
	fmt.Printf("Student.Human.Age is: %d\n", stud.Human.Age)
	fmt.Printf("Student.Human.string is: %s\n", stud.Human.string)
}

// 程序输出：
// stu is: &{ {Titan 男 14 Student} 102 0}
// Student.Room is: 102
// Student.int is: 0
// Student.Human.name is: Titan
// Student.Human.Gender is: 男
// Student.Human.Age is: 14
// Student.Human.string is: Student
// stud is: { {Hawking 男 14 Monitor} 102 0}
// Student.Room is: 102
// Student.int is: 0
// Student.Human.name is: Hawking
// Student.Human.Gender is: 男
// Student.Human.Age is: 14
// Student.Human.string is: Monitor




内嵌结构体的字段，可以逐层选择来使用，如stu.Human.name。如果外层结构体中没有同名的name字段，也可以直接选择使用，如stu.name。

从上面程序输出结果中stu is: &{ {Titan 男 14 Student} 102 0} 可以得知，stu 是指针变量。但是程序在调用此结构体变量的字段时并没有使用到指针，这是因为这里的 stu.name  相当于(*stu).name，这是一个语法糖，一般都使用stu.name方式来调用，但要知道有这个语法糖存在。


通过对结构体使用new(T)，struct{filed:value}两种方式来声明初始化，分别可以得到*T指针变量，和T值变量。
```

### 命名冲突

```go

当结构体两个字段拥有相同的名字（可能是继承来的名字）时会怎么样呢？外层名字会覆盖内层名字（但是两者的内存空间都保留）。

当相同的字段名在同一层级出现了两次，而且这个名字被程序直接选择使用了，就会引发一个错误，可以采用逐级选择使用的方式来避免这个错误。例如：



type A struct {a int}
type B struct {a int}

type C struct {
    A
    B
}
var c C

上面代码中不能直接选择使用c.a，编译时会报告ambiguous selector c.a，且编译不能通过。
但是完整逐级写出来就正常了，例如c.A.a或者c.B.a 都可以正确得到对应的值。

解决直接选择使用c.a引发二义性的问题一般应该由程序员逐级完整写出避免错误。

```

## 第十九章 接口

```go
Go语言接口定义了一组方法集合，但是这些方法集合仅仅只是被定义，它们没有在接口中实现。

接口(interface)类型是Go语言的一种数据类型。而因为所有的类型包括自定义类型都实现了空接口interface{}，所以空接口interface{}可以被当做任意类型的数值。

所有的类型如string、 int、 int64甚至是自定义的结构体类型都拥有interface{}空接口

var i interface{} = 99 // i可以是任何类型
i = 44.09
i = "All"  // i 可接受任意类型的赋值


接口是一组抽象方法的集合，它必须由其他非接口类型实现，不能自我实现。Go 语言通过它可以实现很多面向对象的特性。

type Namer interface {
    Method1(param_list) return_type
    Method2(param_list) return_type
    ...
}//Namer可以命名为Methoder, MethodIn, IMethod,等
命名规则： 按照惯例，单方法接口由方法名称加上-er后缀或类似修改来命名，以构造代理名词：Reader，Writer，Formatter，CloseNotifier等。
还有一些不常用的方式（当后缀 er 不合适时），比如 Recoverable，此时接口名以 able 结尾，或者以 I 开头等。


Go 语言中的接口都很简短，通常它们会包含 0 个、最多 3 个方法。如标准库io包中定义了下面2个接口：
type Reader interface {
	Read(p []byte) (n int, err error)
}
type Writer interface {
	Write(p []byte) (n int, err error)
}
==在Go语言中，如果接口的所有方法在某个类型方法集中被实现，则认为该类型实现了这个接口。==

类型不用显式声明实现了接口，只需要实现接口所有方法，这样的隐式实现解藕了实现接口的包和定义接口的包。


同一个接口可被多个类型可以实现，一个类型也可以实现多个接口。实现了某个接口的类型，还可以有其它的方法。有时我们甚至都不知道某个类型定义的方法集巧合地实现了某个接口。


类型需要实现接口方法集中的所有方法，一定是接口方法集中所有方法。类型实现了这个接口，那么接口类型的变量也就可以存放该类型的值。


type A struct {
	Books int
}

type B interface {
	f()
}

func (a A) f() {
	fmt.Println("A.f() ", a.Books)
}

type I int

func (i I) f() {
	fmt.Println("I.f() ", i)
}

func main() {
	var a A = A{Books: 9}
	a.f()

	var b B = A{Books: 99} // 接口类型可接受结构体A的值，因为结构体A实现了接口
	b.f()

	var i I = 199 // I是int类型引申出来的新类型
	i.f()

	var b2 B = I(299) // 接口类型可接受新类型I的值，因为新类型I实现了接口
	b2.f()
}

// 程序输出：
// A.f()  9
// A.f()  99
// I.f()  199
// I.f()  299

如果接口在类型之后才定义，或者二者处于不同的包中。但只要类型实现了接口中的所有方法，这个类型就实现了此接口。
```

==注意：接口中的方法必须要全部实现，才能实现接口。==

### 接口嵌入

```go
一个接口可以包含一个或多个其他的接口，但是在接口内不能嵌入结构体，也不能嵌入接口自身，否则编译会出错。

type ReadWrite interface {
    Read(b Buffer) bool
    Write(b Buffer) bool
}

type Lock interface {
    Lock()
    Unlock()
}

type File interface {
    ReadWrite //接口的嵌入方式和结构体的嵌入方式语法上差不多，直接写接口名即可。
    Lock
    Close()
}
```

### 类型断言 Type Assertion

```go
接口类型I的变量 varI 中可以包含任何实现了这个接口的类型的值，如果多个类型都实现了这个接口，所以有时我们需要用一种动态方式来检测它的真实类型，即在运行时确定变量的实际类型。

测试在某个时刻接口变量 varI 是否包含类型 T 的值：
注意： varI 必须是一个接口变量

value, ok := varI.(T)       // 类型断言



接口类型向普通类型转换有两种方式：
1.Type-switch测试。
2.Comma-ok断言

1.Type-switch测试。

// Type-switch做类型判断，type-switch 时不允许有 fallthrough
// Type-switch让我们在处理未知类型的数据时，比如解析 json 等编码的数据，会非常方便。
var value interface{}

switch str := value.(type) {
case string:
	fmt.Println("value类型断言结果为string:", str)

case Stringer:
	fmt.Println("value类型断言结果为Stringer:", str)

default:
	fmt.Println("value类型不在上述类型之中")
}


2.Comma-ok断言
测试一个值是否实现了某个接口（Comma-ok断言）

// Comma-ok断言
var varI I
varI = T("Tstring")
if v, ok := varI.(T); ok { // 类型断言
	fmt.Println("varI类型断言结果为：", v) // varI已经转为T类型
	varI.f()
}

类型实现不同的接口将拥有不同的行为方法集合，这就是多态的本质。

// ===========示例
type I interface {
	f()
}

type T string

func (t T) f() {
	fmt.Println("T Method")
}

type Stringer interface {
	String() string
}

func main() {

	// 类型断言
	var varI I
	varI = T("Tstring")
	if v, ok := varI.(T); ok { // 类型断言
		fmt.Println("varI类型断言结果为：", v) // varI已经转为T类型
		varI.f()
	}

	// Type-switch做类型判断
	var value interface{} // 默认为零值 nil

	switch str := value.(type) {
	case string:
		fmt.Println("value类型断言结果为string:", str)

	case Stringer:
		fmt.Println("value类型断言结果为Stringer:", str)

	default:
		fmt.Println("value类型不在上述类型之中")
	}

	// Comma-ok断言
	value = "类型断言检查"
	str, ok := value.(string)
	if ok {
		fmt.Printf("value类型断言结果为：%T\n", str) // str已经转为string类型
	} else {
		fmt.Printf("value不是string类型 \n")
	}
}

// 程序输出：
// varI类型断言结果为： Tstring
// T Method
// value类型不在上述类型之中
// value类型断言结果为：string


在Go语言中，一个接口值(Interface Value)其实是由两部分组成：type :value 。所以在做类型断言时，变量只能是接口类型变量，断言得到的值其实是接口值中对应的类型名。这在后面讨论reflect反射包时将会有更深入的说明。
```

### 接口与动态类型

```go
Go 语言中没有类，数据（结构体或更一般的类型）和方法是一种松耦合的正交关系。Go 语言中的接口必须提供一个指定方法集的实现，但是更加灵活通用：任何提供了接口方法实现代码的类型都隐式地实现了该接口，而不用显式地声明。该特性允许我们在不改变已有的代码的情况下定义和使用新接口。


接收一个（或多个）接口类型作为参数的函数，其实参可以是任何实现了该接口的类型。 实现了某个接口的类型可以被传给任何以此接口为参数的函数 。


Go 语言动态类型的实现通常需要编译器静态检查的支持：当变量被赋值给一个接口类型的变量时，编译器会检查其是否实现了该接口的所有方法。我们也可以通过类型断言来检查接口变量是否实现了相应类型。

因此 Go 语言提供了动态语言的优点，却没有其他动态语言在运行时可能发生错误的缺点。Go 语言的接口提高了代码的分离度，改善了代码的复用性，使得代码开发过程中的设计模式更容易实现。
```

### 接口的继承

```go
当一个类型包含（内嵌）另一个类型（实现了一个或多个接口）时，这个类型就可以使用（另一个类型）所有的接口方法。

类型可以通过继承多个接口来提供像多重继承一样的特性：

type ReaderWriter struct {
    io.Reader
    io.Writer
}
```

## 第二十章 方法
