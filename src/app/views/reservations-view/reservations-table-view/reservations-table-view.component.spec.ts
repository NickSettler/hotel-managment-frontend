import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationsTableViewComponent } from './reservations-table-view.component';

describe('ReservationsTableViewComponent', () => {
  let component: ReservationsTableViewComponent;
  let fixture: ComponentFixture<ReservationsTableViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationsTableViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationsTableViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
