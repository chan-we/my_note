# Promise.all()

Promise.all() 方法接收一个promise的iterable类型（注：Array，Map，Set都属于ES6的iterable类型）的输入，并且只返回一个`Promise`实例， 那个输入的所有promise的resolve回调的结果是一个数组。

返回的数组中元素（请求结果）的顺序和传入的数组的元素（请求）**顺序是一致**的