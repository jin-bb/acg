const express=require('express');
const bodyParser=require('body-parser');
//引入路由器
const userRouter=require('./routes/user.js');



let app=express();
app.listen(8080);
//托管静态资源
app.use(express.static('public'));
//使用body-parser中间件
app.use(bodyParser.urlencoded({
	extended:false
}));
app.use('/user',userRouter);



