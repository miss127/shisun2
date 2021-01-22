"use strict";
const query = require('./mysql');
const Core = require('@alicloud/pop-core');
const aliDevice = require('./aliDevice');
const aliAMQP = require('./aliAMQP');
var deasync = require('deasync');
var hclight;
var hcwzlight;
var hcswlight;
var temp;
var humd;
var smoke;
var client = new Core({
    accessKeyId: 'LTAI4FwzAs6w36rg6k6RG5ZC',
    accessKeySecret: '9tPs44cgNa0d0PDhAJWKUfl1L687lV',
    endpoint: 'https://iot.cn-shanghai.aliyuncs.com',
    apiVersion: '2018-01-20'
});
module.exports = {

    //创建一个阿里云项目(提供name自动生成key)
    createproduct(req, resp) {
        var ProductName = req.body.ProductName;
        var params = {
            "RegionId": "cn-shanghai",
            "NodeType": "0",
            "ProductName": ProductName//req.body.name
        }
        var requestOption = {
            method: 'POST'
        };
        client.request('CreateProduct', params, requestOption).then((result) => {
            resp.send({ succ: true });
            console.log(JSON.stringify(result));
        }, (ex) => {
            console.log(ex);
        })
    },
    //更新阿里云项目(只能根据key修改name)
    updateproduct(req, resp) {
        var ProductName = req.body.ProductName;
        var ProductKey = req.body.ProductKey;
        console.log(ProductName + " " + ProductKey);
        var params = {
            "RegionId": "cn-shanghai",
            "ProductName": ProductName,
            "ProductKey": ProductKey
        }
        var requestOption = {
            method: 'POST'
        };
        client.request('UpdateProduct', params, requestOption).then((result) => {
            console.log(JSON.stringify(result));
            resp.send({ succ: true });

        }, (ex) => {
            console.log(ex);
        })
    },
    //删除阿里云项目(根据key删除)
    deleteproduct(req, resp) {
        var ProductKey = req.params['ProductKey'];
        console.log(ProductKey);
        var params = {
            "RegionId": "cn-shanghai",
            "ProductKey": ProductKey
        }
        var requestOption = {
            method: 'POST'
        };
        client.request('DeleteProduct', params, requestOption).then((result) => {
            console.log(JSON.stringify(result));
            resp.send({ succ: true });
        }, (ex) => {
            console.log(ex);
        })
    },
    //查询阿里云项目(根据key查询)
    queryproduct(req, resp) {
        var ProductKey = req.params['ProductKey'];
        let l = [];
        // console.log(ProductKey);
        var params = {
            "RegionId": "cn-shanghai",
            "ProductKey": ProductKey
        }
        var requestOption = {
            method: 'POST'
        };
        client.request('QueryProduct', params, requestOption).then((result) => {
            var res = JSON.parse(JSON.stringify(result)).Data;
            l.push(
                {
                    ProductName: res.ProductName,
                    ProductKey: res.ProductKey,
                }
            )
            // console.log(res);
            resp.send(l);//返回给前端
        }, (ex) => {
            // console.log(ex);
        })
    },
    //查询所有的阿里云项目
    queryproductlist(req, resp) {
        console.log("searchall");
        var params = {
            "RegionId": "cn-hangzhou",
            "CurrentPage": 1,
            "PageSize": 200
        }
        var requestOption = {
            method: 'POST'
        };
        client.request('QueryProductList', params, requestOption).then((result) => {
            var res = JSON.parse(JSON.stringify(result)).Data.List.ProductInfo;
            resp.send(res);//返回给前端
        }, (ex) => {
            // console.log(ex);
        })
    },
    //阿里云发送灯状态给思科
    aliprop(req, resp) {
        let deviceName = req.params['deviceName'];
        if (deviceName == "hclight") {
            hclight = aliDevice.gethclight();//获取阿里云灯的状态
            const obj = {
                success: true,
                status: hclight
            }
            resp.write(JSON.stringify(obj));//发送给思科
            resp.end();
        }
    },
    //获取思科中生物，污渍，烟雾检测的状态发送给阿里云和前端
    alipropcheck(req, resp) {
        let deviceName = req.params['deviceName'];
        let deviceState = req.params['deviceState'];
        console.log(deviceName + " " + deviceState);
        if (deviceName == "hcwzlight") {//污渍检测的状态
            hcwzlight = Number(deviceState);
            aliDevice.hcwzlight.postProps({ 'LightStatus': Number(deviceState) }, (res) => {
            });
        }
        else if (deviceName == "hcswlight") {//生物检测的状态
            hcswlight = Number(deviceState);
            aliDevice.hcswlight.postProps({ 'LightStatus': Number(deviceState) }, (res) => {
            });
        }
        else if (deviceName == "hcsmoke") {//烟雾检测的状态
            smoke = Number(deviceState);
            aliDevice.hcywbjq.postProps(//把思科中烟雾报警器的状态上传给阿里云的烟雾报警器
                {
                    SmokeSensorState: Number(smoke)
                }, (res) => {
                    console.log(res);
                });
            aliDevice.hchs.postProps({//把思科中花洒的状态上传给阿里云的花洒
                WaterOutletSwitch: Number(smoke)
            }, (res) => {
                console.log(res);
            })
            aliDevice.sethchslight(smoke);
            aliDevice.sethcywbjqlight(smoke);
        }
        resp.end();
    },
    //发送温湿度到阿里云
    alipropwsd(req, resp) {
        temp = req.params['temp'];
        humd = req.params['humd'];
        console.log(temp);
        console.log(humd);
        aliDevice.hcwsd.postProps(
            {
                CurrentTemperature: Number(temp),
                CurrentHumidity: Number(humd)
            }, (res) => {
            });
        resp.end();
    },
    //前端获取到照明灯，烟雾报警器，生物检测器，污渍检测器的状态
    getstate(req, resp) {
        let l = [];
        l.push({
            deviceName: "hclight",
            deviceStatus: Number(hclight)
        });
        l.push({
            deviceName: "hcwz",
            deviceStatus: Number(hcwzlight)
        });
        l.push({
            deviceName: "hcsw",
            deviceStatus: Number(hcswlight)
        });
        l.push({
            deviceName: "hcywbjq",
            deviceStatus: Number(smoke)
        })
        resp.send(l);
        l.splice(0, l.length);
        resp.end();
    },
    //前端获取到温湿度
    getwsd(req, resp) {
        // console.log("----------------------asd------------------------------------------------------------------------------------");
        let l = [];
        // console.log(temp + " " + humd);
        l.push({
            temp: temp,
            humd: humd
        })
        resp.send(l);
    },
    //前端的灯的状态发送给阿里云
    wgcontrol(req, resp) {
        let deviceState = req.params['deviceState'];
        // if (deviceName == "hclight") {
        //     hclight = Number(deviceState);
        //     aliDevice.sethclight(hclight);
        //     aliDevice.hclight.postProps({ 'LightStatus': hclight }, (res) => {
        //         // console.log(res);
        //     });
        //     resp.end();
        // }
        console.log("------------------------------------------------------------------------------------------------------------------------------11111111--------------------------------------------------")
        let prokey = aliDevice.hclight.model.config.productKey;
        let deviceName = aliDevice.hclight.model.config.deviceName;
        console.log(prokey);
        console.log(deviceName);
        aliDevice.sethclight(hclight);
        hclight = Number(deviceState);
        const items = {
            LightStatus: hclight
        }
        var params = {
            "RegionId": "cn-shanghai",
            "Items": JSON.stringify(items),
            "ProductKey": prokey,
            "DeviceName": deviceName
        }
        var requestOption = {
            method: 'POST'
        };
        client.request('SetDeviceProperty', params, requestOption).then((result) => {
            console.log(JSON.parse(JSON.stringify(result)));
        }, (ex) => {
            console.log(ex);
        })
        resp.end();
    },
    //业务服务器上的AMQP消息把它发送给前端
    getamqp(req, resp) {
        console.log("---------------------------------------------------00--------------------------------------------------");
        let l = [];
        let l2 = [];
        l = aliAMQP.getamqp();
        if (l.length > 20) {
            l.splice(0, l.length - 20);
        }
        for (let i of l) {
            console.log("---------------------------asdasdas------------------");
            console.log(i);
        }
        resp.send(l);
        resp.end();
    },
    getlight(req, resp) {
        var light = aliDevice.gethclight();
        console.log("--------------------------------------------------------------------------------------------");
        console.log(light);
        resp.send(light + "");
        resp.end();
    }
}