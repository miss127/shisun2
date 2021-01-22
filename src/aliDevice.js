const iot = require('alibabacloud-iot-device-sdk');
const query = require('./mysql');
const container = require('rhea');
var hclightst = 0;
var hcwzlightst = 0;
var hcswlightst = 0;
var hcywbjqlightst = 0;
var hchslightst = 0;
//照明指示灯-------------------------------------------------------------------------------------------
const hclight = iot.device({
    productKey: 'a1zvFd4mMig', //将<productKey>修改为实际产品的ProductKey
    deviceName: 'zo2El4IAwlsqy9Z9OnJQ',//将<deviceName>修改为实际设备的DeviceName
    deviceSecret: '363502dcdec81dd1ff2b03c7987f1e41',//将<deviceSecret>修改为实际设备的DeviceSecret
});
//监听connect事件
hclight.on('connect', () => {
    //将<productKey> <deviceName>修改为实际值
    hclight.subscribe('/a1zvFd4mMig/zo2El4IAwlsqy9Z9OnJQ/user/get'); //subscribe表示从阿里云上接收信息
    hclight.publish('/a1zvFd4mMig/b71e219b5998595b51202c5434fe7464/user/update', 'hello world!'); //publish表示向阿里云发送消息
});
//监听message事件
hclight.on('message', (topic, payload) => {
    console.log(topic, payload.toString());
});
//发送给阿里云 LightStatus属性的值修改为hclightst
hclight.postProps({ 'LightStatus': hclightst }, (res) => {
    console.log(res);
});
//从阿里云接受设备属性。将服务器本地的hclightst属性设置为阿里云上的属性
hclight.onProps((cmd) => {
    console.log('>>>onProps', cmd);
    for (var key in cmd.params) {
        if (key == 'LightStatus') {
            hclightst = Number(cmd.params.LightStatus);
            hclight.postProps({ 'LightStatus': hclightst });
        }
    }
})



//生物检测器---------------------------------------------------------------------------------
const hcswlight = iot.device({
    ProductKey: "a1i74r8Q1La",
    DeviceName: "KALA0cvLdqHDwpfeaJIM",
    DeviceSecret: "4fa3db6a6271e0b3d2bf4b37fec5f613"
});
//监听connect事件
hcswlight.on('connect', () => {
    //将<productKey> <deviceName>修改为实际值
    hcswlight.subscribe('/a1i74r8Q1La/KALA0cvLdqHDwpfeaJIM/user/get'); //subscribe表示从阿里云上接收信息
    hcswlight.publish('/a1i74r8Q1La/KALA0cvLdqHDwpfeaJIM/user/update', 'hello world!'); //publish表示向阿里云发送消息
});
hcswlight.postProps({ 'LightStatus': hcwzlightst }, (res) => {
    console.log(res);
});



//污渍监测器---------------------------------------------------------------------------------
const hcwzlight = iot.device({
    ProductKey: "a1v56JIJ7uq",
    DeviceName: "PvaPhJqmAgPvpWrKE5aM",
    DeviceSecret: "abc83b68c8dfc2df5f016d1165e44b33"
});
//监听connect事件
hcwzlight.on('connect', () => {
    //将<productKey> <deviceName>修改为实际值
    hcwzlight.subscribe('/a1v56JIJ7uq/PvaPhJqmAgPvpWrKE5aM/user/get'); //subscribe表示从阿里云上接收信息
    hcwzlight.publish('/a1v56JIJ7uq/PvaPhJqmAgPvpWrKE5aM/user/update', 'hello world!'); //publish表示向阿里云发送消息
});
hcwzlight.postProps({ 'LightStatus': hcswlightst }, (res) => {
    console.log(res);
});



//温湿度监测器---------------------------------------------------------------------------------
const hcwsd = iot.device({
    ProductKey: "a12ws7wPRqk",
    DeviceName: "uPR6dzpdK4AoTRSrBssD",
    DeviceSecret: "7b8753f9abd242553eecfa4ffa6ddbdb"
});
//监听connect事件
hcwsd.on('connect', () => {
    //将<productKey> <deviceName>修改为实际值
    hclight.subscribe('/a12ws7wPRqk/uPR6dzpdK4AoTRSrBssD/user/get'); //subscribe表示从阿里云上接收信息
    hclight.publish('/a12ws7wPRqk/uPR6dzpdK4AoTRSrBssD/user/update', 'hello world!'); //publish表示向阿里云发送消息
});
//监听message事件
hcwsd.on('message', (topic, payload) => {
    console.log(topic, payload.toString());
});



//烟雾报警器-----------------------------------------------------------------------------------------------------------------
const hcywbjq = iot.device({
    ProductKey: "a1M3tb6hlJe",
    DeviceName: "pBpTckqeQDGVehwg1v4V",
    DeviceSecret: "381db36ea75f781d437c487fa8385c5f"
})
//监听connect事件
hcywbjq.on('connect', () => {
    //将<productKey> <deviceName>修改为实际值
    hcywbjq.subscribe('/a1M3tb6hlJe/pBpTckqeQDGVehwg1v4V/user/get'); //subscribe表示从阿里云上接收信息
    hcywbjq.publish('/a1M3tb6hlJe/pBpTckqeQDGVehwg1v4V/user/update', 'hello world!'); //publish表示向阿里云发送消息
});
//监听message事件
hcywbjq.on('message', (topic, payload) => {
    console.log(topic, payload.toString());
});


//花洒-------------------------------------------------------------------------------------------
const hchs = iot.device({
    ProductKey: "a18lZy9CiJw",
    DeviceName: "Y723JhyksKK5XdLWuCKI",
    DeviceSecret: "b2499a297416b81e912efc5bbae75051"
})
//监听connect事件
hchs.on('connect', () => {
    //将<productKey> <deviceName>修改为实际值
    hchs.subscribe('/a18lZy9CiJw/XzuNovpvrlqMwkCpCD61/user/get'); //subscribe表示从阿里云上接收信息
    hchs.publish('/a18lZy9CiJw/XzuNovpvrlqMwkCpCD61/user/update', 'hello world!'); //publish表示向阿里云发送消息
});
//监听message事件
hchs.on('message', (topic, payload) => {
    console.log(topic, payload.toString());
});






module.exports = {
    hclight: hclight,
    hcwsd: hcwsd,
    hcwzlight: hcwzlight,
    hcswlight: hcswlight,
    hcywbjq: hcywbjq,
    hchs: hchs,
    //获取照明灯的状态
    gethclight: function () {
        return hclightst;
    },
    //设置照明灯的状态
    sethclight: function (status) {
        hclightst = Number(status);
    },
    //获取生物监测器的状态
    gethcswlight: function () {
        return hcwzlightst;
    },
    //设置生物监测器的状态
    sethcswlight: function (status) {
        hcwzlightst = Number(status);
    },
    //获取污渍监测器的状态
    gethcwzlight: function () {
        return hcswlightst;
    },
    //设置污渍监测器的状态
    sethcwzlight: function (status) {
        hcswlightst = Number(status);
    },
    //获取烟雾报警器的状态
    gethcywbjqlight: function () {
        return hcywbjqlightst;
    },
    //设置烟雾报警器的状态
    sethcywbjqlight: function (status) {
        hcywbjqlightst = Number(status);
    },
    //获取花洒的状态
    gethchslight: function () {
        return hchslightst;
    },
    //设置花洒的状态
    sethchslight: function (status) {
        hchslightst = Number(status);
    },
}