# 点击事件

原生DOM的点击事件有三种方式触发

```html
<body>

<button id="btn1">btn1</button>
<button id="btn2">btn2</button>
<button id="btn3" onClick="clickBtn3()">btn3</button>

<script>
    let btn1 = document.getElementById('btn1');
    btn1.addEventListener('click',()=>{
    	alert('btn1被点击')
	})

    let btn2 = document.getElementById('btn2');
    btn2.onclick = ()=>{
        alert('btn2被点击')
    }

    function clickBtn3(){
        alert('btn3被点击')
    }
</script>
</body>
```

在React中，前两种方法可以使用但不被推荐。React推荐使用第三种方法，因为前两种都会用到document来获取到DOM元素

```jsx
class MyComponent extends React.Component {
    render() {
        //注意是onClick而不是onclick
        //注意使用{}
        //注意函数不能带()，如果带()表示吧clickBtn()的返回值传给onClick作为参数
        return <button id='btn' onClick={clickBtn}>button</button>
    }
}

ReactDOM.render(<MyComponent/>, document.getElementById('test'));
function clickBtn(){
    console.log('button被点击了')
}
```

# event.target

当事件源就是希望操作的DOM元素时，可以使用event.target

```jsx
class Demo extends React.Component {
    showData = (event) => {
        alert(event.target.value);
    }

    render() {
        return (
            <div>
                <input onBlur={this.showData} type="text" placeholder="失去焦点提示数据"/>
            </div>
        )
    }
}

ReactDOM.render(<Demo/>, document.getElementById('test'));
```