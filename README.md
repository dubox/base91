# base91
base91 for javascript

## 基本原理
原理和 base64 是一样的，ASCII 共有94个可打印字符，base64 使用了其中 64 个，base91 使用了 91 个。  
为什么是 91 ？91^2=8281 “刚好”比 2^13 = 8192 大“一点点”，90^2 不够，92^2 大太多却又不够 2^14(=128\*128), 这样两位91进制“刚好”可以表示13位二进制，实现每两个字节比 base64 多压缩一个bit，从而节省一点点空间。

## 默认字典表
ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#$%&()*+,./:;<=>?@[]^_`{|}~-  

闲置字符："，'，\  

可以根据具体的需求决定闲置哪三个字符。也可以通过修改字典表的顺序实现一定程度的加密。


## 使用
```
base91.decode(base91.encode('abc')); 

//多字节字符
base91.mb_decode(base91.mb_encode('多字节字符'));  
```



