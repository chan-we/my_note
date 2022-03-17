相关知识：[单文件组件](./%E5%8D%95%E6%96%87%E4%BB%B6%E7%BB%84%E4%BB%B6.md)

# 类型限定

将对象的值设为类型来限定参数的类型，这个值可以是一个对象，来进行进一步的限定，更多查看[prop验证](https://v3.cn.vuejs.org/guide/component-props.html#prop-%E9%AA%8C%E8%AF%81)

```ts
const props = defineProps({
  foo: string
  bar?: number  // 可选项
});
```

## 对数组进行类型限定

使用函数返回值的形式给数组类型做限定

```ts
const props = defineProps({
  pic: {
    type: Array as () => Array<string>,
    required: true,
    default: () => [],
  },
});
```

# 默认值

设置`default`的属性值来设置默认值

```ts
const props = defineProps({
  a: {
    type: String,
    default: "我是a",
  },
});
```

# 在 TypeScript 中使用
上面代码也能够在ts中使用，但是官方提供了以下写法

在 ts 中我们还可以直接通过类型声明定义 props 或 emits，直接在 defineProps 方法泛型传入类型就声明，defineEmits 也是同理，中下面用项目中的一个例子

```html
<script setup>
  const props = defineProps<{
    handle: "add" | "update"
    parentId: number | null
    flag: boolean
    isDir: boolean
  }>()
</script>
```

如果 props 需要使用默认值就得用 withDefaultsapi,下面是官方的例子

```ts
interface Props {
  msg?: string;
  labels?: string[];
}

const props = withDefaults(defineProps<Props>(), {
  msg: "hello",
  labels: () => ["one", "two"],
});
```
