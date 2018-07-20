let express = require('express');
// 载入express 并调用。
let app = express();
// 加载session模块
let expressSession = require('express-session');
// 加载解析引擎模板
let ejs = require('ejs');
// 配置视图加载目录
app.set('views','./public')
// 配置解析引擎
app.set('view engine','ejs');
// 配置解析后缀
app.engine('ejs',ejs.__express);
// 配置静态资源
app.use(express.static('static'));
// 配置上传静态资源
app.use('/uploads',express.static('./uploads'));
// 配置session
app.use(expressSession({
    secret:'keyboard cat',
    resave:true,
    saveUninitialized:true,
    rolling:true,
    cookie:{maxAge:18*1000*62}
}))
// 加载商品管理模块
let product = require('./routers/product');
// 加载退出登录模块
let loginout = require('./routers/loginOut');
// 解析post 请求
let bodyParser = require('body-parser');
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
// 加载登录注册模块
let admin = require('./routers/admin');
app.use('/admin',admin);
// 引入登录拦截模块
let headOff = require('./modules/headOff');
// 挂载登录拦截模块
app.use(headOff);
// 挂载商品后台模块
app.use('/product',product);
// 挂载退出登录模块
app.use('/loginOut',loginout);
// 配置路由

// 端口
app.listen(3000,()=>{
    console.log('start');
})