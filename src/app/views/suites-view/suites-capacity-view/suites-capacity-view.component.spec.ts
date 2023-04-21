import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SuitesCapacityViewComponent } from "./suites-capacity-view.component";

describe("SuitesCapacityViewComponent", () => {
  let component: SuitesCapacityViewComponent;
  let fixture: ComponentFixture<SuitesCapacityViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuitesCapacityViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SuitesCapacityViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
