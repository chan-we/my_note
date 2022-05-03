<https://demopark.github.io/koa-docs-Zh-CN/api/context.html>

# 别名

以下访问器和 [Response](https://demopark.github.io/koa-docs-Zh-CN/api/response.html) 别名等效：

- `ctx.body`
- `ctx.body=`
- `ctx.status`
- `ctx.status=`
- `ctx.message`
- `ctx.message=`
- `ctx.length=`
- `ctx.length`
- `ctx.type=`
- `ctx.type`
- `ctx.headerSent`
- `ctx.redirect()`
- `ctx.attachment()`
- `ctx.set()`
- `ctx.append()`
- `ctx.remove()`
- `ctx.lastModified=`
- `ctx.etag=`

# status

设置HTTP响应码，具体见：<https://www.runoob.com/http/http-status-codes.html>

默认为`404`，如果设置了body属性而没有设置status属性，则自动设置为`200`或`204`（当`ctx.body`的值为`undefined`或`null`时）

手动设置：

```js
ctx.status = 200;
```

# body

将响应体设置为以下之一：

- `string` 写入
- `Buffer` 写入 
- `Stream` 管道
- `Object`、`Array`（JSON格式）
- `null` 、`undefined` 无内容响应（自动设置状态码`204`）

## String

Content-Type 默认为 `text/html` 或 `text/plain`, 同时默认字符集是 utf-8。Content-Length 字段也是如此。

## Buffer

Content-Type 默认为 `application/octet-stream`, 并且 Content-Length 字段也是如此。

## Stream

Content-Type 默认为 `application/octet-stream`。

每当流被设置为响应主体时，`.onerror` 作为侦听器自动添加到 `error` 事件中以捕获任何错误。此外，每当请求关闭（甚至过早）时，流都将被销毁。如果你不想要这两个功能，请勿直接将流设为主体。例如，当将主体设置为代理中的 HTTP 流时，你可能不想要这样做，因为它会破坏底层连接。

参阅: https://github.com/koajs/koa/pull/612 获取更多信息。

以下是流错误处理的示例，而不会自动破坏流：

```js
const PassThrough = require('stream').PassThrough;

app.use(async ctx => {
  ctx.body = someHTTPStream.on('error', (err) => ctx.onerror(err)).pipe(PassThrough());
});
```

## Object

Content-Type 默认为 `application/json`. 这包括普通的对象 `{ foo: 'bar' }` 和数组 `['foo', 'bar']`

# cookie

koa使用的cookie模块：<https://github.com/pillarjs/cookies>

## 设置cookie

```js
ctx.cookies.set(name, value, [options])
```

通过 `options` 设置 cookie `name` 的 `value` :

- `maxAge`: 一个数字, 表示从 `Date.now()` 得到的毫秒数.
- `expires`: 一个 `Date` 对象, 表示 cookie 的到期日期 (默认情况下在会话结束时过期).
- `path`: 一个字符串, 表示 cookie 的路径 (默认是`/`).
- `domain`: 一个字符串, 指示 cookie 的域 (无默认值).
- `secure`: 一个布尔值, 表示 cookie 是否仅通过 HTTPS 发送 (HTTP 下默认为 `false`, HTTPS 下默认为 `true`). [阅读有关此参数的更多信息](https://github.com/pillarjs/cookies#secure-cookies).
- `httpOnly`: 一个布尔值, 表示 cookie 是否仅通过 HTTP(S) 发送，, 且不提供给客户端 JavaScript (默认为 `true`).
- `sameSite`: 一个布尔值或字符串,  表示该 cookie 是否为 “相同站点” cookie (默认为 `false`). 可以设置为 `'strict'`, `'lax'`, `'none'`, 或 `true` (映射为 `'strict'`).
- `signed`: 一个布尔值, 表示是否要对 cookie 进行签名 (默认为 `false`). 如果为 `true`, 则还会发送另一个后缀为 `.sig` 的同名 cookie, 使用一个 27-byte url-safe base64 SHA1 值来表示针对第一个 [Keygrip](https://www.npmjs.com/package/keygrip) 键的 *cookie-name*=*cookie-value* 的哈希值. 此签名密钥用于检测下次接收 cookie 时的篡改.
- `overwrite`: 一个布尔值, 表示是否覆盖以前设置的同名的 cookie (默认是 `false`). 如果是 true, 在同一个请求中设置相同名称的所有 Cookie（无论路径或域）是否在设置此Cookie 时从 Set-Cookie 消息头中过滤掉.

## 获取cookie

```js
ctx.cookies.get(name,[options])
```



