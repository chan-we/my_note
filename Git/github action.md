# 入门

在项目根目录中创建.github/workflows文件夹，可以在里面添加github action的脚本，脚本为yml格式，可以有多个脚本

![img](http://picgo.chanwe.top/202204180056948.png)


[ssh-keygen的使用方法及配置authorized_keys两台linux机器相互认证_dongwuming的专栏-CSDN博客](https://blog.csdn.net/dongwuming/article/details/9705595)


[﻿https://juejin.cn/post/6931318429420879879](https://juejin.cn/post/6931318429420879879)


[手把手教你用 Github Actions 部署前端项目 - 云+社区 - 腾讯云](https://cloud.tencent.com/developer/article/1816853)


```yaml
name: Build And Deploy To Aliyun ECS

on:                               # 该 CI/CD 触发时的事件
  push:                           # 只要push代码 就触发流程，更多触发事件请参考官方文档
    branches: [ master ]
  pull_request:
    branches: [ master ]     

jobs:                             # 需要执行的任务，可以有多个任务，所有的 job 都是并行的，但往往会有依赖关系
  build:
    runs-on: ubuntu-latest        # github分配的运行平台，2-core CPU/7 GB of RAM memory/14 GB of SSD disk space
    strategy:
      matrix:
        node-version: [14.x]
    steps:                        # 某个任务的一系列步骤,如前端需要安装依赖，编译打包代码等等
    - uses: actions/checkout@v2          #选择一个 现有的action，执行你的操作
      with:
        persist-credentials: false
        ref: master 
        submodules: true
    - name: Use Node.js ${{ matrix.node-version }}  #在虚拟机上打包
      uses: actions/setup-node@v2
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'
    - run: npm ci # 约等于npm install 可替换
    - run: npm run build --if-present
    - run: npm test # npm run test简写，可删除这行
    - name: Deploy to aliyun server        # 为 step 指定一个名称，将会在 github action 的控制台中显示
      uses: easingthemes/ssh-deploy@v2.1.5      #可以访问的仓库，实现的上传服务器步骤被封装在此action
      env:
        SSH_PRIVATE_KEY: ${{ secrets.DEPLOY_KEY }}  #这个是阿里云的私钥
        ARGS: "-avzr --delete"
        SOURCE: "./dist/"
        REMOTE_HOST: ${{ secrets.SSH_HOST }}    #阿里云的 ip
        REMOTE_USER: ${{ secrets.SSH_USERNAME }}    #阿里云用户
        TARGET: "/www/wwwroot/test.chanwe.top"       #被部署的服务器路径 



```
# 使用self-hosted runner

按照上面的配置，程序是运行在Github提供的虚拟机上的，如果有需要程序运行在自己的机器上的需求的话，可以配置self-hosted runner

在一个仓库中来到以下界面，创建一个新的self-hosted runner

![img](http://picgo.chanwe.top/202204180056512.png)


## 下载

创建文件夹（本例在/usr/local/bin中创建）

```dart
mkdir actions-runner && cd actions-runner 
```
下载包
注意：以下命令仅供参考，不要使用旧版本的包，否则会在运行runner的时候要求升级，最新版本的包Github会在页面中提供

```plain
curl -o actions-runner-linux-x64-2.286.1.tar.gz -L https://github.com/actions/runner/releases/download/v2.286.1/actions-runner-linux-x64-2.286.1.tar.gz
```
解压
```plain
tar xzf ./actions-runner-linux-x64-2.286.1.tar.gz
```
## 配置

给予权限

```dart
sudo chmod 777 actions-runner 
```
配置仓库（仓库地址和token会在创建新的self-hosted runner页面提供）
注意运行这个命令不能使用root权限

```plain
./config.sh --url <仓库地址> --token <token>
```
运行
```plain
./run.sh
```
将Github Action的配置文件中的runs-on属性值更改为self-hosted
```yaml
runs-on: self-hosted 
```

