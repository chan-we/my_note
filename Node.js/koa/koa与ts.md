<https://cnodejs.org/topic/5eb29441e785ec40b04fad61>

# 安装

安装ts和nodemon

```sh
yarn add typescript ts-node nodemon --dev
```

安装koa和koa router

```sh
yarn add koa koa-router 
yarn add @types/koa @types/koa-router --dev
```

# tsconfig.json

初始化，可不做修改

```sh
tsc --init
```

参考配置

```json
{
	"compileOptions": {
    "experimentalDecorators": true,
    "target": "ES5", 
    "module": "commonjs",
    "allowJs": true, 
    "declaration": true,
    "outDir": "dist",
    "strict": true, 
    "moduleResolution": "node", 
    "esModuleInterop": true, 
    "inlineSourceMap": true, 
    "forceConsistentCasingInFileNames": true
	},
	"compileOnSave": true,
  "include": ["src/**/*"],
  "exclude": ["node_module/**/*", "**/*.test.ts"]
}
```

# 运行

请确认已安装了`ts-node`和`nodemon`

注意后缀名是ts

```sh
nodemon app.ts
```

