<https://cloud.tencent.com/developer/article/1921533?from=15425>

# MD5

## 简介

**MD5消息摘要算法**（英语：MD5 Message-Digest Algorithm），一种被广泛使用的[密码散列函数](https://zh.wikipedia.org/wiki/密碼雜湊函數)，可以产生出一个128位（16个字符(BYTES)）的散列值（hash value），用于确保信息传输完整一致。通常将128位MD5哈希表示为32位十六进制值。

理论上是不能破解的,因为md5采用的是不可逆算法。

有的网站上提供MD5解密,是因为有大量的存储空间来保存源码和加密后的密码,当解密时就是一个查询的过程,稍微复杂点的查询就无法完成。

这种解密方式，叫做 **字典攻击**

更多见[维基百科](https://zh.wikipedia.org/wiki/MD5)

## 使用js-md5

安装

```sh
npm install js-md5
```

引入使用

```javascript
const md5 = require('js-md5')

md5('123456')  // e10adc3949ba59abbe56e057f20f883e
```

# bcrypt.js

解决 **字典攻击** 的方式是 **加盐。**

**bcryptjs** 是 nodejs 中比较出色的一款处理加盐加密的包。

安装：

```sh
npm install bcryptjs
```

使用：

```js
// 引入 bcryptjs
const bcryptjs = require('bcryptjs')
// 原始密码
const password = '123456'
/**
 * 加密处理 - 同步方法
 * bcryptjs.hashSync(data, salt)
 *    - data  要加密的数据
 *    - salt  用于哈希密码的盐。如果指定为数字，则将使用指定的轮数生成盐并将其使用。推荐 10
 */
const hashPassword = bcryptjs.hashSync(password, 10)
/**
 * 输出
 * 注意：每次调用输出都会不一样
 */
console.log(hashPassword) // $2a$10$P8x85FYSpm8xYTLKL/52R.6MhKtCwmiICN2A7tqLDh6rDEsrHtV1W
/**
 * 校验 - 使用同步方法
 * bcryptjs.compareSync(data, encrypted)
 *    - data        要比较的数据, 使用登录时传递过来的密码
 *    - encrypted   要比较的数据, 使用从数据库中查询出来的加密过的密码
 */
const isOk = bcryptjs.compareSync(password, '$2a$10$P8x85FYSpm8xYTLKL/52R.6MhKtCwmiICN2A7tqLDh6rDEsrHtV1W')
console.log(isOk)
```

如果希望生成加密密码时能获取盐，可以这样写：

```js
const bcrypt = require('bcryptjs');
let salt = bcrypt.genSaltSync(10);
let hash = bcrypt.hashSync("B4c0/\/", salt);
```