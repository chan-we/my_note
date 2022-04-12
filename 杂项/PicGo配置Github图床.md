# PicGo VsCode插件

## 设置Github Token

进入如下页面设置Github Token:  

[https://github.com/settings/tokens](%E2%80%B8https://github.com/settings/tokens)

务必记住生成的Token，无法再次查看

## 配置设置

进入设置  

![PicGo配置Github图床-2022-03-15-18-00-10-PicGo配置Github图床-image-2022-03-15-17-45-27](http://picgo.chanwe.top/202204121709421.png)  

修改配置  

![](http://picgo.chanwe.top/202204121709422.png)  

**记得保持仓库可见性为public，否则图片可能无法加载**

# PicGo应用

去[官网](https://picgo.github.io/PicGo-Doc/zh/guide/#%E4%B8%8B%E8%BD%BD%E5%AE%89%E8%A3%85)下载PicGo应用

设置Github图床

![image-20220317233142204](http://picgo.chanwe.top/202204121709423.png)

## 解决 tunneling socket could not be established问题

### 方案一

系统关闭代理，不要使用代理上网。

### 方案二（实测有效）

npm 代理的问题

在终端输入以下命令行尝试取消 npm 的代理

```shell
npm config delete proxy
npm config delete https-proxy
```

修改后重启应用

### 方案三

如果在环境变量中配置过在环境变量`http_proxy` 和 `https_proxy`，把里面的 `http_proxy` 和 `https_proxy` 两项删除即可。

