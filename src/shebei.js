const Core = require('@alicloud/pop-core');
var client = new Core({
    accessKeyId: 'LTAI4FwzAs6w36rg6k6RG5ZC',
    accessKeySecret: '9tPs44cgNa0d0PDhAJWKUfl1L687lV',
    endpoint: 'https://iot.cn-shanghai.aliyuncs.com',
    apiVersion: '2018-01-20'
});

module.exports = {
    add(req, resp) {
        var prokey = req.body.ProductKey;
        console.log(req.body.ProductKey);
        var params = {
            "RegionId": "cn-hangzhou",
            "ProductKey": prokey
        }
        var requestOption = {
            method: 'POST'
        };
        client.request('RegisterDevice', params, requestOption).then((result) => {
            resp.send({ succ: true })
            console.log(JSON.stringify(result));
        }, (ex) => {
            console.log(ex);
        })
    },

    delete(req, resp) {
        // var id = req.params['IotId'];
        var prokey = req.body.ProductKey;
        var sbname = req.body.DeviceName;
        console.log(req.body.ProductKey + '    ' + req.body.DeviceName);
        var params = {
            "RegionId": "cn-hangzhou",
            // "IotId": id,
            "ProductKey": prokey,
            "DeviceName": sbname,
        }
        var requestOption = {
            method: 'POST'
        };
        client.request('DeleteDevice', params, requestOption).then((result) => {
            resp.send({ succ: true })
            console.log(JSON.stringify(result));
        }, (ex) => {
            console.log(ex);
        })
    },

    search(req, resp) {
        var querystring = require('querystring');
        var result = querystring.parse(req.params.ProductKey);
        let prokey = result.ProductKey;
        console.log()
        var params = {
            "RegionId": "cn-hangzhou",
            "ProductKey": prokey,
        }
        var requestOption = {
            method: 'POST'
        };
        client.request('QueryDevice', params, requestOption).then((result) => {
            var aa = JSON.parse(JSON.stringify(result)).Data.DeviceInfo;
            resp.send(aa)
        }, (ex) => {
            console.log(ex);
        })
    },
}