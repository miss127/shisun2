import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, timer } from 'rxjs';

@Component({
  selector: 'app-yw-mg',
  templateUrl: './yw-mg.component.html',
  styleUrls: ['./yw-mg.component.css']
})
export class YwMgComponent implements OnInit {

  constructor(private httpclient: HttpClient) { }
  // baseUrl = 'http://127.0.0.1:8181/';
  baseUrl = 'http://192.168.43.31:8181/';
  message = [];
  light1;
  device1 = "hclight";
  ngOnInit(): void {
    this.getaliamqp();
  }
  getaliamqp() {
    timer(2000, 2000).subscribe(
      () => {
        this.message.splice(0, this.message.length);
        this.httpclient.get(this.baseUrl + 'ali/aliamqp').subscribe(
          (value: any) => {
            for (let i of value) {
              this.message.push({
                deviceName: i.deviceName,
                value: i.value,
                CurrentTime: i.CurrentTime
              })
            }
          });
        this.httpclient.get(this.baseUrl + "ali/getlight")
          .subscribe((res) => {
            console.log(res);
            this.light1 = Number(res);
          });
      });
  }
  onlight1() {
    this.light1 = 1;
    this.httpclient.put(this.baseUrl + "ali/setstate/" + this.device1 + "/" + this.light1, {}).subscribe((val: any) => {
    })
  }
  offlight1() {
    this.light1 = 0;
    this.httpclient.put(this.baseUrl + "ali/setstate/" + this.device1 + "/" + this.light1, {}).subscribe((val: any) => {
    })
  }
}
