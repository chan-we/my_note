playground: <https://www.sassmeister.com/>

# 变量

使用`$`符号定义一个变量，变量中可以使用连字符和下划线
变量的值可以是数字、颜色、字符串等
在变量里也可以引用其他变量
例：

```scss
$primary-color: #1269b5; // 注意要有分号
$primary-border: 1px solid $primary-color;

div {
  background-color: $primary-color;
  border: $primary-border;
}
```

# 嵌套

```scss
div {
  font-size: 10px;
  ul {
    color: red;
    li {
      border: 1px solid grey;
    }
  }
}
```

等价于

```css
div {
  font-size: 10px;
}
div ul {
  color: red;
}
div ul li {
  border: 1px solid grey;
}
```

## 嵌套时使用&指代父选择器的名称

使用&符号代替父选择器名称（第二个例子解释）
如下案例：

```scss
// 错误示例
div {
  color: red;
  :hover {
    color: blue;
  }
}
```

转为 css 结果为：

```css
div {
  color: red;
}
div :hover {
  color: blue;
}
```

这并不是我们想要的结果
使用&符号代替父选择器

```scss
// 正确示例
div {
  color: red;
  &:hover {
    color: blue;
  }
}
```

转为 css 结果为：

```css
div {
  color: red;
}
div:hover {
  color: blue;
}
```

因为&只替换父选择器名称，所以可以有以下写法：

```scss
.header {
  margin: 0;
  & &-font {
    margin-left: 10px;
  }
}
```

转为 css：

```css
.header {
  margin: 0;
}
.header .header-font {
  margin-left: 10px;
}
```

## 属性嵌套

类似 JS 的 with 语句，你可以对属性也进行嵌套

```scss
div {
  border: 1px solid grey {
    left: 0;
    right: 0;
  }
}
```

转为 css

```css
div {
  border: 1px solid grey;
  border-left: 0;
  border-right: 0;
}
```

# @mixin 混合器

## 语法

```scss
// 不带参数
@mixin <名称> {
  ...
}

// 带参数
@mixin <名称>(<参数1>,<参数2>,...){
  ...
}

<选择器>{
  @include <名称>  // 使用include关键字+上面定义的名称来使用
}
```

## 不带参数

示例：

```scss
@mixin tip {
  color: red;
  p {
    color: green;
  }
}

div {
  @include tip;
}
```

转为 css:

```scss
div {
  color: red;
}
div p {
  color: green;
}
```

## 带参数

在定义的 mixin 后面加上括号，可以在里面添加参数，`注意参数需要以$开头`
如果 mixin 设置了参数，那么使用混合器的时候必须传入参数，除非设置了默认参数（见下）
mixin 参数和外部参数同名，优先选择 mixin 传入的参数

```scss
$text-color: grey;

@mixin tip($text-color) {
  color: red;
  p {
    color: $text-color; // 优先选择传入的参数
  }
}

div {
  @include tip(blue);
}
```

转为 css:

```css
div {
  color: red;
}
div p {
  color: blue;
}
```

也可以使用命名的方式设置参数，这在有多个参数的时候非常有用

```scss
div {
  @include tip($text-color: blue);
}
```

mixin 的参数也可以设置默认参数值，这个默认参数值可以是值，也可以使用另一个形参
建议设有默认值的参数放在没有设默认值的参数的后面

```scss
@mixin link-colors($normal, $hover: $normal, $visited: redred: ) {
  color: $normal;
  &:hover {
    color: $hover;
  }
  &:visited {
    color: $visited;
  }
}
```

# 条件语句

## @if @else

用`@if`,`@else`和`@else if`关键字进行条件判断，后面括号可带可不带
示例:

```scss
@use "sass:math";

@mixin triangle($size, $color, $direction) {
  height: 0;
  width: 0;

  border-color: transparent;
  border-style: solid;
  border-width: math.div($size, 2);

  @if $direction == up {
    border-bottom-color: $color;
  } @else if $direction == right {
    border-left-color: $color;
  } @else if $direction == down {
    border-top-color: $color;
  } @else if $direction == left {
    border-right-color: $color;
  } @else {
    @error "Unknown direction #{$direction}.";
  }
}

.next {
  @include triangle(5px, black, right);
}
```

