module.exports = (req,res,next)=>{
    if(req.session.isLogin){
        next();
    }else{
        // res.send('<script>alert("请登录");location.href="/login"</script>');
        res.redirect('/admin/login');
    }
}