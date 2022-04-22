<https://www.digitalocean.com/community/tutorials/how-to-use-cron-to-automate-tasks-ubuntu-1804>

# 开始

先启动crontab服务

```bash
service cron start
```

或者

```bash
/etc/init.d/cron start
```

启动玩服务后输入命令

```bash
crontab -uroot -e
```

第一次启动会让你选择编辑器（推荐VIM） 

你所编辑的文件在 `/var/spool/cron/crontabs/` 目录下

文件中只有如下注释，根据提示可以看到我们在每一行可以按规定的格式来添加任务

![image-20220318024852236](http://picgo.chanwe.top/202204121709973.png)

## 日期允许值

| Field            | Allowed Values      |
| ---------------- | ------------------- |
| minute           | `0-59`              |
| hour             | `0-23`              |
| Day of the month | `1-31`              |
| month            | `1-12` or `JAN-DEC` |
| Day of the week  | `0-6` or `SUN-SAT`  |

特殊符号：

- 用`*`来表示全部(any)，例如`* * * * *`表示每一分钟执行一次任务

- 用`,`来间隔多个时间段，例如`0,30 * * * *`表示每小时的0分和30分执行一次任务
- 用`-`来表示是数值范围，例如`0-29 * * * *`表示每小时第0分到第29分每隔一分钟执行一次任务
- 用`/`来表示步长，例如`0 */3 * * *`表示每3个小时执行一次任务

快捷使用：

| 时间   | 值        |
| ------ | --------- |
| 每分钟 | * * * * * |
| 每小时 | 0 * * * * |
| 每天   | 0 0 * * * |
| 每星期 | 0 0 * * 0 |
| 每月   | 0 0 1 * * |
| 每年   | 0 0 1 1 * |

# 选项

查看任务

```bash
crontab -l
```

删除任务（下面的命令**不会提示是否确定删除**，请谨慎操作）

```shell
crontab -r
```

不过你可以再增加一个`-i`选项来提示是否确定删除

```bash
crontab -r -i
```

# 开启日志

因为cron作业是在后台执行的，所以并不总是能明显看出它们已经成功运行，可以开启日志来查看运行结果

```shell
vim /etc/rsyslog.d/50-default.conf
```

将下面这行的注释去掉

```
cron.*                    /var/log/cron.log
```

重启日志服务

```shell
service rsyslog  restart
```

日志文件为：`/var/log/cron.log`

