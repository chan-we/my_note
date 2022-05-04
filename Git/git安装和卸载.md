# Linux

## 安装

更新 最新的 apt-get

```sh
apt-get update -y
apt-get upgrade -y
```

安装

```sh
 apt install git
```



## 卸载

```sh
apt-get remove git
```

查看是否删除成功

```sh
git --version
```

彻底删除

找到git路径

```sh
which -a git
```

![image-20220504165653402](http://picgo.chanwe.top/202205041656488.png)

进入文件夹

```sh
cd /usr/bin
```

删除

```sh
sudo rm -rf git
```

