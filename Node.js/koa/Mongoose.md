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

## 创建和修改文档

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

## 搜索记录

可以使用查询方法搜索记录，查询条件可列在 JSON 文档中。以下代码展示了如何在数据库中找到所有网球运动员，并返回运动员姓名和年龄字段。这里只指定了一个匹配字段（运动项目，`sport`），也可以添加更多条件，指定正则表达式，或去除所有条件以返回所有运动员。

```js
const Athlete = mongoose.model('Athlete', yourSchema);

// SELECT name, age FROM Athlete WHERE sport='Tennis'
Athlete.find(
  { 'sport': 'Tennis' },
  'name age',
  function (err, athletes) {
    if (err) {
      return handleError(err);
    } // 'athletes' 中保存一个符合条件的运动员的列表
  }
);
```

### 回调

若像上述代码那样指定回调，则查询将立即执行。搜索完成后将调用回调。

Mongoose 中所有回调都使用 `callback(error, result)` 模式。如果查询时发生错误，则参数 `error` 将包含错误文档，`result` 为 `null`。如果查询成功，则 `error`为 `null`，查询结果将填充至 `result` 。

若未指定回调，则 API 将返回 [Query](http://mongoosejs.com/docs/api.html#query-js) 类型的变量。可以使用该查询对象来构建查询，随后使用 `exec()` 方法执行（使用回调）。

```js
// 寻找所有网球运动员
const query = Athlete.find({ 'sport': 'Tennis' });

// 查找 name, age 两个字段
query.select('name age');

// 只查找前 5 条记录
query.limit(5);

// 按年龄排序
query.sort({ age: -1 });

// 以后某个时间运行该查询
query.exec(function (err, athletes) {
  if (err) {
    return handleError(err);
  } // athletes 中保存网球运动员列表，按年龄排序，共 5 条记录
})
```

上面的代码还可以改为链式调用

```js
Athlete.
  find().
  where('sport').equals('Tennis').
  where('age').gt(17).lt(50).  // 附加 WHERE 查询
  limit(5).
  sort({ age: -1 }).
  select('name age').
  exec(callback); // 回调函数的名字是 callback
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