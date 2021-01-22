const express = require('express');
const app = express();
const router1 = require("./router1");
const logger = require("morgan");

app.use(logger("dev"));
app.use(express.static(__dirname + "/src"));
app.use(router1);
//业务服务器
app.listen(8181, () => {
    console.log('Web 在端口8181启动!');
});