<https://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html>

# 跨域认证的问题

互联网服务离不开用户认证。一般流程是下面这样。

1. 用户向服务器发送用户名和密码。

2. 服务器验证通过后，在当前对话（session）里面保存相关数据，比如用户角色、登录时间等等。

3. 服务器向用户返回一个 session_id，写入用户的 Cookie。

4. 用户随后的每一次请求，都会通过 Cookie，将 session_id 传回服务器。

5. 服务器收到 session_id，找到前期保存的数据，由此得知用户的身份。

这种模式的问题在于，扩展性（scaling）不好。单机当然没有问题，如果是服务器集群，或者是跨域的服务导向架构，就要求 session 数据共享，每台服务器都能够读取 session。

举例来说，A 网站和 B 网站是同一家公司的关联服务。现在要求，用户只要在其中一个网站登录，再访问另一个网站就会自动登录，请问怎么实现？

一种解决方案是 session 数据持久化，写入数据库或别的持久层。各种服务收到请求后，都向持久层请求数据。这种方案的优点是架构清晰，缺点是工程量比较大。另外，持久层万一挂了，就会单点失败。

另一种方案是服务器索性不保存 session 数据了，所有数据都保存在客户端，每次请求都发回服务器。JWT 就是这种方案的一个代表。

# JWT原理

JWT 的原理是，服务器认证以后，生成一个 JSON 对象，发回给用户，就像下面这样

```js
{
    "姓名": "张三",
    "角色": "管理员",
    "到期时间": "2022年3月21日0点0分"
}
```

以后，用户与服务端通信的时候，都要发回这个 JSON 对象。服务器完全只靠这个对象认定用户身份。为了防止用户篡改数据，服务器在生成这个对象的时候，会加上签名（详见后文）。

服务器就不保存任何 session 数据了，也就是说，服务器变成无状态了，从而比较容易实现扩展。

# 使用

安装

```sh
npm install jsonwebtoken
```

示例代码：

```javascript
const jwt = require('jsonwebtoken');

const TokenUtil = {

  sign: function(userName){
    const payload = { userName };
    var token = jwt.sign(payload, privateKey);
    console.log(`token = ${token}`);
    return token;
  },

  verify: function(token){
    var decoded = jwt.verify(token, privateKey);
    // console.log('decoded = '+decoded);
    console.log('decoded = '+JSON.stringify(decoded));
  },

  main: function(){
    let str = this.sign('zhang3');
    this.verify(str);
  }

}
```