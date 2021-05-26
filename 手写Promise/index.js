function MyPromise(executor) {

    var PENDING = 'PENDING';
    var FULFILLED = 'FULFILLED';
    var REJECTED = 'REJECTED';

    var _this = this;

    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;
    var resolve = function (value) {
        if (_this.status === PENDING) {
            _this.status = FULFILLED;
            _this.value = value;
        }
    }
    var reject = function (reason) {
        if (_this.status === PENDING) {
            _this.status = REJECTED;
            _this.reason = reason;
        }
    }
    try {
        executor(resolve, reject);
    } catch (err) {
        reject(err);
    }

    // 包含一个 then 方法，并接收两个参数 onFulfilled、onRejected
    this.then = function (onFulfilled, onRejected) {
        if (_this.status === FULFILLED) {
            onFulfilled(_this.value);
        }
        if (_this.status === REJECTED) {
            onRejected(_this.reason)
        }
    }

}




var promise = new MyPromise(function (resolve, reject) {
    resolve('成功');
}).then(
    (data) => {
        console.log('success', data)
    },
    (err) => {
        console.log('faild', err)
    }
)

var promise2 = new MyPromise(function (resolve, reject) {
    reject('失败');
}).then(
    (data) => {
        console.log('success', data)
    },
    (err) => {
        console.log('faild', err)
    }
)