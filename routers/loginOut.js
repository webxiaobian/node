let router = require('express').Router();
router.get('/',(req,res)=>{
    req.session.destroy((err)=>{
        if(!err){
            res.redirect('/admin/login');
        }
    })
});

module.exports = router;