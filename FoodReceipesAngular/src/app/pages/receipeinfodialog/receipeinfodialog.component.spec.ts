import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceipeinfodialogComponent } from './receipeinfodialog.component';

describe('ReceipeinfodialogComponent', () => {
  let component: ReceipeinfodialogComponent;
  let fixture: ComponentFixture<ReceipeinfodialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReceipeinfodialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReceipeinfodialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
