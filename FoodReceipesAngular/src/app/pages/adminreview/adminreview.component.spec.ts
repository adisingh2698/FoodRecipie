import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReviewComponent } from './adminreview.component';

describe('AdminhalllistComponent', () => {
  let component: AdminReviewComponent;
  let fixture: ComponentFixture<AdminReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminReviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
