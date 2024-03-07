import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSetComponent } from './edit-set.component';

describe('EditSetComponent', () => {
  let component: EditSetComponent;
  let fixture: ComponentFixture<EditSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditSetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
