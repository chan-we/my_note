[interface 和 type 的区别](https://juejin.cn/post/6844903749501059085)  
type关键字有两种用法：类型别名和字符串字面量类型

# 类型别名
类型别名用来给一个类型起个新名字。
```ts
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
    if (typeof n === 'string') {
        return n;
    } else {
        return n();
    }
}
```
类型别名常用于[联合类型](./%E8%81%94%E5%90%88%E7%B1%BB%E5%9E%8B.md)。

# 字符串字面量类型
字符串字面量类型用来约束取值只能是某几个字符串中的一个。

```ts
type EventNames = 'click' | 'scroll' | 'mousemove';
function handleEvent(ele: Element, event: EventNames) {
    // do something
}

handleEvent(document.getElementById('hello'), 'scroll');  // 没问题
handleEvent(document.getElementById('world'), 'dblclick'); // 报错，event 不能为 'dblclick'
```
上例中，我们使用 type 定了一个字符串字面量类型 EventNames，它只能取三种字符串中的一种。