<https://juejin.cn/post/6877115720820326407>

# children prop

在子组件中需要使用插槽的地方添加`{props.children}`即可

示例：

```jsx
// 子组件
const Home = (props) => {
    return (
    	<div>
            {props.children}
        </div>
    )
}
export default Home;
```



```jsx
// 父组件
import Home from '../Home/Home';
const Layout = (props) => {
    return (
    	<Home>
            <div>
                <h1>test</h1>
            </div>
        </Home>
    )
}
```

# 具名插槽

**要实现具名插槽可以从父组件中传递一个对像给子组件，这个对象中的内容可以是jsx，也可以是一段文本内容，还可以是一个事件方法**

- 父组件Layout中传值

```jsx
import React from 'react';
import Home from '../Home/Home';

const Layout = (props) => {
    return (
    	<Home isShowTopBar={false} isShowBottomBar={true} title="react实现插槽">
        	// 具名插槽
            {{
            	content: (
                    <div>
                        <h1>使用组合的方式实现插槽</h1>
                        <p>滴答滴答滴答~~~~~~~~~</p>
                    </div>
                ),
                txt: '这是一段文本内容',
                clickMe: () => {console.log('这是一个事件方法！')}
            }}
        </Home>
    )
}
export default Layout;
复制代码
```

- 子组件Home中使用具名插槽

```jsx
import React, { useEffect } from 'react';
import TopBar from './TopBar.js';
import BottomBar from './BottomBar.js';

const Home = (props) => {
	const { children, isShowTopBar, isShowBottomBar, title } = props;
    useEffect(() => {
    	document.title = title;
    } , [title]);
    return (
    	<div>
            {isShowTopBar && <TopBar />}
            // 使用具名插槽
            {children[1].content}
            {children[1].txt}
            <button onClick={children[1].clickMe}></button>
            {isShowBottomBar && <BottomBar />}
            <BottomBar />
        </div>
    )
}
export default Home;
```