# 相同点
文件夹中的资源在html中使用都是可以的。
# 不同点
- 使用assets下面的资源，在js中使用的话，路径要经过webpack中的file-loader编译，路径不能直接写。
- 使用public文件下面的资源，是不会被webpack处理的，它们会被直接复制到最终的打包目录下面，且必须使用绝对路径来引用这些文件。
注：
public中的文件，是不会经过编译的，打包后会生成dist文件夹，public中的文件只是复制一遍。因此，public建议放一些外部第三方，自己的文件放在assets，别人的放public中。要使用public中的文件，只需要在路径前加上"/"即可，"/"即表示public文件夹
若把图片放在assets和public中，html页面都可以使用，但是在动态绑定中，assets路径的图片会加载失败（因为webpack使用的是commenJS规范，必须使用require才可以）。
# 何时使用public文件夹
当你需要在构建输出中指定一个文件的名字
当你有上千个图片，需要动态引用它们的路径
有些库可能和webpack不兼容，这时你除了将其用一个独立的\<script>标签引入没有别的选择
