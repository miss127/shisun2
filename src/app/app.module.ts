import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { Route, RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './login.guard';
import { AuthService } from './auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ManagementComponent } from './management/management.component';
import { UserMgComponent } from './user-mg/user-mg.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductMgComponent } from './product-mg/product-mg.component';
import { MapComponent } from './map/map.component';
import { YwMgComponent } from './yw-mg/yw-mg.component';
import { ExitComponent } from './exit/exit.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { SbComponentComponent } from './sb-component/sb-component.component';
const mgChildroute: Routes = [//子路由
  { path: 'user', component: UserMgComponent },
  { path: '', redirectTo: 'prolist', pathMatch: 'full' },
  { path: 'map', component: MapComponent },
  { path: 'prolist', component: ProductListComponent },
  { path: 'promg', component: ProductMgComponent },
  { path: 'ywdp', component: YwMgComponent },
  { path: 'exit', component: ExitComponent },
  { path: 'sb', component: SbComponentComponent }
]
const routes: Routes = [//路由表
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'mg', component: ManagementComponent,
    children: mgChildroute,
    canActivate: [LoginGuard]
  },
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ManagementComponent,
    UserMgComponent,
    ProductListComponent,
    ProductMgComponent,
    MapComponent,
    YwMgComponent,
    ExitComponent,
    SbComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),//使用路由表
    NgxEchartsModule,//echart的依赖
  ],
  providers: [LoginGuard, AuthService, AppComponent],//路由守卫，APPComponent当成父组件传递
  bootstrap: [AppComponent]
})
export class AppModule { }
