### auth0-node 后台项目
### auth 前端项目

### 流程
后台生成token`/token`哪个请求,前端调用,然后保存在localstorage或者redux里面持久化一下
后续每次需要请求都在header里面带上请求头

``` ts
    headers: { 'authorization': `Bearer ${token}` },
```

调用流程看前端项目`App.tsx`
