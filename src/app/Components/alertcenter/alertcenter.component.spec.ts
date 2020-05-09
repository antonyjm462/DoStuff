import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertcenterComponent } from './alertcenter.component';

describe('AlertcenterComponent', () => {
  let component: AlertcenterComponent;
  let fixture: ComponentFixture<AlertcenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertcenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertcenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
