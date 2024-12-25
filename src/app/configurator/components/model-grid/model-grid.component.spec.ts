import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelGridComponent } from './model-grid.component';

describe('ModelGridComponent', () => {
  let component: ModelGridComponent;
  let fixture: ComponentFixture<ModelGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
