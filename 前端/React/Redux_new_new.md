<https://react-redux.js.org/introduction/getting-started>

[Redux设计中的亮点](https://zhuanlan.zhihu.com/p/38045295)

# 简介

Redux工作流程演示：

![ReduxDataFlowDiagram-49fa8c3968371d9ef6f2a1486bd40a26](http://picgo.chanwe.top/202204121729797.gif)

# 安装

如果还没创建项目，那么可以使用模板来开始一个带有redux的项目

```bash
# Redux + Plain JS
npx create-react-app my-app --template redux

# Redux + TypeScript
npx create-react-app my-app --template redux-typescript
```

如果已经有项目了，那么安装[react-redux](https://www.npmjs.com/package/react-redux)

```sh
npm install react-redux @reduxjs/toolkit
```

关于redux-toolkit: <https://juejin.cn/post/6844904129178009613>

如果有使用TypeScript，**无需**额外手动安装依赖，因为已经安装react-redux时会自动安装，如果一定要手动安装，执行如下命令

```bash
npm install @types/react-redux
```

# 开始（搭配JS）

创建redux store

```js
import {configureStore} from "@reduxjs/toolkit";

export default configureStore({
    reducer: {}
})
```

用`<Provider>`标签包裹组件，`<Provider>`标签必须提供store属性

```jsx
// index.tsx

import {Provider} from "react-redux";
import store from './store';

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    document.getElementById('root')
);
```

创建一个redux state slice，这里新建一个文件`src/features/counter/counterSlice.ts`，引入`createSlice` API

```js
import {createSlice} from "@reduxjs/toolkit";

export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value: 0
    },
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload;
        }
    },
})

export const {increment, decrement, incrementByAmount} = counterSlice.actions;

export default counterSlice.reducer;
```

将这个reducer加入到store中

```js
import {configureStore} from "@reduxjs/toolkit";
import counterReducer from '../features/counter/counterSlice';

export default configureStore({
    reducer: {
        counter:counterReducer,
    }
})
```

现在可以在组件中使用它了

```jsx
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './counterSlice'
import styles from './Counter.module.css'

export function Counter() {
  // 这里的counter的定义为store的键，value为slice里的state的键
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  )
}
```

# 和TypeScript一起使用

<https://react-redux.js.org/tutorials/typescript-quick-start>

## store

使用configureStore应该不需要任何额外的类型。然而，你要提取RootState类型和Dispatch类型，以便它们可以在需要时被引用。从存储本身推断出这些类型意味着当你添加更多的状态片或修改中间件设置时，它们可以正确地更新。

```ts
//store.ts

import { configureStore } from '@reduxjs/toolkit'
// ...

const store = configureStore({
  reducer: {
    posts: postsReducer,
    comments: commentsReducer,
    users: usersReducer,
  },
})

// 从store自身推断出RootState和AppDispath类型
export type RootState = ReturnType<typeof store.getState>
// 推断出的类型: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export default store
```

## 自定义useSelector和useDispatch

虽然可以将RootState和AppDispatch类型导入每个组件，但最好是创建预类型的useDispatch和useSelector钩子，以便在你的应用程序中使用。这一点很重要，有几个原因：

- 对于useSelector，它使你不必每次都输入（state: RootState）。
- 对于useDispatch，默认的Dispatch类型并不了解thunks或其他中间件。为了正确地调度thunks，你需要使用来自商店的特定定制的AppDispatch类型，其中包括thunk中间件类型，并与useDispatch一起使用。添加一个预设的useDispatch钩子可以防止你忘记在需要时导入AppDispatch。

由于这些是实际的变量，而不是类型，所以重要的是在一个单独的文件中定义它们，比如`app/hooks.ts`，而不是商店的设置文件。这允许你将它们导入任何需要使用钩子的组件文件中，并避免潜在的循环导入依赖问题。

```ts
// app/hooks.ts

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'

// 你可以在项目中使用以下方法而不是 `useDispatch` 和 `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
```

使用

```tsx
import React, { useState } from 'react'

import { useAppSelector, useAppDispatch } from 'app/hooks'

import { decrement, increment } from './counterSlice'

export function Counter() {
  // state类已被正确地推断为RootState类型
  const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()

  //...
}
```

## slice

每个切片文件都应该为其初始状态值定义一个类型，以便createSlice能够正确推断每个案例还原器中的状态类型。

所有生成的动作都应该使用Redux工具包中的`PayloadAction<T>`类型来定义，它将动作.payload字段的类型作为其通用参数。

你可以在这里安全地从存储文件中导入RootState类型。这是一个循环导入，但TypeScript编译器可以正确处理类型的问题。在编写选择器函数等用例中可能需要这样做。

```ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

// 定义state的接口
interface CounterState {
  value: number
}

// 使用接口设置初始状态
const initialState: CounterState = {
  value: 0,
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    // 使用PayloadAction类来声明`action.payload`内容的数据类型
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions

// 其他代码，如选择器可以使用导入的`RootState`类型
export const selectCount = (state: RootState) => state.counter.value

export default counterSlice.reducer
```

