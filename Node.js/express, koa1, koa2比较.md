 koa2与koa1的最大区别是koa2实现异步是通过async/await，koa1实现异步是通过generator/yield，而express实现异步是通过回调函数的方式。
  koa2与express 提供的API大致相同，express是大而全，内置了大多数的中间件，更让人省心，koa2不绑定任何的框架，干净简洁，小而精，更容易实现定制化，扩展性好。
  express是没有提供ctx来提供上下流服务，需要更多的手动处理，express本身是不支持洋葱模型的数据流入流出能力的，需要引入其他的插件。