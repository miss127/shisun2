import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from './user';

@Component({
  selector: 'app-user-mg',
  templateUrl: './user-mg.component.html',
  styleUrls: ['./user-mg.component.css']
})
export class UserMgComponent implements OnInit {
  myForm: FormGroup;
  userName: AbstractControl;
  id: AbstractControl;
  password: AbstractControl;
  users$: Observable<User>;
  // baseUrl = 'http://127.0.0.1:8080/';
  baseUrl = 'http://192.168.43.31:8080/';
  currentUser: User;
  constructor(private fb: FormBuilder, private httpClient: HttpClient) {
    this.myForm = this.fb.group(
      {
        'userName': [''],
        'id': [''],
        'password': ['']
      }
    );
    this.userName = this.myForm.controls['userName'];
    this.id = this.myForm.controls['id'];
    this.password = this.myForm.controls['password'];
  }
  init() {
    this.myForm.controls['id'].setValue("");
    this.myForm.controls['userName'].setValue("");
    this.myForm.controls['password'].setValue("");
  }
  //查询用户
  search() {
    if (this.id.value) {
      this.users$ = <Observable<User>>this.httpClient.get(this.baseUrl + 'user/search/' + this.id.value);
      this.init();
    }
    else {
      this.users$ = <Observable<User>>this.httpClient.get(this.baseUrl + 'user/searchAll');
    }
  }
  //添加用户
  add() {
    if (this.userName.value.length < 5 || this.password.value.length < 5) {
      alert('用户名或密码不得小于五位');
      this.init();
      this.search();
    }
    else {
      this.httpClient.post(this.baseUrl + 'adduser', this.myForm.value).subscribe((val: any) => {
        if (val.succ) {
          alert('添加成功！');
          this.init();
          this.search();
        }
        else {
          alert(val.msg);
          this.init();
          this.search();
        }
      })
    }
  }
  //选择用户
  select(u: User) {
    this.currentUser = u;
    this.myForm.setValue(this.currentUser);
  }
  //删除用户
  delete() {
    if (!this.currentUser) {
      alert('必须先选择用户！');
    }
    else {
      this.httpClient.delete(this.baseUrl + 'deleteuser/' + this.currentUser.id).subscribe((val: any) => {
        if (val.succ) {
          alert('删除成功');
          this.init();
          this.search();
        }
        else {
          alert(val.msg);
          this.init();
          this.search();
        }
      })
    }
  }
  //修改用户
  update() {
    if (!this.currentUser) {
      alert('必须先选择用户！');
    }
    else {
      if (this.userName.value.length < 5 || this.password.value.length < 5) {
        alert('用户名或密码不得小于五位');
        this.init();
        this.search();
      }
      else {
        if (this.currentUser.id != this.myForm.controls['id'].value) {
          alert('不能修改id');
          this.init();
          this.search();
        }
        this.httpClient.put(this.baseUrl + 'updatauser', this.myForm.value).subscribe((val: any) => {
          if (val.succ) {
            alert('修改成功');
            this.init();
            this.search();
          }
        })
      }
    }
  }
  ngOnInit(): void {
    this.users$ = <Observable<User>>this.httpClient.get(this.baseUrl + 'user/searchAll');
  }
}
