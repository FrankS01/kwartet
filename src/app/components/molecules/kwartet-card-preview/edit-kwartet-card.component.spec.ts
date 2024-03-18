import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditKwartetCardComponent } from './edit-kwartet-card.component';

describe('KwartetCardPreviewComponent', () => {
  let component: EditKwartetCardComponent;
  let fixture: ComponentFixture<EditKwartetCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditKwartetCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditKwartetCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
