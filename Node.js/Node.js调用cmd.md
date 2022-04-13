使用`child_process`模块的`exec`方法执行cmd命令

```js
let exec = require('child_process').exec;

function myTest() {

    return new Promise(function (resolve, reject) {

        var cmd = "ipconfig";
        exec(cmd, {
            maxBuffer: 1024 * 2000,
        }, function (err, stdout, stderr) {
            if (err) {
                console.log(err);
                reject(err);
            } else if (stderr.lenght > 0) {
                reject(new Error(stderr.toString()));
            } else {
                console.log(stdout);
                resolve();
            }
        });
    });
};

myTest();
```

上面代码仍不完善，你会发现输出的中文是乱码的

为解决乱码问题，我们先将`encoding`设置为`buffer`，然后使用[iconv-lite](https://www.npmjs.com/package/iconv-lite)模块解码，代码如下

```js
const iconv = require('iconv-lite');	// 引入iconv-lite
let exec = require('child_process').exec;

function myTest() {

    return new Promise(function (resolve, reject) {

        var cmd = "ipconfig";
        exec(cmd, {
            maxBuffer: 1024 * 2000,
            encoding: 'buffer'	// encoding设置为buffer
        }, function (err, stdout, stderr) {
            if (err) {
                console.log(err);
                reject(err);
            } else if (stderr.lenght > 0) {
                reject(new Error(stderr.toString()));
            } else {
                console.log(iconv.decode(stdout, 'cp936'));	//解码
                resolve();
            }
        });
    });
};

myTest();
```

现在输出中文不会乱码了

