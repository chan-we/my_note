<https://fe.azhubaby.com/Docker/%E5%AE%9E%E6%88%98%EF%BC%9Adockerfile%E6%9C%80%E5%B0%8F%E5%AE%9E%E8%B7%B5%E2%80%94koa%E4%B8%BA%E4%BE%8B.html>

# 编写Dockerfile文件

在项目根目录创建`.dockerignore`，需要忽略的文件或者文件夹添加在这个文件中，我们往里面添加`node_modules`

在项目根目录创建`Dockerfile`

```dockerfile
# 选择基础镜像，冒号后为版本号
FROM node:14
# 复制文件到容器
ADD . /home/www
# 进入工作目录
WORKDIR /home/www
# 安装项目依赖包
RUN npm install --registry=https://registry.npm.taobao.org
# 暴露端口
EXPOSE 3000
#开始命令
CMD ["npm","run","dev"]
```

# 生成镜像

通过命令行生成镜像，`-t`就是给镜像命名

```bash
docker build . -t chan_we/koa_server:v1.0.0
```

查看是否已生成镜像

```sh
docker images
```

![image-20220418015933203](http://picgo.chanwe.top/202204180159282.png)

# 生成容器

通过命令行生成容器

```bash
docker run -d --name [容器名] -p 3000:3000 [镜像名]
```

- -d: 后台运行
- --name: 给容器命名
- -p: 映射端口

查看容器是否生成

```sh
docker ps -a
```

![image-20220418020153808](C:\Users\chan_\AppData\Roaming\Typora\typora-user-images\image-20220418020153808.png)

# 推送到阿里云

<https://blog.kdyzm.cn/post/73>

## 配置阿里云

在dashboard搜索`容器镜像服务`，个人版是免费的，可以免费创建3个命名空间和300个镜像仓库

点击实例列表进入实例

![image-20220418023616991](http://picgo.chanwe.top/202204180236059.png)

点击访问凭证获取凭证

![image-20220418023540487](http://picgo.chanwe.top/202204180235579.png)

设置固定密码，接下来用得到

创建命名空间

![image-20220418023815013](http://picgo.chanwe.top/202204180238118.png)

- 自动创建仓库选项：当开启自动创建后，可以在控制台仓库不存在的情况下，直接推送，系统会自动创建对应的仓库。

- 默认仓库类型：命名空间可以选择公开或者私有，当你开启“自动创建仓库”功能时，这个配置才有作用。这个配置将决定系统帮你创建的仓库默认是公开还是私有。

接下来创建仓库

![image-20220418023937129](http://picgo.chanwe.top/202204180239188.png)

进入“代码源”页面，这里使用的是github，所以要先进行github授权，授权完成后选定github对应的项目，最后**取消“代码变更自动构建镜像”选项框，勾选“海外机器构建”选项框**（因为github在海外，如果不选择这个，我尝试了下，推送镜像的时候会非常慢）

![image-20220418024154895](http://picgo.chanwe.top/202204180241967.png)

## 创建workflow