<https://stackoverflow.com/questions/37994441/how-to-use-fs-module-inside-electron-atom-webpack-application>

<https://juejin.cn/post/6997943277131431943>



在`background.js`中设置如下配置

```js
// 下面这个配置在createWindow()函数中
webPreferences: {
	nodeIntegration: true,
	enableRemoteModule: true,
	contextIsolation: false,
}
```

