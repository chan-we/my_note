# 设置镜像

npm

```plain
npm config set registry http://registry.npm.taobao.org
```
 yarn
```plain
yarn config set registry https://registry.npmmirror.com/
```
# 查看设置

 npm

```plain
npm get registry 
```
yarn
```plain
yarn config get registry
```
# 还原地址

npm

```plain
npm config set registry https://registry.npmjs.org/
```
 yarn
```plain
yarn config set registry https://registry.yarnpkg.com
```
#  镜像管理工具

npm

```javascript
npm install -g nrm 
nrm ls
nrm use taobao
```
yarn
```javascript
yarn global add yrm
yrm ls
yrm use taobao
```

