参考资料：<https://github.com/vuejs/rfcs/blob/master/active-rfcs/0023-scoped-styles-changes.md#deep-selectors>

在Vue3中，==弃用==了对`>>>`和`/deep/`的支持

`::v-deep`仍可使用但会发出**弃用警告**

在Vue3中，应当使用`::v-deep()`，或者使用更短的`:deep()`变体，他们的工作原理是等价的

示例：

```scss
& :deep(.target) {
    width: 100%;
}
```





