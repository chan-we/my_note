<https://blog.csdn.net/qq_35430000/article/details/88046136>

# ES7

ES7新增了一个`Array.prototype.includes`的数组方法，用于返回一个布尔值表示数组是否包含指定元素。

```js
let boolean = array.includes(searchElement[, fromIndex])
```

结合filter方法可以实现求并集，交集和差集

```js
let a = [1, 2, 3],b = [2, 4, 5]

// 并集
let union = a.concat(b.filter(v => !a.includes(v))) // [1,2,3,4,5]

// 交集
let intersection = a.filter(v => b.includes(v))	//

// 差集
let difference = a.concat(b).filter(v => !a.includes(v) || !b.includes(v)) // [1,3,4,5]
```



