"use strict";
const query = require('../mysql');
//const user = require('../app/user-mg/user');
var deasync = require('deasync');
var nowuserid = "";
module.exports = {
    //登录
    login(req, resp) {
        let userName = "\'" + req.body.userName + "\'";
        let password = "\'" + req.body.password + "\'";
        //数据库查询用户名和密码是否都相等
        let sql = "select * from user where userName = " + userName + " and password = " + password;
        query(sql, function (err, vals, fields) {
            if (err) { }
            else {
                if (vals.length > 0) {//查询到有结果则返回true
                    var res = JSON.parse(JSON.stringify(vals));
                    nowuserid = "\'" + res[0].id + "\'";//存下登录的id ， 不能删除登录的这个id
                    resp.send({ succ: true, msg: res });
                    resp.end();
                }
                else {
                    resp.send({ succ: false });
                    resp.end();
                }
            }
        })
    },
    //获取所有用户
    getAll(req, resp) {
        console.log('hello');
        let sql = "select * from user";
        query(sql, function (err, data) {
            if (err) {
            }
            else {
                var res = JSON.parse(JSON.stringify(data));
                console.log(res);
                resp.send(res);//返回查询到的结果
                resp.end();
            }
        })
    },
    //添加用户
    add(req, resp) {
        let id = "\'" + req.body.id + "\'";
        let userName = "\'" + req.body.userName + "\'";
        let password = "\'" + req.body.password + "\'";
        let sql = "select * from user where id = " + id + " or userName = " + userName;
        query(sql, function (err, vals, fields) {
            if (err) { }
            else {
                if (vals.length > 0)//不允许用户名和id任意一个相等
                {
                    resp.send({ succ: false, msg: "用户名或id已存在" })
                    resp.end();
                }
                else {
                    let sql2 = "insert into user(id , userName , password) value(" + id + "," + userName + "," + password + ")";
                    query(sql2, function (err, vals, fields) { });//添加到数据库中
                    resp.send({ succ: true, msg: "添加成功" });
                    resp.end();
                }
            }
        })
    },
    //删除用户
    delete(req, resp) {
        var id = req.params['id'];
        id = "\'" + id + "\'";
        let sql = "select * from user where id = " + id;
        query(sql, function (err, vals, fields) {
            if (err) { }
            else {
                if (vals.length > 0) {
                    var res = JSON.parse(JSON.stringify(vals));
                    if (id != nowuserid) {//如果要删除的用户不能是登录的用户
                        let sql2 = "delete from user where id = " + id;
                        query(sql2, function (err, vals, fields) { });
                        resp.send({ succ: true });
                        resp.end();
                    }
                    else {
                        resp.send({ succ: false, msg: "不能删除当前用户" });
                        resp.end();
                    }
                }
                else {
                    resp.send({ succ: false, msg: "该用户不存在" });
                    resp.end();
                }
            }
        })
    },
    //修改用户
    updata(req, resp) {
        let id = "\'" + req.body.id + "\'";
        let userName = "\'" + req.body.userName + "\'";
        let password = "\'" + req.body.password + "\'";
        let sql = "select * from user where id = " + id;//先通过id查询到这个用户
        query(sql, function (err, vals, fields) {
            if (err) { }
            else {
                if (vals.length > 0) {//如果这个id存在再去修改它
                    let sql2 = "update user set userName = " + userName + ", password = " + password + " where id = " + id;
                    query(sql2, function (err, vals, fields) { });
                    resp.send({ succ: true });
                    resp.end();
                }
                else {
                    resp.send({ succ: false, msg: "该用户不存在" });
                    resp.end();
                }
            }
        })
    },
    //查询某一个用户
    search(req, resp) {
        let id = req.params['id'];
        id = "\'" + id + "\'";
        let sql = "select * from user where id = " + id;
        let l = [];
        query(sql, function (err, vals, fields) {
            if (err) { }
            else {
                if (vals.length == 1) {
                    var res = JSON.parse(JSON.stringify(vals));//通过id去查找用户，存到数组中再返回
                    for (let i of res) {
                        l.push({
                            id: i.id,
                            userName: i.userName,
                            password: i.password
                        })
                    }
                    resp.send(l);
                    resp.end();
                }
                else {
                    resp.send({ succ: false, msg: "查无此人" });
                    resp.end();
                }
            }
        })
    }
}
