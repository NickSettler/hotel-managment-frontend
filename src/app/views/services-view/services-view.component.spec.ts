import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesViewComponent } from './services-view.component';

describe('ServicesViewComponent', () => {
  let component: ServicesViewComponent;
  let fixture: ComponentFixture<ServicesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicesViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
