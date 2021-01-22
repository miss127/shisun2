import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { MENUS } from './home/data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  menus = MENUS;
  title = 'hotpot';
  hello = 1;//通过hello来显示右上角的是返回还是登录还是登陆之后的名字
  name = "";//登录后用户的名字
  constructor(private authService: AuthService) {
  }
  sethello(value) {//修改hello的值
    this.hello = value;
  }
  getname(userName) {//设置当前用户的名字
    this.name = userName;
  }
  sendname() {//获取当前用户的名字
    return this.name;
  }
  gethello() {//获得hello的值
    return this.hello;
  }
  logout() {//路由守卫退出
    this.authService.logout();
    this.sethello(1);
  }
}
