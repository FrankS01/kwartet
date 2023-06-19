import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameDetailsPageComponent } from './game-details-page.component';

describe('SetsComponent', () => {
  let component: GameDetailsPageComponent;
  let fixture: ComponentFixture<GameDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameDetailsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
