<https://ubuntuqa.com/article/7410.html>

# 开始

1. 安装samba服务器

   ```sh
   sudo apt-get install samba
   ```

2. 验证安装

   ```sh
   service smbd status
   ```

   状态时active表示安装成功

   ![image-20220402003353863](http://picgo.chanwe.top/202204121709055.png)

3. 创建用于共享的目录

   ```sh
   sudo mkdir /samba 
   ```

4. 修改配置文件，配置文件为`/etc/samba/smb.conf`

   ```sh
   cd /etc/samba
   ```

   备份配置文件

   ```sh
   cp smb.conf smb_bak.conf
   ```

   修改配置文件

   ```sh
   vim smb.conf
   ```

   添加如下配置，更多见[配置文件详解](https://www.jianshu.com/p/650dda31b62e)

   ```
   [samba-share]
   comment = Samba on Ubuntu
   path = /samba
   read only = no
   browsable = yes
   ```

   其中：

   - [samba-share] =共享的名称
   - comment =添加共享的简短描述
   - path =这是您共享的目录。
   - read only=指定是否允许用户写
   - browsable=共享是否应在共享列表中列出

5. 设置Samba用户， Samba使用**系统帐户**访问共享，但**不接受系统帐户密码**

   ```sh
   sudo smbpasswd -a [系统用户名]
   ```

   接下来会要求你输入设置的密码

6. 重启samba服务

   ```
   service smbd restart
   ```

# 用户管理

https://blog.csdn.net/linglongwunv/article/details/5213337

samba用户需是linux已有用户

通过`useradd`命令创建新用户

```sh
useradd [用户名]
```

通过`passwd`命令设置密码

```sh
passwd [用户名]
```

把用户添加为samba用户

```sh
sudo smbpasswd -a [系统用户名]
```

## 设置文件夹权限

通过设置`public`属性和`valid users`属性来限制哪些用户可以访问这个文件夹，多个用户用逗号隔开

```yaml
[file1]
path = /var/samba/file1
read only = no
public = no
valid users = user1
```

## 对没有权限的用户隐藏文件夹

只要在`smb.conf`里的`[Global]`添加一行 `access based share enum = yes` 就可以了