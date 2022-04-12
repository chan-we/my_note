<https://css-tricks.com/the-trick-to-viewport-units-on-mobile/>

关于视口单位应该如何计算，规范是相当模糊的。对于移动设备，我们通常关注的是垂直高度，所以让我们具体看看视口高度（vh）。

vh单位：等于初始包含块的高度的1%。

vh最初是由你的浏览器的当前视口计算的。如果你打开浏览器并开始加载一个网站，1vh等于你屏幕高度的1%，减去浏览器界面。

但是！如果你开始滚动，情况就不一样了。一旦你越过了浏览器界面的某个部分，比如地址栏，vh值就会更新，结果就是内容出现了尴尬的跳跃。

iOS版Safari浏览器是第一批更新其实现方式的移动浏览器之一，它选择根据屏幕的最大高度为vh定义一个固定值。这样一来，一旦地址栏消失，用户就不会在页面上遇到跳跃。大约一年前，Chrome的移动浏览器也开始效仿。

虽然使用一个固定的值是很好的，但它也意味着如果地址栏在视野中，你不能有一个全高的元素。你的元素的底部将被裁剪。

![image-20220329003726124](http://picgo.chanwe.top/202204121729904.png)

CSS自定义属性和几行JavaScript可能是获得我需要的一致和正确尺寸的完美方法。

在JavaScript中，你总是可以通过使用全局变量window.innerHeight来获得当前视口的值。这个值考虑到了浏览器的界面，并在其可见性改变时进行更新。诀窍是将视口值存储在一个CSS变量中，并将其应用于元素而不是vh单位。

比方说，在这个例子中，我们的CSS自定义变量是--vh。这意味着我们要在我们的CSS中像这样应用它。

```css
.my-element {
  height: 100vh; /* 针对不支持自定义属性的浏览器使用 */
  height: calc(var(--vh, 1vh) * 100);	/*var()的第二个参数为回退值，第一个参数无效时使用*/
}
```

JavaScript：

```javascript
// 获取视口高度并乘以1%
let vh = window.innerHeight * 0.01;
// 设定--vh为自定义属性（需以--开头）
document.documentElement.style.setProperty('--vh', `${vh}px`);
```

我们可以通过监听窗口大小调整事件来更新 --vh的值。这在用户旋转设备屏幕的情况下很方便，比如从横向到纵向，或者滚动时导航移出视野。

```javascript
window.addEventListener('resize', () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});
```