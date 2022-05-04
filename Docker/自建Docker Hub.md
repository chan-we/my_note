<https://www.jianshu.com/p/624e3b1746de>

# Docker Desktop访问自建仓库

选择设置

![image-20220505020120295](http://picgo.chanwe.top/202205050201390.png)

选择Docker Engine

**![image-20220505020148351](http://picgo.chanwe.top/202205050201427.png)**

修改配置文件

```json
{
  //...
    
  // 当仓库不能使用HTTPS时x
  "insecure-registries": [
    "example.com"
  ],
  "registry-mirrors": [
    "http://example.com"
  ]
}
```

点击`Apply & Restart`

![image-20220505022157400](http://picgo.chanwe.top/202205050221465.png)
