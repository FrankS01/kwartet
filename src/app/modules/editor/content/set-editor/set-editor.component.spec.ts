import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetEditorComponent } from './set-editor.component';

describe('SetComponent', () => {
  let component: SetEditorComponent;
  let fixture: ComponentFixture<SetEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
