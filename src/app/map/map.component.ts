import { Component, OnInit } from '@angular/core';
declare var AMap: any;    // 一定要声明AMap，要不然报错找不到AMap
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.getMap();
  }
  getMap() {
    console.log("hello");
    var l = [];//坐标数组
    //地图
    var map = new AMap.Map('container', {
      resizeEnable: true
    })
    AMap.plugin('AMap.Geolocation', function () {
      var geolocation = new AMap.Geolocation({
        enableHighAccuracy: true,//是否使用高精度定位，默认:true
        timeout: 10000,          //超过10秒后停止定位，默认：5s
        maximumAge: 0,           //定位结果缓存0毫秒，默认：0
        showMarker: false,       //定位成功后在定位到的位置显示点标记，默认：true
        buttonPosition: 'RB',    //定位按钮的停靠位置
        panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
        buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        //zoomToAccuracy: true,    //定位成功后是否自动调整地图视野到定位点
      });
      map.addControl(geolocation);
      geolocation.getCurrentPosition(function (status, result) {
        if (status == 'complete') {
          onComplete(result)
        } else {
          console.log(status);
          onError(result)
        }
      });
      // data是具体的定位信息
      function onComplete(data) {
        var marker = new AMap.Marker({
          position: data.position,   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        });
        var marker1 = new AMap.Marker({
          position: [120.504826, 30.086054]
        });
        var marker2 = new AMap.Marker({
          position: [121.274282, 31.041458]
        });
        //加标记点
        map.add(marker);
        map.add(marker1);
        map.add(marker2);

      }
      // 定位出错
      function onError(data) {
        console.log(data);
      }
    })
    //步行导航
    AMap.plugin('AMap.Walking', function () {
      var walking = new AMap.Walking({
        map: map,
        panel: "panel"//导航的指示路线
      });
      var startLngLat = [120.504826, 30.086054]
      var endLngLat = [120.504826, 30.041458]

      walking.search(startLngLat, endLngLat, function (status, result) {
        // 未出错时，result即是对应的路线规划方案
        console.log(status);
        console.log(result);
      })
    });
  }
}
