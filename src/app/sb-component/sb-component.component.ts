import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { sb } from './sb';

@Component({
  selector: 'app-sb-component',
  templateUrl: './sb-component.component.html',
  styleUrls: ['./sb-component.component.css']
})
export class SbComponentComponent implements OnInit {
  myForm: FormGroup;
  ProductKey: AbstractControl;
  DeviceName: AbstractControl;
  DeviceSecret: AbstractControl;
  // IotId:AbstractControl;
  sbs$: Observable<sb>;
  // baseUrl = 'http://127.0.0.1:8080/';
  baseUrl = 'http://192.168.43.31:8080/';
  currentali: sb;
  constructor(private fb: FormBuilder, private httpClient: HttpClient) {
    this.myForm = this.fb.group({
      'ProductKey': [''],
      'DeviceName': [''],
      'DeviceSecret': [''],
      // 'IotId': [''],
    });
    this.ProductKey = this.myForm.controls['ProductKey'];
    this.DeviceName = this.myForm.controls['DeviceName'];
    this.DeviceSecret = this.myForm.controls['DeviceSecret'];
    // this.IotId = this.myForm.controls['IotId'];
  }

  ngOnInit(): void {
    // this.sbs$ = <Observable<sb>>this.httpClient.get(this.baseUrl + 'sb');
  }
  select(a: sb) {
    this.currentali = a;
    this.myForm.controls['ProductKey'].setValue(this.currentali.ProductKey);
    this.myForm.controls['DeviceName'].setValue(this.currentali.DeviceName);
    this.myForm.controls['DeviceSecret'].setValue(this.currentali.DeviceSecret);
  }

  search() {
    const params = new HttpParams()
      .set('ProductKey', this.ProductKey.value)
    if (this.ProductKey.value) {
      this.sbs$ = <Observable<sb>>this.httpClient.get(this.baseUrl + 'sbsearch/' + params);
    } else {
    }
  }

  add() {
    let params = new HttpParams()
      .set('ProductKey', this.ProductKey.value)
      .set('DeviceName', this.DeviceName.value)
      .set('DeviceSecret', this.DeviceSecret.value)
    // .set('IotId', this.IotId.value)
    console.log(this.myForm.value);
    this.httpClient.post(this.baseUrl + 'sbadd', this.myForm.value).subscribe(
      (val: any) => {
        if (val.succ) {
          alert('添加成功!');
          // this.sbs$ = <Observable<sb>>this.httpClient.get(this.baseUrl + 'sb');
          this.search();
        }
      }
    );
  }

  delete() {
    const params = {
      ProductKey: this.ProductKey.value,
      DeviceName: this.DeviceName.value,
    }
    this.httpClient.post(this.baseUrl + 'sbdelete', params).subscribe(
      (val: any) => {
        if (val.succ) {
          alert('删除成功！');
          this.search();
        }
      }
    )
  }
}
