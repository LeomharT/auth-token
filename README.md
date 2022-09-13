### auth0-node 后台项目
### auth 前端项目

### 流程
后台生成token`/token`哪个请求,前端调用,然后保存在localstorage或者redux里面持久化一下
后续每次需要请求都在header里面带上请求头

``` ts
    headers: { 'authorization': `Bearer ${token}` },
```

调用流程看前端项目`auth0/src/components/App.tsx`

具体流程
1. 前端请求token
2. 保存或不保存,不保存就每次都要发送token请求
3. 后续其他API加上headers: { 'authorization': `Bearer ${token}` },
