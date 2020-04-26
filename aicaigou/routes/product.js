const express=require('express');
//引入连接池模块
const pool=require('../pool.js')
//创建路由器对象
let router=express.Router();
router.get('/list',(req,res)=>{
  let obj=req.query;
  //5.2验证是否为空
  if(!obj.pno) obj.pno=1;
  if(!obj.count) obj.count=2;
  console.log(obj);
  //5.3将count转为整型
  obj.count=parseInt(obj.count);
  //5.4计算start
  let start=(obj.pno-1)*obj.count;
  //5.5执行SQL语句
  pool.query('SELECT lid,title,spec FROM  acg_snacks LIMIT ?,?',[start,obj.count],(err,result)=>{
    if(err) throw err;
	let pno = obj.pno;
	res.send({
		code:200,
        msg: "list ok",
		pno: pno,
		data:result});
  });
});

//商品详情
router.get("/detail", (req, res) => {
    let obj = req.query;
    if (!obj.lid) {
        res.send({
            code: 401,
            msg: "lid required"
        });
        return;
    };
               
    pool.query('SELECT * from acg_snacks WHERE lid=?',[obj.lid], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
			
            console.log({
                code: 200,
                msg: "detail ok",
                details: result[0],
                
            })

            res.send({
                code: 200,
                msg: "detail ok",
                details: result[0],
         
            })
        } else {
            res.send({
                code: 301,
                msg: "can not found"
            })
        }

    });
});
//删除商品
router.get('/delete',(req,res)=>{
	let obj=req.query;
	//验证数据是否为空
   if(!obj.lid){
    res.send({code:401,msg:'lid required'});
	return;
  }
	//执行sql语句
    pool.query('DELETE  FROM acg_snacks WHERE lid=?',[obj.lid],(err,result)=>{
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
//添加商品
router.post('/add',(req,res)=>{
	let obj=req.body;
	if(!obj.title){
		res.send({code:401,msg:'title required'});
		//阻止往后执行
		return;
	}
    if(!obj.price){
		res.send({code:402,msg:'price required'});
		//阻止往后执行
		return;
	}
    if(!obj.promise){
		res.send({code:403,msg:'promise required'});
		//阻止往后执行
		return;
	}
    if(!obj.spec){
		res.send({code:404,msg:'spec required'});
		//阻止往后执行
		return;
		}
    if(!obj.stores){
		res.send({code:405,msg:'stores required'});
		//阻止往后执行
		return;
		}
    if(!obj.exp){
		res.send({code:406,msg:'exp required'});
		//阻止往后执行
		return;
	}
	 if(!obj.variety){
		res.send({code:407,msg:'variety required'});
		//阻止往后执行
		return;
	}
      if(!obj.storage_method){
		res.send({code:408,msg:'storage_method required'});
		//阻止往后执行
		return;
	}


		//执行sql语句
	pool.query('INSERT INTO acg_snacks SET ?',[obj],(err,result)=>{
        if(err) throw err;
	console.log(result);
        //如果数据插入成功，相应对象
		if(result.affectedRows>0){
			res.send({code:200,msg:'add suc'})
		}
	});
});
//导出路由器
module.exports=router;