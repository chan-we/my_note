https://developers.cloudflare.com/cloudflare-one/tutorials/ssh/

# 1. 在服务器上安装cloudflared

```sh
sudo wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb

sudo dpkg -i ./cloudflared-linux-amd64.deb
```

# 2. 登录cloudflared

```sh
cloudflared tunnel login
```

输入命令后，会返回一个网址，在浏览器中打开它

![image-20220612193600775](http://picgo.chanwe.top/202206121936816.png)

点击想要授权的域名

![QQ截图20220612211226](http://picgo.chanwe.top/202206122155317.png)

授权

![QQ截图20220612211147](http://picgo.chanwe.top/202206122157167.png)

![QQ截图20220612211206](http://picgo.chanwe.top/202206122157187.png)

# 3.创建隧道

```sh
cloudflared tunnel create <NAME>
```

![image-20220612215924991](http://picgo.chanwe.top/202206122159036.png)

可以通过如下命令查看创建的隧道

```sh
cloudflared tunnel list
```

![image-20220612220005543](http://picgo.chanwe.top/202206122200588.png)