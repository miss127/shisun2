import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SbComponentComponent } from './sb-component.component';

describe('SbComponentComponent', () => {
  let component: SbComponentComponent;
  let fixture: ComponentFixture<SbComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SbComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SbComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
