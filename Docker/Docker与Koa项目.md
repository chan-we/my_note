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