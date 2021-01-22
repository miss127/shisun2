import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Product } from './product';

@Component({
  selector: 'app-product-mg',
  templateUrl: './product-mg.component.html',
  styleUrls: ['./product-mg.component.css']
})
export class ProductMgComponent implements OnInit {
  myForm: FormGroup;
  ProductName: AbstractControl;
  ProductKey: AbstractControl;
  products$: Observable<Product>;
  // baseUrl = 'http://127.0.0.1:8080/';
  baseUrl = 'http://192.168.43.31:8080/';
  currentPro: Product;
  constructor(private fb: FormBuilder, private httpClient: HttpClient) {
    this.myForm = this.fb.group(
      {
        'GmtCreate': [''],
        'ProductName': [''],
        'NodeType': [''],
        'DataFormat': [''],
        'AuthType': [''],
        'ProductKey': [''],
        'DeviceCount': [''],
      }
    );
    this.ProductName = this.myForm.controls['ProductName'];
    this.ProductKey = this.myForm.controls['ProductKey'];
  }
  ngOnInit(): void {
    this.search();
  }
  init() {
    this.myForm.controls['ProductName'].setValue("");
    this.myForm.controls['ProductKey'].setValue("");
  }
  //查询设备
  search() {
    if (this.ProductKey.value) {//key中有值的话则按照key值查询单个设备
      console.log(this.ProductKey.value);
      this.products$ = <Observable<Product>>this.httpClient.get(this.baseUrl + 'search/' + this.ProductKey.value);
      this.init();
    }
    else {//key中没有值则查询所有设备
      this.products$ = <Observable<Product>>this.httpClient.get(this.baseUrl + 'searchAll');
    }

  }
  //添加设备
  add() {
    this.httpClient.post(this.baseUrl + 'addpro', this.myForm.value).subscribe((val: any) => {
      if (val.succ) {
        alert('添加成功');
        this.init();
        this.search();
      }
    });
  }
  //删除设备
  delete() {
    this.httpClient.delete(this.baseUrl + 'deletepro/' + this.currentPro.ProductKey).subscribe((val: any) => {
      if (val.succ) {
        alert('删除成功');
        this.init();
        this.search();
      }
    });
  }
  //修改设备
  update() {
    this.httpClient.put(this.baseUrl + 'updatapro', this.myForm.value).subscribe((val: any) => {
      if (val.succ) {
        alert('修改成功');
        this.init();
        this.search();
      }
    })
  }
  //选择设备
  select(u: Product) {
    this.currentPro = u;
    this.myForm.controls['ProductName'].setValue(this.currentPro.ProductName);
    this.myForm.controls['ProductKey'].setValue(this.currentPro.ProductKey);
  }
}
