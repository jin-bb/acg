const express=require('express');
//引入连接池模块
const pool=require('../pool.js')
//创建路由器对象
let router=express.Router();
//添加购物车
router.post('/add',(req,res)=>{
	let obj=req.body;
	if(!obj.product_id){
		res.send({code:401,msg:'product_id required'});
		//阻止往后执行
		return;
	}
    if(!obj.count){
		res.send({code:402,msg:'count required'});
		//阻止往后执行
		return;
	}
		//执行sql语句
	pool.query('INSERT INTO acg_shoppingcart_item SET ?',[obj],(err,result)=>{
        if(err) throw err;
	console.log(result);
        //如果数据插入成功，相应对象
		if(result.affectedRows>0){
			res.send({code:200,msg:'register suc'})
		}
	});
});
//购物车列表并结算
router.get('/list',(req,res)=>{
	let obj=req.query;
	//验证数据是否为空
   if(!obj.iid){
    res.send({code:401,msg:'iid required'});
	return;
  }


	let sql=`SELECT lid,title,spec,variety,price FROM acg_snacks where lid=(SELECT product_id FROM acg_shoppingcart_item WHERE iid=?);
	         SELECT count FROM acg_shoppingcart_item WHERE iid=?;
			 `;
	pool.query(sql,[obj.iid,obj.iid],(err,result)=>{
		if (err) throw err;
         res.send({
            code: 200,
            msg: "list ok",
            data: result[0],
			Count:result[1]
			
        })
	});
	});
//删除购物车
router.get('/del',(req,res)=>{
	let obj=req.query;
	//验证数据是否为空
   if(!obj.iid){
    res.send({code:401,msg:'iid required'});
	return;
  }
	//执行sql语句
    pool.query('DELETE  FROM acg_shoppingcart_item WHERE iid=?',[obj.iid],(err,result)=>{
		if(err) throw err;
		console.log(result);
		//验证是否登录成功
		if(result.affectedRows>0){
			res.send({code:200,msg:'delete suc'})
		}else{
			res.send({code:301,msg:'delete err'});
		}
	})
});
	
//导出路由器
module.exports=router;