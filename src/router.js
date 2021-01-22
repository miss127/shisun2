const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const ctrlsb = require('./shebei');
const user = require('./control/user');
const alimg = require("./alimg");
router.use(bodyParser.json()); //将数据转换成json
router.use(bodyParser.urlencoded({ extended: false })); //配置post的body模块

//网关服务器路由

router.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    if (req.method == "OPTIONS") res.send(200);
    else next();
});

//登录
router.post('/users', user.login);

//用户管理-----------------------

//查找全部
router.get("/user/searchAll", user.getAll);
//按id和name查找
router.get("/user/search/:id", user.search);
//添加
router.post('/adduser', user.add);
//删除
router.delete('/deleteuser/:id', user.delete);
//修改

router.put('/updatauser', user.updata);
//创建阿里云
router.post("/addpro", alimg.createproduct);
//更新阿里云
router.put("/updatapro", alimg.updateproduct);
//删除阿里云
router.delete("/deletepro/:ProductKey", alimg.deleteproduct);
//查询全部阿里云产品
router.get("/searchAll", alimg.queryproductlist);
//查询某个阿里云产品
router.get("/search/:ProductKey", alimg.queryproduct);

router.post('/sbadd', ctrlsb.add);
router.post('/sbdelete', ctrlsb.delete);
router.get('/sbsearch/:ProductKey', ctrlsb.search);


//阿里云发送灯状态给思科
router.put("/ali/:deviceName", alimg.aliprop);
//获取思科中生物，污渍，烟雾检测的状态发送给阿里云和前端
router.put("/ali/:deviceName/:deviceState", alimg.alipropcheck)
//发送温湿度到阿里云
router.put("/ali/wsd/:temp/:humd", alimg.alipropwsd);
//前端获取到照明灯，烟雾报警器，生物检测器，污渍检测器的状态
router.get("/ali/getstate", alimg.getstate);
//前端的灯的状态发送给阿里云
router.put("/ali/setstate/:deviceName/:deviceState", alimg.wgcontrol);
//前端获取到温湿度
router.get("/ali/getwsd", alimg.getwsd);


module.exports = router;