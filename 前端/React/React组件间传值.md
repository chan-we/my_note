- 父 -> 子：props
- 子 -> 父：父组件通过props传递回调函数给子组件，子组件调用函数将数据作为参数传递给父组件
- 兄弟组件：因为React是单向数据流，因此需要借助父组件进行传递，通过父组件回调函数改变兄弟组件的props

# 父组件传值给子组件

## 函数式组件

子组件设置`props`参数即可让父组件传值给子组件。父组件**不能**传值给孙子组件

```jsx
export default function App() {//父级
    return (
        <div>
            <Child info="父级传给子级的信息">
                {/* 不能这样写，无法使父级直接传给孙子级信息 */}
                {/* <Grandson info2="父级传给孙子级的信息"></Grandson> */}
            </Child>
        </div>
    );
}
function Child(props) {//子级
console.log(props);//{info: "父级传给子级的信息"}
    return (
        <div>
            1-{props.info}
            {/* <Grandson info2="父级的子级传给子级的信息"></Grandson> */}
            {/* 下面这种方式实现了父级传给孙子级信息的目的 */}
            <Grandson info2={props.info}></Grandson>
        </div>
    );
}
function Grandson(props) {//孙子级
    console.log(props);//{info2: "父级的子级传给子级的信息"}
    return (
        <div>
            2-{props.info2}
        </div>
    );
}

```

