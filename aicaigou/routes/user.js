const express=require('express');
//引入连接池模块
const pool=require('../pool.js')
//创建路由器对象
let router=express.Router();
//用户注册
router.post('/reg',(req,res)=>{
	let obj=req.body;
	if(!obj.uname){
		res.send({code:401,msg:'umane required'});
		//阻止往后执行
		return;
	}
    if(!obj.upwd){
		res.send({code:402,msg:'upwd required'});
		//阻止往后执行
		return;
	}
    if(!obj. email){
		res.send({code:403,msg:'email required'});
		//阻止往后执行
		return;
	}
    if(!obj. phone){
		res.send({code:404,msg:'phone required'});
		//阻止往后执行
		return;
		}
		//执行sql语句
	pool.query('INSERT INTO acg_user SET ?',[obj],(err,result)=>{
        if(err) throw err;
	console.log(result);
        //如果数据插入成功，相应对象
		if(result.affectedRows>0){
			res.send({code:200,msg:'register suc'})
		}
	});
});
//用户登录
router.post('/login',(req,res)=>{
	//获取数据
	let obj=req.body;
	console.log(obj);
	//验证是否为空
	if(!obj.uname){
	    res.send({code:401,msg:'umane required'});
		//阻止往后执行
		return;
	}
	if(!obj.upwd){
	    res.send({code:402,msg:'upwd required'});
		//阻止往后执行
		return;
	}
	//执行sql语句
    pool.query('SELECT* FROM acg_user where uname=? AND upwd=?',[obj.uname,obj.upwd],(err,result)=>{
		if(err) throw err;
		console.log(result);
		//验证是否登录成功
		if(result.length>0){
         res.send({code:200,msg:'login suc'})
		}else{
         res.send({code:301,msg:'login err'});
		}
	})
});
//检索用户
router.get('/detail',(req,res)=>{
  let obj=req.query;
  //3.2验证数据是否为空
  if(!obj.uid){
    res.send({code:401,msg:'uid required'});
	return;
  }
   //3.3执行SQL语句
  pool.query('SELECT uid,uname,email,phone FROM acg_user WHERE uid=?',[obj.uid],(err,result)=>{
    if(err) throw err;
	//console.log(result);
	//如果数组长度大于0，检索到对应的用户，否则检索不到
	if(result.length>0){
	  res.send({
		code:200,
		msg:'ok',
		data:result[0]
	  });
	}else{
	  res.send({code:301,msg:'can not found'});
	}
  });
});
//删除用户
router.get('/delete',(req,res)=>{
	let obj=req.query;
	//验证数据是否为空
   if(!obj.uid){
    res.send({code:401,msg:'uid required'});
	return;
  }
//3.3执行SQL语句
 pool.query('DELETE  FROM acg_user WHERE uid=?',[obj.uid],(err,result)=>{
		if(err) throw err;
		if(result.affectedRows>0){
			res.send({code:200,msg:'delete suc'})
		}else{
			res.send({code:301,msg:'delete err'});
		}
		})
});
//修改用户信息
router.get('/updata',(req,res)=>{
  //4.1获取数据
  let obj=req.query;
  //console.log(obj);
    if(!obj.uid){
    res.send({code:401,msg:'uid required'});
	return;
  }
  if(!obj.email){
    res.send({code:402,msg:'email required'});
	return;
  }
  if(!obj.phone){
    res.send({code:403,msg:'phone required'});
	return;
  }
  if(!obj.user_name){
    res.send({code:404,msg:'user_name required'});
	return;
  }
  if(!obj.gender){
    res.send({code:405,msg:'gender required'});
	return;
  }
  
  
  //4.3执行SQL语句
  pool.query('UPDATE  acg_user SET ? WHERE uid=?',[obj,obj.uid],(err,result)=>{
    if(err) throw err;
	//console.log(result);
	if(result.affectedRows>0){
	  res.send({code:200,msg:'update suc'});
	}else{
	  res.send({code:301,msg:'update err'});
	}
  });
});
//导出路由器
module.exports=router;