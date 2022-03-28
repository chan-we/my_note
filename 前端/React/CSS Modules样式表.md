<https://www.html.cn/create-react-app/docs/adding-a-css-modules-stylesheet/>

本文章使用的是create react app框架

在css文件名前加上module，像这样：`[name].module.css`

如果使用的是sass，**不推荐**使用LibSass和基于它构建的包，包括Node Sass。如果当前使用的是Node Sass，卸载它并使用[Dart Sass](https://www.npmjs.com/package/sass)

> Dart Sass 是我们对它的习惯称呼，最早它在 npm 上的确是以 dart-sass 的名字发布的，不过现在它已经更名为 sass 了。

```sh
yarn remove node-sass
yarn add sass
```

使用：（建议类的命名改为**驼峰命名**）

```tsx
import styles from './Button.module.css'; // 将 css modules 文件导入为 styles


class Button extends Component {
  render() {
    // 作为 js 对象引用
    return <button className={styles.error}>Error Button</button>;
  }
}
```
