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

# 数据结构

JWT 的三个部分依次如下。

- Header（头部）
- Payload（负载）
- Signature（签名）

## Header

Header 部分是一个 JSON 对象，描述 JWT 的元数据，通常是下面的样子。

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

上面代码中，`alg`属性表示签名的算法（algorithm），默认是 HMAC SHA256（写成 HS256）；`typ`属性表示这个令牌（token）的类型（type），JWT 令牌统一写为`JWT`。

写成一行，就是下面的样子:

![image-20220412175843110](http://picgo.chanwe.top/202204121758181.png)

## Payload

Payload 部分也是一个 JSON 对象，用来存放实际需要传递的数据。JWT 规定了7个官方字段，供选用。

- iss (issuer)：签发人

- exp (expiration time)：过期时间

- sub (subject)：主题

- aud (audience)：受众

- nbf (Not Before)：生效时间

- iat (Issued At)：签发时间

- jti (JWT ID)：编号

除了官方字段，你还可以在这个部分定义私有字段，下面就是一个例子。

```json
{
  "sub": "1234567890",
  "name": "John Doe",
  "admin": true
}
```

注意，JWT 默认是不加密的，任何人都可以读到，所以不要把秘密信息放在这个部分。

这个 JSON 对象也要使用 Base64URL 算法转成字符串。

## Signature

Signature 部分是对前两部分的签名，防止数据篡改。

首先，需要指定一个密钥（secret）。这个密钥只有服务器才知道，不能泄露给用户。然后，使用 Header 里面指定的签名算法（默认是 HMAC SHA256），按照下面的公式产生签名。

```js
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret)
```

算出签名以后，把 Header、Payload、Signature 三个部分拼成一个字符串，每个部分之间用"点"（`.`）分隔，就可以返回给用户。

# 使用

<https://github.com/auth0/node-jsonwebtoken>

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