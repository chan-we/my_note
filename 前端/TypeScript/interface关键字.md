# 介绍

TypeScript的核心原则之一是对值所具有的结构进行类型检查。 在TypeScript里，接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约。

# 简单例子

```ts
interface LabelledValue {
  label: string;
}
```

LabelledValue接口就好比一个名字，用来描述上面例子里的要求。 它代表了有一个label属性且类型为string的对象。
类型检查器不会去检查属性的顺序，只要相应的属性存在并且类型也是对的就可以。

# 可选属性

带有可选属性的接口与普通的接口定义差不多，只是在可选属性名字定义的后面加一个`?`符号。

```ts
interface SquareConfig {
  color?: string;
  width?: number;
}
```

# 只读属性

一些对象属性只能在对象刚刚创建的时候修改其值。你可以在属性名前用`readonly`来指定只读属性:
```ts
interface Point {
    readonly x: number;
    readonly y: number;
}
```
你可以通过赋值一个对象字面量来构造一个Point。 赋值后，x和y再也不能被改变了。
```ts
let p1: Point = { x: 10, y: 20 };
p1.x = 5; // error!
```
## readonly和const的区别
最简单判断该用readonly还是const的方法是看要把它做为变量使用还是做为一个属性。 做为变量使用的话用const，若做为属性则使用readonly。

# 函数类型
接口能够描述JavaScript中对象拥有的各种各样的外形。 除了描述带有属性的普通对象外，接口也可以描述函数类型。
```ts
interface SearchFunc {
  (source: string, subString: string): boolean;
}
```

# 可索引的类型
可索引类型具有一个索引签名，它描述了对象索引的类型，还有相应的索引返回值类型。 
```ts
interface StringArray {
[index: number]: string;
}
``` 
共有支持两种索引签名：字符串和数字。 可以同时使用两种类型的索引，但是数字索引的返回值必须是字符串索引返回值类型的子类型。 这是因为当使用number来索引时，JavaScript会将它转换成string然后再去索引对象。 也就是说用100（一个number）去索引等同于使用"100"（一个string）去索引，因此两者需要保持一致。

