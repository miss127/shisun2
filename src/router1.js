const express = require("express");
const bodyParser = require("body-parser");
const router1 = express.Router();
const alimg = require("./alimg");
router1.use(bodyParser.json()); //将数据转换成json
router1.use(bodyParser.urlencoded({ extended: false })); //配置post的body模块

router1.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    if (req.method == "OPTIONS") res.send(200);
    else next();
});
//业务服务器路由


//前端的灯的状态发送给阿里云
router1.put("/ali/setstate/:deviceName/:deviceState", alimg.wgcontrol);
//业务服务器上的AMQP消息把它发送给前端
router1.get("/ali/aliamqp", alimg.getamqp);
router1.get("/ali/getlight", alimg.getlight);
module.exports = router1;