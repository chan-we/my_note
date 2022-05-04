# 使用Dokcerfile

在Dockerfilesuo'zai

```sh
docker build -t <镜像名>:<镜像标签> .
```

# 构建一个React项目镜像

Dockerfile:

```yaml
# 设置基础镜像
FROM node:14

# 设置工作目录
WORKDIR /app

# 把/app/node_modules/.bin加入到环境变量中
ENV PATH /app/node_modules/.bin:$PATH

# 安装依赖
COPY package.json ./
RUN npm install --registry=https://registry.npm.taobao.org
RUN npm install react-scripts@3.4.1 -g 

# 添加代码
COPY . ./

# 启动项目
CMD ["npm","start"]
```

创建`.dockerignore`文件

```
node_modules
build
.dockerignore
Dockerfile
Dockerfile.prod
```



