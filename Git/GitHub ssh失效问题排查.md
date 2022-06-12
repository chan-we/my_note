# SSH失效问题排查

当你使用Github Desktop出现认证问题

![image-20220422165504955](http://picgo.chanwe.top/202204221655024.png)

或者使用命令行时出现以下提示

![image-20220422165542881](http://picgo.chanwe.top/202204221655937.png)

可以通过以下命令判断ssh是否生效

```sh
ssh -T git@github.com
```

如果提示如下则表示失效

![image-20220422165611837](http://picgo.chanwe.top/202204221656897.png)