## 判断条件

sass 的@if 用`not`,`or`,`and`分别表示非，或，与
示例：

```scss
$a: false !default;
$b: true !default;

@if not($a) {
  p {
    color: red;
  }
}

div {
  font-size: 14px;
  @if $a or $b {
    width: 300px;
  }
}

li {
  line-height: 24px;
  @if $a and $b {
    float: left;
  }
}
```

用`==`,`!=`分别表示等于和不等于

```scss
$radius: 5px !default;

.box-border {
  border: 1px solid #ccc;
  padding: 10px;

  @if $radius != 0 {
    border-radius: $radius;
  }
}

$sizeClass: small !default;

.size {
  @if $sizeClass == "small" {
    padding: 5px;
  } @else {
    padding: 10px;
  }
}
```

# 循环语句

for循环有两种形式，分别为：`@for $var from $start through $end` 和 `@for $var from $start to $end` 。`$var`表示变量，`$start`表示起始值，`$end`表示结束值，这两个的区别是关键字through表示包括end这个数，而to则不包括end这个数。

示例：

```scss
@for $i from 1 through 3 {
  .item-#{$i} { width: 2em * $i; }
}
```

# 遍历列表

使用`@each`来遍历一个列表

示例：

```scss
@each $animal in puma, sea-slug, egret, salamander {
  .#{$animal}-icon {
    background-image: url('/images/#{$animal}.png');
  }
}
```

转为css：

```css
.puma-icon {
  background-image: url('/images/puma.png'); 
}
.sea-slug-icon {
  background-image: url('/images/sea-slug.png'); 
}
.egret-icon {
  background-image: url('/images/egret.png'); 
}
.salamander-icon {
  background-image: url('/images/salamander.png'); 
}
```

# @extend 继承

使用@extend 不仅会继承被继承的选择器自身的所有样式，任何跟被继承的选择器有关的组合选择器样式也会被继承

## 语法

```scss
<选择器 > {
  @extend <选择器 >;
}
示例： .alert {
  margin: 0;
}

.alert p {
  // 与.alert相关的组合样式也会被继承
  color: red;
}

.alert-info {
  @extend .alert;
  padding: 0;
}
```

转为 css：

```css
.alert,
.alert-info {
  margin: 0;
}

.alert p,
.alert-info p {
  color: red;
}

.alert-info {
  padding: 0;
}
```

## 继承的高级用法

### 继承 HTML 元素

任何 css 规则都可以继承其他规则，几乎任何 css 规则也都可以被继承。大多数情况你可能只想对类使用继承，但是有些场合你可能想做得更多。最常用的一种高级用法是继承一个 html 元素的样式。尽管默认的浏览器样式不会被继承，因为它们不属于样式表中的样式，但是你对 html 元素添加的所有样式都会被继承。
接下来的这段代码定义了一个名为 disabled 的类，样式修饰使它看上去像一个灰掉的超链接。通过继承 a 这一超链接元素来实现：

```scss
.disabled {
  color: gray;
  @extend a;
}
```

### 继承复杂选择器

假如一条样式规则继承了一个复杂的选择器，那么它只会继承这个复杂选择器命中的元素所应用的样式。举例来说， 如果.seriousError @extend .important.error ， 那么.important.error 和 h1.important.error 的样式都会被.seriousError 继承， 但是.important 或者.error 下的样式则不会被继承。这种情况下你很可能希望.seriousError 能够分别继承.important 或者.error 下的样式。
如果一个选择器序列（#main .seriousError）@extend 另一个选择器（.error），那么只有完全匹配#main .seriousError 这个选择器的元素才会继承.error 的样式，就像单个类 名继承那样。拥有 class="seriousError"的#main 元素之外的元素不会受到影响。
像#main .error 这种选择器序列是不能被继承的。这是因为从#main .error 中继承的样式一般情况下会跟直接从.error 中继承的样式基本一致
