import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsListViewComponent } from './clients-list-view.component';

describe('ClientsListViewComponent', () => {
  let component: ClientsListViewComponent;
  let fixture: ComponentFixture<ClientsListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientsListViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientsListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
