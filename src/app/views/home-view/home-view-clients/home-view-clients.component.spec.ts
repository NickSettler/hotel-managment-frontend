import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeViewClientsComponent } from './home-view-clients.component';

describe('HomeViewClientsComponent', () => {
  let component: HomeViewClientsComponent;
  let fixture: ComponentFixture<HomeViewClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeViewClientsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeViewClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
