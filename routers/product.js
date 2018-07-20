let router = require('express').Router();
let fs = require('fs');
let db = require('../modules/db');
let upload = require('../modules/multer');
// 查询商品
router.get('/product',(req,res)=>{
    db.fnFind('product',{},(err,data)=>{
        res.render('product/product',{goods:data});
    })
});
// 编辑添加商品
router.get('/productadd',(req,res)=>{
    res.render('product/productadd')
});
// 添加商品
router.post('/productaddDo',upload.single('ico'),(req,res)=>{
    let body = req.body;
    let ico =req.file.path;;
    let goodsname =body.goodsname;
    let price = body.price;
    let fee = body.fee;
    let description = body.description;
    let jsonData = {ico,goodsname,price,fee,description};
    db.fnInsert('product',jsonData,(err,data)=>{
        if(!err){
            res.render('product',{'goods':data},(err,data)=>{
                res.redirect('/product/product');
            });
        }
    });
})
// 编辑商品
router.get('/productedit',(req,res)=>{
    let id = req.query.id;
    db.fnFind('product',{'_id':new db.ObjectID(id)},(err,data)=>{
        res.render('product/productedit',{goods:data[0]})
    })
});
// 修改商品
router.post('/producteditDo',upload.single('ico'),(req,res)=>{
    
    let body = req.body;
    let id = body.id;
    let goodsname =body.goodsname;
    let price = body.price;
    let fee = body.fee;
    let description = body.description;
    let upData;
    let ico;
    // 如果有参数说明修改了
    if(req.file){
         ico = req.file.path;
         db.fnFind('product',{'_id':new db.ObjectID(id)},(err,data)=>{
            if(!err){
               fs.unlinkSync(data[0].ico);
            }
        })
         upData = {ico,goodsname,price,fee,description};
    }else{
         upData = {goodsname,price,fee,description,isLogin:req.session.isLogin};
    }
    db.fnupdate('product',{'_id':new db.ObjectID(id)},upData,(err,data)=>{
        if(!err){
           res.redirect('product');
        }
    })
});
// 商品删除
router.get('/productdel',(req,res)=>{
    let id = req.query.id;
    db.fnRemove('product',{'_id': new db.ObjectID(id)},(err,data)=>{
        res.redirect('product');
    });
});
router.post('/search',(req,res)=>{
    let goods = req.body.goodsname;
    if(goods===""){
       res.send('<script>alert("输入不能为空");location.href="product"</script>')
    }else{
        let json = eval('/'+goods+'/');
        db.fnFind('product',{goodsname:json},(err,data)=>{
            res.render('product/product',{goods:data});
        })
    }
   
});
module.exports = router;