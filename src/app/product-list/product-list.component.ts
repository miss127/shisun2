import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  light1: number;
  light2: number;
  light3: number;
  light4: number;
  device1 = "hclight";
  device2 = "hcwz";
  device3 = "hcsw";
  device4 = "hcywbjq";
  // baseUrl = 'http://127.0.0.1:8080/';
  baseUrl = 'http://192.168.43.31:8080/';
  xAxis = [];
  temps = [];
  humds = [];
  chartOption = {
    title: {
      text: '温湿度跟踪图'
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['温度', '湿度']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    //横坐标的值
    xAxis: [
      {
        type: 'category',
        boudaryGap: false,
        data: []
      }
    ],
    //纵坐标的值
    yAxis: [
      {
        type: 'value'
      }
    ],
    //数据
    series: [
      {
        name: '温度',
        type: 'line',
        stack: '度',
        label: {
          normal: {
            show: true
          }
        },
        areaStyle: { normal: { areaStyle: { type: 'default' }, color: '#0bebf9' } },
        itemStyle: {
          normal: {
            color: '#F4522F', //改变折线点的颜色
            lineStyle: {
              color: '#8cd5c2' //改变折线颜色
            }
          }
        },
        data: []
      },
      {
        name: '湿度',
        type: 'line',
        stack: '%',
        label: {
          normal: {
            show: true
          }
        },
        areaStyle: { normal: { areaStyle: { type: 'default' }, color: '#fcf367' } },
        itemStyle: {
          normal: {
            color: '#8cd5c2', //改变折线点的颜色
            lineStyle: {
              color: '#8cd5c2' //改变折线颜色
            }
          }
        },
        data: []
      }
    ]
  };
  updateOption = {};
  constructor(private httpclient: HttpClient) { }

  ngOnInit(): void {
    // this.httpclient.put(this.baseUrl + "ali/" + this.device1, function (err, data) {
    //   console.log(data);
    //   this.light1 = Number(data);
    // })
    this.getstatues();//获取所有设备的状态
    this.getwsd();//获取温湿度显示在图表中
  }
  onlight1() {
    this.light1 = 1;
    this.httpclient.put(this.baseUrl + "ali/setstate/" + this.device1 + "/" + this.light1, {}).subscribe((val: any) => {
    })
    //向这个端口发送开灯的指令
  }
  offlight1() {
    this.light1 = 0;
    this.httpclient.put(this.baseUrl + "ali/setstate/" + this.device1 + "/" + this.light1, {}).subscribe((val: any) => {
    })
  }
  getwsd() {
    let i = 0;
    timer(5000, 5000).subscribe(
      () => {
        this.httpclient.get(this.baseUrl + 'ali/getwsd').subscribe(
          (value: any) => {
            if (value.length > 0) {
              const d = new Date();
              for (let item of value) {
                const dHours = d.getHours();
                const dMinutes = d.getMinutes();
                const dSeconds = d.getSeconds();
                this.xAxis[i] = dHours + ':' + dMinutes + ':' + dSeconds;
                this.temps[i] = (Number(item.temp).toFixed(2));
                this.humds[i] = (Number(item.humd).toFixed(2));
                i++;
                if (this.xAxis.length > 10) {
                  this.xAxis.shift();
                  this.temps.shift();
                  this.humds.shift();
                }
              }
              this.updateOption = {
                xAxis: [{
                  data: this.xAxis
                }],
                series: [{
                  data: this.temps
                }, {
                  data: this.humds
                }]
              }
            }
          }
        )
      }
    )
  }
  getstatues() {
    console.log("正在get");
    timer(2000, 2000).subscribe(
      () => {
        this.httpclient.get(this.baseUrl + "ali/getstate")
          .subscribe((res) => {
            let re = JSON.parse(JSON.stringify(res));
            for (let c of re) {
              console.log(c);
              if (c.deviceName == this.device1) {
                this.light1 = c.deviceStatus;
              }
              if (c.deviceName == this.device2) {
                this.light2 = c.deviceStatus;
              }
              if (c.deviceName == this.device3) {
                this.light3 = c.deviceStatus;
              }
              if (c.deviceName == this.device4) {
                this.light4 = c.deviceStatus;
              }
            }
          });
      });
  }
}
