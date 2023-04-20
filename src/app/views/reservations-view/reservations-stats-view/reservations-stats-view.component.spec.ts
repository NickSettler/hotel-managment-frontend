import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationsStatsViewComponent } from './reservations-stats-view.component';

describe('ReservationsStatsViewComponent', () => {
  let component: ReservationsStatsViewComponent;
  let fixture: ComponentFixture<ReservationsStatsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationsStatsViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationsStatsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
