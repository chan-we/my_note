<https://ubuntuqa.com/article/7410.html>

1. 安装samba服务器

   ```sh
   sudo apt-get install samba
   ```

2. 验证安装

   ```sh
   service smbd status
   ```

   状态时active表示安装成功

   ![image-20220402003353863](https://raw.githubusercontent.com/chan-we/my_note/picbed/202204020033965.png)

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