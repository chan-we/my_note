[mongoose官方教程](https://mongoosejs.com/docs/guide.html)

<https://developer.mozilla.org/zh-CN/docs/learn/Server-side/Express_Nodejs/mongoose#mongoose_%E5%85%A5%E9%97%A8>

这一段将简要介绍如何将 Mongoose 连接到 MongoDB数据库，如何定义模式和模型，以及如何进行基本查询。

# 安装

```
npm install mongoose
```

# 连接到MongoDB

Mongoose 需要连接到 MongoDB 数据库。可以 `require()` 之，并通过 `mongoose.connect()` 连接到本地数据库，如下。

```js
// 导入 mongoose 模块
const mongoose = require('mongoose');

// 设置默认 mongoose 连接
const mongoDB = 'mongodb://127.0.0.1/my_database';
mongoose.connect(mongoDB);
// 让 mongoose 使用全局 Promise 库
mongoose.Promise = global.Promise;
// 取得默认连接
const db = mongoose.connection;

// 将连接与错误事件绑定（以获得连接错误的提示）
db.on('error', console.error.bind(console, 'MongoDB 连接错误：'));
```

# 定义和添加模型

模型使用 `Schema` 接口进行定义。 `Schema` 可以定义每个文档中存储的字段，及字段的验证要求和默认值。还可以通过定义静态和实例辅助方法来更轻松地处理各种类型的数据，还可以像使用普通字段一样使用数据库中并不存在的虚拟属性

`mongoose.model()` 方法将模式“编译”为模型。模型就可以用来查找、创建、更新和删除特定类型的对象。

## 定义模式

```js
// 获取 Mongoose
const mongoose = require('mongoose');

// 定义一个模式
const Schema = mongoose.Schema;

cosnt SomeModelSchema = new Schema({
    a_string: String,
    a_date: Date
});
```

## 创建模型

```js
// 定义模式
const Schema = mongoose.Schema;

const SomeModelSchema = new Schema({
    a_string: String,
    a_date: Date
});

// 使用模式“编译”模型
const SomeModel = mongoose.model('SomeModel', SomeModelSchema);
```

`mongoose.model()`第一个参数是为模型所创建集合的别名（Mongoose 将为 SomeModel 模型创建数据库集合）；第二个参数是创建模型时使用的模式；如果第一个参数和集合名称不一样，可以设置第三个参数来指定集合

字段名后面也可以跟一个对象，下面是一个例子：

```js
const schema = new Schema(
{
  name: String,
  binary: Buffer,
  living: Boolean,
  updated: { type: Date, default: Date.now },
  age: { type: Number, min: 18, max: 65, required: true },
  mixed: Schema.Types.Mixed,
  _someId: Schema.Types.ObjectId,
  array: [],
  ofString: [String], // 其他类型也可使用数组
  nested: { stuff: { type: String, lowercase: true, trim: true } }
})
```

关于选项的更多信息请参阅 [模式类型](http://mongoosejs.com/docs/schematypes.html)

##  验证

Mongoose 提供内置的和自定义的验证器，以及同步的和异步的验证器。你可以在所有情况下，指定可接受的范围或值，以及验证失败的错误消息。

内置的验证器包括：

- 所有模式类型都具有内置的required验证器。用于指定当前字段是否为保存文档所必需的。

- Number有数值范围验证器 min和 max。

- String

   有：  

  - enum：指定当前字段允许值的集合。
  - match：指定字符串必须匹配的正则表达式。
  - 字符串的最大长度 maxlength 和最小长度 minlength

字段验证的完整信息请参阅 [验证](http://mongoosejs.com/docs/validation.html)

# 使用模型

可以使用创建好的模式来创建模型。模型即数据库中可以搜索的一类文档，模型的实例即可以存取的单个文档。

更多信息请参阅：[模型](http://mongoosejs.com/docs/models.html)

## 创建和修改

可以通过定义模型的实例并调用 `save()` 来创建记录。以下示例假定 `SomeModel` 是用现有模式创建的模型（只有一个字段 "`name`" ）：

```js
// 创建一个 SomeModel 模型的实例
const awesome_instance = new SomeModel({ name: '牛人' });

// 传递回调以保存这个新建的模型实例
awesome_instance.save( function (err) {
  if (err) {
    return handleError(err);
  } // 已保存
});
```

记录的创建（以及更新、删除和查询）操作是**异步**的，可以提供一个回调函数在操作完成时调用。由于 API 遵循错误参数优先的惯例，因此回调的第一个参数必为错误值（或 `null`）。如果 API 需要返回一些结果，则将结果作为第二个参数。

还可以使用 `create()`，在定义模型实例的同时将其保存。回调的第一个参数返回错误，第二个参数返回新建的模型实例。

```js
SomeModel.create(
  { name: '也是牛人' },
  function(err, awesome_instance) {
    if (err) {
      return handleError(err);
    } // 已保存
  }
);
```

每个模型都有一个相关的连接（使用 `mongoose.model()` 时将做为默认连接）。可以通过创建新连接并对其调用 `.model()`，从而在另一个数据库上创建文档。

可以使用“圆点”加字段名来访问、修改新记录中的字段。操作后必须调用 `save()` 或 `update()` 以将改动保存回数据库。

```js
// 使用圆点来访问模型的字段值
console.log(awesome_instance.name); // 控制台将显示 '也是牛人'

// 修改字段内容并调用 save() 以修改记录
awesome_instance.name = "酷毙了的牛人";
awesome_instance.save( function(err) {
   if (err) {
     return handleError(err);
   } // 已保存
});
```

## 搜索

<https://segmentfault.com/a/1190000021010300>

使用`find()`函数来进行搜索

```javascript
Model.find(filter[, projection][, options][, callback])
```

### 参数1：filter

查询条件使用 JSON 文档的格式，JSON 文档的语法跟 [MongoDB shell](https://docs.mongodb.com/manual/reference/method/db.collection.find/) 中一致。

1. 查找全部

   ```js
   Model.find()
   Model.find({})
   ```

2. 精确查找

   ```js
   Model.find({author:'dora'})
   ```

3. 使用[操作符](https://docs.mongodb.com/manual/reference/operator/query/#query-selectors)

   **对比相关操作符**

   | 符号 | 描述                                         |
   | ---- | -------------------------------------------- |
   | $eq  | 与指定的值**相等**                           |
   | $ne  | 与指定的值**不相等**                         |
   | $gt  | **大于**指定的值                             |
   | $gte | **大于等于**指定的值                         |
   | $lt  | **小于**指定的值                             |
   | $lte | **小于等于**指定的值                         |
   | $in  | 与查询数组中指定的值中的任何一个匹配         |
   | $nin | 与查询数组中指定的值中的任何一个都**不**匹配 |

   ```javascript
   // 返回 age 字段等于 16 或者 18 的所有 document。
   Model.find({ age: { $in: [16, 18]} })
   ```

​		**逻辑相关操作符**

​		

| 符号 | 描述                                   |
| ---- | -------------------------------------- |
| $and | **满足**数组中指定的**所有**条件       |
| $nor | **不满足**数组中指定的**所有**条件     |
| $or  | 满足数组中指定的条件的**其中一个**     |
| $not | 反转查询，返回**不满足**指定条件的文档 |

​		逻辑操作符中的比较包括字段不存在的情况。

```javascript
Model.find( { age: { $not: { $lte: 16 }}})
// 返回 age 字段大于 16 或者 age 字段 不存在 的文档
```

**字段相关操作符**

| 符号                                                         | 描述                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| $exists                                                      | 匹配**存在**指定字段的文档 `{ field: { $exists: <boolean> } }` |
| [$type](https://docs.mongodb.com/manual/reference/operator/query/type/#available-types) | 返回字段属于指定**类型**的文档 `{field: { $type: <BSON type> }}` |

4. 嵌套对象字段的查找

数据如下

```javascript
{
  name: { first: "dora", last: "wang" }
}
```

精确匹配，顺序、字段都必须一致。

```javascript
Model.find({ name: { last: "wang", first: "dora" } })
// [] 找不到数据
```

使用点语法，可匹配嵌套的字段，其中字段名必须用引号引起来。

```javascript
Model.find({ 'name.last': 'wang' })
```

### 参数2：projection

指定要包含或排除哪些 document字段(也称为查询“投影”)，必须同时指定包含或同时指定排除，不能混合指定，`_id` 除外。

在 mongoose 中有两种指定方式，字符串指定和对象形式指定。

字符串指定时在排除的字段前加 `-` 号，只写字段名的是包含。

```javascript
Model.find({},'age');
Model.find({},'-name');
```

对象形式指定时，`1` 是包含，`0` 是排除。

```javascript
Model.find({}, { age: 1 });
Model.find({}, { name: 0 });
```

**使用 select() 方法定义**

```javascript
Model.find().select('name age');
Model.find().select({ name: 0 });
```

### 参数3：options

```javascript
// 三种方式实现
Model.find(filter,null,options)
Model.find(filter).setOptions(options)
Model.find(filter).<option>(xxx)
```

`options` 选项见官方文档 [`Query.prototype.setOptions()`](https://link.segmentfault.com/?enc=XVRh737dGf7W%2F8ULYVJX%2BA%3D%3D.mMgzBhHBqBl7k1I0VeK7e6j21kxXX7oBJVjdq4cUk7Mv2G96NJGLbscrpN7XF8lw%2FHaafePXSw4DuRiKuIpG6Q%3D%3D)。

- `sort`：按照[排序规则](https://link.segmentfault.com/?enc=x4MwniMvgVVo8nNRpsByNg%3D%3D.SAIxgnYwKFE4jIT67L2dvGNyixnjJcKQTwicDTEwz1HH%2Fuk%2BCYx3nD15C9tCmwlWh5VFOKsZzDqTycC07sJO4wQMtmIOzvwC6RHqePirfctdLyZDyBOTIX4PioEWxzGkZb2Y7MmAfN4rdYpauwz7lg%3D%3D)根据所给的字段进行排序，值可以是 `asc`, `desc`, `ascending`, `descending`, `1`, 和 `-1`。
- `limit`：指定返回结果的最大数量
- `skip`：指定要跳过的文档数量
- [`lean`](https://link.segmentfault.com/?enc=CH13nV4G4IP37Bw6%2Be%2BY2Q%3D%3D.cvhRe5tUrROCvRhseH5dT2rFo3P5TWrQLr2rfiJJK%2FWpXxbuYkuqaHpZLq%2BovQj0)：返回普通的 js 对象，而不是 `Mongoose Documents`。建议不需要 mongoose 特殊处理就返给前端的数据都最好使用该方法转成普通 js 对象。

```javascript
// sort 两种方式指定排序
Model.find().sort('age -name'); // 字符串有 - 代表 descending 降序
Model.find().sort({age:'asc', name:-1});
```

`sort` 和 `limit` 同时使用时，调用的顺序并不重要，返回的数据都是先排序后限制数量。

```javascript
// 效果一样
Model.find().limit(2).sort('age');
Model.find().sort('age').limit(2);
```

### 参数4：callback

- 传入

Mongoose 中所有传入 `callback` 的查询，其格式都是 `callback(error, result)` 这种形式。如果出错，则 `error` 是出错信息，`result` 是 `null`；如果查询成功，则 `error` 是 `null`， `result` 是查询结果，查询结果的结构形式是根据查询方法的不同而有不同形式的。

`find()` 方法的查询结果是数组，即使没查询到内容，也会返回 `[]` 空数组。

- 不传

不传入 `callback` 时，查询方法返回的是一个 `Query` 实例，实例继承了 [`Query` 原型](https://link.segmentfault.com/?enc=%2B5W0bDntWKOZh0SP4aRaSg%3D%3D.LO5K532ugTmqmMQr25sJ5%2BHYcAY9LbXGJuT2uHDqPCYTDBvKa1S6TKpmcDY5Peri) 上的所有方法，因此返回的实例可以链式调用其它方法，从而组成查询链。

```javascript
let query = Model.find({ name: 'Dora' });

query.select('name age -_id');
```

查询方法不传入回调函数时，获取查询数据的方式有两种：

**1. exec()**

使用 `query` 实例的 `exec()` 方法执行查询，即在链式语法的最后统一通过传入 `callback` 获取查询数据。

```javascript
// 效果一样
Model.find(
  { name: /Dora/, age: { $gte: 16, $lt: 18 } },
  'name age -_id',
  { limit: 2, sort: 'age' },
  (err,res)=>{
    if (err) return handleError(err);
    console.log(res);
  }
});

let query = Model.
  find({ name: /Dora/ }).
  where('age').gte(16).lt(18).
  select('name age -_id').
  limit(2).sort('age');

  query.exec((err, res)=> {
    if (err) return handleError(err);
    console.log(res);
  });
```

**2. then()**

使用 `query` 实例的 `then()` 方法将查询链当作 `promise` 来处理。

```javascript
query.then(
  (res) => {console.log(res)},
  (err) => {console.log(err)}
);
```

使用 `async / await` 获取查询结果。

```javascript
let res = await query;
console.log(res);
```



`find()` 方法会取得所有匹配记录，但通常你只想取得一个。以下方法可以查询单个记录：

- `findById()`：用指定 `id` 查找文档（每个文档都有一个唯一 `id`）。
- `findOne()`：查找与指定条件匹配的第一个文档。
- `findByIdAndRemove()`、`findByIdAndUpdate()`、`findOneAndRemove()`、 `findOneAndUpdate()`：通过 `id` 或条件查找单个文档，并进行更新或删除。以上是更新和删除记录的便利函数。

查询还能做更多。请参阅 [查询](http://mongoosejs.com/docs/queries.html)

## 文档间协同 —— population

可以使用 `ObjectId` 模式字段来创建两个文档/模型实例间一对一的引用，（一组 `ObjectIds` 可创建一对多的引用）。该字段存储相关模型的 id。如果需要相关文档的实际内容，可以在查询中使用 `populate()` 方法，将 id 替换为实际数据。

例如，以下模式定义了作者和简介。每个作者可以有多条简介，我们将其表示为一个 `ObjectId` 数组。每条简介只对应一个作者。“`ref`”（黑体字）告知模式分配哪个模型给该字段。

```js
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const authorSchema = Schema({
  name    : String,
  stories : [{ type: Schema.Types.ObjectId, ref: 'Story' }]
});

const storySchema = Schema({
  author : { type: Schema.Types.ObjectId, ref: 'Author' },
  title  : String
});

const Story  = mongoose.model('Story', storySchema);
const Author = mongoose.model('Author', authorSchema);
```

可以通过分配 `_id` 值来保存对相关文档的引用。下面我们创建一个作者、一条简介，并将新简介的 `author` 字段设置为新建作者的 id。

```js
const wxm = new Author({ name: '司马迁' });

wxm.save(function (err) {
  if (err) {
    return handleError(err);
  }

  // 现在库中有了作者司马迁，我们来新建一条简介
  const story = new Story({
    title: "司马迁是历史学家",
    author: wxm._id    // author 设置为作者 司马迁 的 _id。ID 是自动创建的。
  });

  story.save(function (err) {
    if (err) {
      return handleError(err);
    }  // 司马迁有了一条简介
  });
});
```

现在简介文档通过作者文档的 ID 引用了作者。可使用 `populate()` 在简介中获取作者信息，如下所示。

```js
Story
  .findOne({ title: '司马迁是历史学家' })
  .populate('author') // 使用作者 id 填充实际作者信息
  .exec(function (err, story) {
    if (err) {
      return handleError(err);
    }
    console.log('作者是 %s', story.author.name);
    // 控制台将打印 "作者是 司马迁"
  });
```

## 一模式（模型）一文件

虽然创建模式和模型没有文件结构的限制，但强烈建议将单一模式定义在单一模块（文件）中，并通过导出方法来创建模型。如下所示：

```js
// 文件：./models/somemodel.js

// Require Mongoose
const mongoose = require('mongoose');

// 定义一个模式
const Schema = mongoose.Schema;

const SomeModelSchema = new Schema({
    a_string : String,
    a_date   : Date
});

// 导出函数来创建 "SomeModel" 模型类
module.exports = mongoose.model('SomeModel', SomeModelSchema );
```

然后就可以在其它文件中，`require` 并使用该模型。下面是通过 `SomeModel` 模块来获取所有实例的方法。

```js
// 通过 require 模块来创建 SomeModel 模型
const SomeModel = require('../models/somemodel')

// 使用 SomeModel 对象（模型）来查找所有的 SomeModel 记录
SomeModel.find(callback_function);
```