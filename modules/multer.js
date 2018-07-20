//上传图片
//引进multer模块  记得在终端安装multer模块
let multer = require('multer');
// 开始配置
let storage = multer.diskStorage({
//上传图片的路径，是在你的静态目录下（public）uploads会自动进行创建
    destination: 'uploads',
 //给上传文件重命名，获取添加后缀名
    filename: function(req, file, callback){
//在这里我是把图片命名为我当前登陆的用户名
        let user  = req.session.isLogin;
        file.path = 'uploads';
        // 必须添加路径否则不会由图片显示
        callback(null, `${user+Date.now()}.png`);
        // 设置文件名和后缀名
      
    }
})
//导出模块
module.exports = multer({storage})