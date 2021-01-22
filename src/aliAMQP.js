const container = require('rhea');
const crypto = require('crypto');
const { gethclight } = require('./aliDevice');
var l = [];//返回的数组
var light;
var dt = new Date;
//创建Connection。
var connection = container.connect({
    //接入域名，请参见AMQP客户端接入说明文档。
    'host': '1470068617523706.iot-amqp.cn-shanghai.aliyuncs.com',
    'port': 5671,
    'transport': 'tls',
    'reconnect': true,
    'idle_time_out': 60000,
    //userName组装方法，请参见AMQP客户端接入说明文档。其中的iotInstanceId，购买的实例请填写实例ID，公共实例请填空字符串""。
    'username': 'DC-71-96-F2-98-01|authMode=aksign,signMethod=hmacsha1,timestamp=' + dt.getTime() + ',authId=LTAI4FwzAs6w36rg6k6RG5ZC, iotInstanceId ="", consumerGroupId = DEFAULT_GROUP | ',
    //计算签名，password组装方法，请参见AMQP客户端接入说明文档。
    'password': hmacSha1('9tPs44cgNa0d0PDhAJWKUfl1L687lV',
        'authId=LTAI4FwzAs6w36rg6k6RG5ZC&timestamp=' + dt.getTime()),
});

//创建Receiver Link。
var receiver = connection.open_receiver();

//接收云端推送消息的回调函数。
container.on('message', function (context) {
    var msg = context.message;
    var messageId = msg.message_id;
    var topic = msg.application_properties.topic;
    var content = Buffer.from(msg.body.content).toString();
    //AMQP发送过来的消息


    //灯
    if (topic === '/a1zvFd4mMig/zo2El4IAwlsqy9Z9OnJQ/thing/event/property/post') {
        let res = JSON.parse(content);//解析
        let date = new Date(res.gmtCreate);//获取AMQP发来的时间
        //对时间进行解析
        let time = date.getFullYear() + '-' +
            getzf(date.getMonth() + 1) + '-' +
            getzf(date.getDate()) + ' ' +
            getzf(date.getHours()) + ':' +
            getzf(date.getMinutes()) + ':' +
            getzf(date.getSeconds());
        let status = "打开";
        if (res.items.LightStatus.value == 0) {
            status = "关闭";
            light = 0;
        }
        else {
            status = "打开";
            light = 1;
        }
        //封装成一个JSON
        let obj = {
            deviceName: '照明指示灯',
            value: '状态 : ' + status,
            CurrentTime: '时间 : ' + time
        }
        //加入进数组
        console.log(obj);
        l.push(obj);
    }
    //温湿度
    else if (topic === '/a12ws7wPRqk/uPR6dzpdK4AoTRSrBssD/thing/event/property/post') {
        let res = JSON.parse(content);
        let date = new Date(res.gmtCreate);
        let time = date.getFullYear() + '-' +
            getzf(date.getMonth() + 1) + '-' +
            getzf(date.getDate()) + ' ' +
            getzf(date.getHours()) + ':' +
            getzf(date.getMinutes()) + ':' +
            getzf(date.getSeconds());
        let obj = {
            deviceName: '温湿度传感器',
            value: '温度 : ' + Number(res.items.CurrentTemperature.value).toFixed(2) + '\n 湿度 : ' + Number(res.items.CurrentHumidity.value).toFixed(2),
            CurrentTime: '时间 : ' + time
        }
        //   console.log(obj);
        l.push(obj);
    }
    //生物传感器
    else if (topic === '/a1i74r8Q1La/KALA0cvLdqHDwpfeaJIM/thing/event/property/post') {
        let res = JSON.parse(content);
        let date = new Date(res.gmtCreate);
        let time = date.getFullYear() + '-' +
            getzf(date.getMonth() + 1) + '-' +
            getzf(date.getDate()) + ' ' +
            getzf(date.getHours()) + ':' +
            getzf(date.getMinutes()) + ':' +
            getzf(date.getSeconds());        // let status = "检测到生物";
        if (res.items.LightStatus.value == 0) {
            status = "未检测到生物";
        }
        else {
            status = "检测到生物";
        }
        let obj = {
            deviceName: '生物检测器',
            value: '状态 : ' + status,
            CurrentTime: '时间 : ' + time
        }
        l.push(obj);
        console.log(obj);
    }
    //污渍传感器
    else if (topic === '/a1v56JIJ7uq/PvaPhJqmAgPvpWrKE5aM/thing/event/property/post') {
        let res = JSON.parse(content);
        let date = new Date(res.gmtCreate);
        let time = date.getFullYear() + '-' +
            getzf(date.getMonth() + 1) + '-' +
            getzf(date.getDate()) + ' ' +
            getzf(date.getHours()) + ':' +
            getzf(date.getMinutes()) + ':' +
            getzf(date.getSeconds());
        let status = "检测到污渍";
        if (res.items.LightStatus.value == 0) {
            status = "未检测到污渍";
        }
        else {
            status = "检测到污渍";
        }
        let obj = {
            deviceName: '污渍检测器',
            value: '状态 : ' + status,
            CurrentTime: '时间 : ' + time
        }
        l.push(obj);
        console.log(obj);
    }
    //花洒
    else if (topic === '/a18lZy9CiJw/XzuNovpvrlqMwkCpCD61/thing/event/property/post') {
        let res = JSON.parse(content);
        let date = new Date(res.gmtCreate);
        let time = date.getFullYear() + '-' +
            getzf(date.getMonth() + 1) + '-' +
            getzf(date.getDate()) + ' ' +
            getzf(date.getHours()) + ':' +
            getzf(date.getMinutes()) + ':' +
            getzf(date.getSeconds());
        let status = "花洒已开启";
        if (res.items.WaterOutletSwitch.value == 0) {
            status = "花洒未开启";
        }
        else {
            status = "花洒已开启";
        }
        let obj = {
            deviceName: '花洒',
            value: '状态 : ' + status,
            CurrentTime: '时间 : ' + time
        }
        l.push(obj);
        console.log(obj);
    }
    //烟雾报警器
    else if (topic === '/a1M3tb6hlJe/pBpTckqeQDGVehwg1v4V/thing/event/property/post') {
        let res = JSON.parse(content);
        let date = new Date(res.gmtCreate);
        let time = date.getFullYear() + '-' +
            getzf(date.getMonth() + 1) + '-' +
            getzf(date.getDate()) + ' ' +
            getzf(date.getHours()) + ':' +
            getzf(date.getMinutes()) + ':' +
            getzf(date.getSeconds());
        let status = "检测到烟雾浓度过高";
        if (res.items.SmokeSensorState.value == 0) {
            status = "正常";
        }
        else {
            status = "检测到烟雾浓度过高";
        }
        let obj = {
            deviceName: '烟雾报警器',
            value: '状态 : ' + status,
            CurrentTime: '时间 : ' + time
        }
        l.push(obj);
        console.log(obj);
    }
    //发送ACK，注意不要在回调函数有耗时逻辑。
    context.delivery.accept();
});
//不足两位的前面补零
function getzf(num) {
    if (parseInt(num) < 10) {
        num = '0' + num;
    }
    return num;
}
//计算password签名。
function hmacSha1(key, context) {
    return Buffer.from(crypto.createHmac('sha1', key).update(context).digest())
        .toString('base64');
}
module.exports = {
    getamqp() {
        return l;//AMQP消息返回成一个数组
    },
    gethclight() {
        return light;
    }
}