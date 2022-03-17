# 下载安卓子系统

进入 `设置 -> 时间和语言 -> 语言和区域`  
![使用win11安卓子系统-2022-03-17-16-30-41-20220317163036](https://raw.githubusercontent.com/chan-we/my_note/picbed/%E4%BD%BF%E7%94%A8win11%E5%AE%89%E5%8D%93%E5%AD%90%E7%B3%BB%E7%BB%9F-2022-03-17-16-30-41-20220317163036.png)  
将`国家或地区`选项改为美国
![使用win11安卓子系统-2022-03-17-16-33-04-20220317163301](https://raw.githubusercontent.com/chan-we/my_note/picbed/%E4%BD%BF%E7%94%A8win11%E5%AE%89%E5%8D%93%E5%AD%90%E7%B3%BB%E7%BB%9F-2022-03-17-16-33-04-20220317163301.png)  
在微软商店里搜索`Amazon Appstore`并下载安装  
![使用win11安卓子系统-2022-03-17-16-34-23-20220317163420](https://raw.githubusercontent.com/chan-we/my_note/picbed/%E4%BD%BF%E7%94%A8win11%E5%AE%89%E5%8D%93%E5%AD%90%E7%B3%BB%E7%BB%9F-2022-03-17-16-34-23-20220317163420.png)
点击下载好的 Amazon Appstore，系统进行自动配置，重启一次后完成安装

# adb 连接

安装完成后在应用中出现`适用于Android的Windows子系统设置`，点击进入

![使用win11安卓子系统-2022-03-17-16-38-22-20220317163819](https://raw.githubusercontent.com/chan-we/my_note/picbed/%E4%BD%BF%E7%94%A8win11%E5%AE%89%E5%8D%93%E5%AD%90%E7%B3%BB%E7%BB%9F-2022-03-17-16-38-22-20220317163819.png)

打开开发人员模式

![使用win11安卓子系统-2022-03-17-16-39-19-20220317163916](https://raw.githubusercontent.com/chan-we/my_note/picbed/%E4%BD%BF%E7%94%A8win11%E5%AE%89%E5%8D%93%E5%AD%90%E7%B3%BB%E7%BB%9F-2022-03-17-16-39-19-20220317163916.png)

打开一个安卓应用，比如说刚才安装的 Amazon Appstore
打开命令行，输入

```shell
netstat -anep tcp | findstr "58526"
```

查看端口是否开放
如果端口开放，则输入以下命令进行连接

```shell
adb connect 127.0.0.1:58526
```

# 安装软件

下载 apk 文件

使用 adb install 命令安装软件
示例：

```
adb install ./APKPure_v3.17.38_apkpure.com.apk
```

看见如下提示，则表示安装成功：  
![使用win11安卓子系统-2022-03-17-16-49-43-20220317164941](https://raw.githubusercontent.com/chan-we/my_note/picbed/%E4%BD%BF%E7%94%A8win11%E5%AE%89%E5%8D%93%E5%AD%90%E7%B3%BB%E7%BB%9F-2022-03-17-16-49-43-20220317164941.png)

可以在开始菜单点击打开应用  
![使用win11安卓子系统-2022-03-17-16-51-11-20220317165110](https://raw.githubusercontent.com/chan-we/my_note/picbed/%E4%BD%BF%E7%94%A8win11%E5%AE%89%E5%8D%93%E5%AD%90%E7%B3%BB%E7%BB%9F-2022-03-17-16-51-11-20220317165110.png)

如果在安装时提示连接了多个设备，那么通过 adb disconnect 命令断开所有连接，然后再次连接 win11 安卓子系统
![使用win11安卓子系统-2022-03-17-16-53-18-20220317165316](https://raw.githubusercontent.com/chan-we/my_note/picbed/%E4%BD%BF%E7%94%A8win11%E5%AE%89%E5%8D%93%E5%AD%90%E7%B3%BB%E7%BB%9F-2022-03-17-16-53-18-20220317165316.png)

# 提示virtwifi无法访问互联网
如果实际上是能上（国内）网的，那么提示无法上网是因为安卓（国内系统miui等除外）在判断能不能上网时是和谷歌进行通信，而国内不能访问谷歌，所以会提示无法访问互联网。
```
adb shell "settings put global captive_portal_http_url http://connect.rom.miui.com/generate_204"
adb shell "settings put global captive_portal_https_url http://connect.rom.miui.com/generate_204"
adb shell settings put global captive_portal_use_https 0
adb shell settings put global ntp_server ntp1.aliyun.com
```
或者去搜索：安卓去网络叉或者去叹号