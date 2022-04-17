# Linux

## 下载

[MongoDB Community Server下载](https://www.mongodb.com/try/download/community)

![image-20220417215251993](http://picgo.chanwe.top/202204172152075.png)

## 安装

```powershell
#解压
tar -zxvf mongodb-linux-x86_64-ubuntu1604-4.2.8.tgz   
#移动到指定的目录
mv mongodb-src-r4.2.8  /usr/local/mongodb4  
#创建数据存储目录
sudo mkdir -p /var/lib/mongo 
#创建日志目录
sudo mkdir -p /var/log/mongodb
#设置权限
sudo chown `whoami` /var/lib/mongo     
sudo chown `whoami` /var/log/mongodb   
```
## 配置环境变量

[设置环境变量](../../Linux/设置环境变量.md)

## 启动服务

```powershell
mongod --dbpath /var/lib/mongo --logpath /var/log/mongodb/mongod.log --fork
```
## 以配置文件启动（推荐）

首先编写配置文件，我们把配置文件放在/etc目录下

```plain
touch /etc/mongodb.conf
```
### 一份常用的配置文件

```plain
dbpath = /var/lib/mongo
logpath = /var/log/mongodb/mongod.log
logappend = true

bind_ip = 0.0.0.0
port = 27017

fork = true
journal = true

auth = true
```
 更多见[配置文件详解](./配置文件详解.md) 

### 启动

```plain
mongod --config /etc/mongodb.conf
```

## 设置开机启动

创建service文件

```sh
vim /lib/systemd/system/mongodb.service
```

配置以下内容（注意路径是否正确）

```
[Unit]
Description=mongodb   
After=network.target remote-fs.target nss-lookup.target
  
[Service]  
Type=forking  
ExecStart=/usr/local/mongodb/bin/mongod --config /etc/mongodb.conf
ExecReload=/bin/kill -s HUP $MAINPID
ExecStop=/usr/local/mongodb/bin/mongod --shutdown --config /etc/mongodb.conf
PrivateTmp=true  
    
[Install]  
WantedBy=multi-user.target

```

重新加载配置

```sh
systemctl daemon-reload
```

开启开机启动

```sh
systemctl enable mongodb.service
```

# Docker

[MongoDB镜像库](https://hub.docker.com/_/mongo?tab=tags&page=1)

拉取最新镜像

```
docker pull mongo:latest
```

查看本地镜像，判断是否已安装了mongo镜像

```
docker images
```

运行容器

安装完成后，我们可以使用以下命令来运行 mongo 容器：

```
docker run -itd --name mongo -p 27017:27017 mongo --auth
```

参数说明：

- **-p 27017:27017** ：映射容器服务的 27017 端口到宿主机的 27017 端口。外部可以直接通过 宿主机 ip:27017 访问到 mongo 的服务。
- **--auth**：需要密码才能访问容器服务。
