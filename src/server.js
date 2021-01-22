const express = require('express');
const app = express();
const router = require("./router");
const logger = require("morgan");

app.use(logger("dev"));
app.use(express.static(__dirname + "/src"));
app.use(router);
//网关服务器
app.listen(8080, () => {
    console.log('Web 在端口8080启动!');
});