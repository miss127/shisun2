import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YwMgComponent } from './yw-mg.component';

describe('YwMgComponent', () => {
  let component: YwMgComponent;
  let fixture: ComponentFixture<YwMgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YwMgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YwMgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
