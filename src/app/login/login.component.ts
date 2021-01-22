import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
function userNameValidator(control: FormControl): { [s: string]: boolean } {
  if (!control.value.match(/^a/)) {
    return { invalidUser: true };
  }
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //登录表单
  myForm: FormGroup;
  //  用户名
  userName: AbstractControl;
  //密码
  password: AbstractControl;

  name$: Observable<string>;
  // baseUrl = 'http://127.0.0.1:8080/';
  baseUrl = 'http://192.168.43.31:8080/';
  constructor(private app: AppComponent, private authService: AuthService, private fb: FormBuilder, private httpClient: HttpClient, private router: Router) {
    this.myForm = this.fb.group(
      {
        'userName': ['', Validators.compose([Validators.required, Validators.minLength(5)])],
        'password': ['', Validators.compose([Validators.required, Validators.minLength(5)])]
      }
    );
    this.userName = this.myForm.controls['userName'];
    this.password = this.myForm.controls['password'];
    this.name$ = this.userName.valueChanges;
    this.userName.valueChanges.subscribe(val => {
      console.log(val);
    });
  }

  ngOnInit(): void {
  }

  onSubmit(value: any) {
    console.log(value);
  }
  login() {
    if (!this.myForm.valid) {
      alert('请先输入用户名和密码');
    }
    else {

      this.httpClient.post(this.baseUrl + 'users', this.myForm.value).subscribe((val: any) => {
        if (val.succ) {
          alert('登录成功')
          this.authService.login();
          this.router.navigate(['/mg']);
          var res = val.msg;
          console.log(res);
          if (res[0].userName == "admin") {
            this.app.sethello(3);
          }
          else {
            this.app.sethello(4);
          }
          this.app.getname(res[0].userName);
        }
        else {
          alert('用户名或密码错误');
        }
      })
    }
  }
}
