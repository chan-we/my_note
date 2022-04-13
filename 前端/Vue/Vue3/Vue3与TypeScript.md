# 支持Typescript

安装@vue/cli@next（如果没有的话）

```plain
npm install -g @vue/cli@next
```
如果已经有一个不存在TypeScript的 Vue CLI项目，请添加适当的 Vue CLI插件
安装插件后App.vue会被初始化，建议在项目一开始就安装插件

```plain
vue add typescript
```
因为typescript插件安装的包可能有版本落后，有可能出现编译没问题但打包报错的情况，遇到这种情况可以手动升级typescript包的版本
如果已有Typescript插件，请确保组件的 script 部分已将语言设置为 TypeScript，如果不设置则为JavaScript

```html
<script lang="ts">
  ...
</script>
```
 如果没有tsconfig.json，使用如下命令生成
```plain
tsc --init
```
推荐配置：
```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    // 这样就可以对 `this` 上的数据属性进行更严格的推断`
    "strict": true,
    "jsx": "preserve",
    "moduleResolution": "node"
  }
}
```

