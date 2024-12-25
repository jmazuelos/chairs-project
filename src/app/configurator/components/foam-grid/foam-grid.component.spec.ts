import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoamGridComponent } from './foam-grid.component';

describe('FoamGridComponent', () => {
  let component: FoamGridComponent;
  let fixture: ComponentFixture<FoamGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoamGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoamGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
