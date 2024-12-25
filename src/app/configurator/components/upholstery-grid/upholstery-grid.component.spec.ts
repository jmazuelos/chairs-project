import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpholsteryGridComponent } from './upholstery-grid.component';

describe('UpholsteryGridComponent', () => {
  let component: UpholsteryGridComponent;
  let fixture: ComponentFixture<UpholsteryGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpholsteryGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpholsteryGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
