// 载入路由模块
let router = require('express').Router();
// 引入配置好的操作数据库文件
let db = require('../modules/db');
// 载入md5加密模块
let md5 = require('md5-node');
// 登录接口
router.get('/login',(req,res)=>{
    res.render('user/login');
});
// 登录成功接口
router.post('/loginDo',(req,res)=>{
    let json = req.body;
    // 加密密码
    let query = md5(json.password); 
    db.fnFind('user',{username:json.username,password:query},(err,data)=>{
        if(data.length>0){
            req.session.isLogin = req.body.username; 
            // 设置全局变量 在使用router时app.locals会失效 需要使用req.app.locals['name']来存全局数据
            req.app.locals['isLogin']= req.session.isLogin;
            res.redirect('/product/product');
        }else{
            res.send('<script>alert("登录失败");location.href="/admin/login"</script>'); 
        }
    })
})
// 注册接口
router.get('/register',(req,res)=>{
    res.render('user/register');
});
// 注册成功接口
router.post('/registerDo',(req,res)=>{
    // 接收注册信息
    let body = req.body;
    // 加密
    let query = md5(body.password);
    //执行查询数据库
    db.fnFind('user',{username:body.username},(err,data)=>{
       if(data.length===0){
            db.fnInsert('user',{username:body.username,password:query},(err,data)=>{
                if(!err){
                res.redirect('/product/product');
                }
            });
       }else{
        res.send('<script>alert("用户名已经存在");location.href="/admin/register"</script>'); 
       }
    });
    
});
module.exports = router;