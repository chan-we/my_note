# 设置环境

点击左侧的`Environment`

![image-20220321013658249](https://raw.githubusercontent.com/chan-we/my_note/picbed/202203210136449.png)

点击加号新建一个环境

![image-20220321014017741](https://raw.githubusercontent.com/chan-we/my_note/picbed/202203210140827.png)

设置好后记得**保存**，不然不会生效

## initial value和current value

- initial value：默认值，可以导出、分享
- current value：当前值，不上传到服务器，无法导出（导出后再导入，你会发现value都是空的）

current value是当前在环境中起作用的，也可以说它是测试用数据，用于导出和分享的是initial value，所以我们最好在最后定档的时候让initial value都是最合适的值

![image-20220321014634884](https://raw.githubusercontent.com/chan-we/my_note/picbed/202203210146971.png)

可以在右上方快速决定保留current value还是放弃current value

- Persist All：坚持。将initial value更新为current value（即：用当前值覆盖默认值）
- Reset All：重置。将current value都更新为initial value（即：用默认值覆盖当前值）

# 使用环境

在右上角可以设置当前环境

![image-20220321014854379](https://raw.githubusercontent.com/chan-we/my_note/picbed/202203210148467.png)

设置好后即可使用环境中的变量，注意变量的值是current value