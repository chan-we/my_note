# 生成SSH密钥

通过`ssh-keygen`命令生成新的密钥，下面使用的是Ed25519算法

```sh
ssh-keygen -t ed25519 -C "[邮箱]"
```

密钥保存在`C:\Users\[用户名]\.ssh`

生成的密钥文件名默认为`id_[算法名]`

# 配置SSH密钥

来到GitHub的设置界面

![image-20220422170220570](http://picgo.chanwe.top/202204221702654.png)

选择`SSH and GPG keys`

**![image-20220422170241993](http://picgo.chanwe.top/202204221702091.png)**

点击`New SSH key`

![image-20220422170300906](http://picgo.chanwe.top/202204221703982.png)

将生成的公钥复制进去（后缀名为`.pub`）



如果ssh仍然无效，可以选择[切换连接协议](./切换连接协议)