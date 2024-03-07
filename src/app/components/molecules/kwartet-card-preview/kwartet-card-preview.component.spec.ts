import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KwartetCardPreviewComponent } from './kwartet-card-preview.component';

describe('KwartetCardPreviewComponent', () => {
  let component: KwartetCardPreviewComponent;
  let fixture: ComponentFixture<KwartetCardPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KwartetCardPreviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KwartetCardPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
