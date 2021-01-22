import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {

  constructor(private app: AppComponent) { }
  hello;
  ngOnInit(): void {
    this.hello = this.app.gethello();
    console.log(this.hello);
  }

}
