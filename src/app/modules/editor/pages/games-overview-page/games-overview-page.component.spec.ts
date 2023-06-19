import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesOverviewPageComponent } from './games-overview-page.component';

describe('GamesComponent', () => {
  let component: GamesOverviewPageComponent;
  let fixture: ComponentFixture<GamesOverviewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamesOverviewPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamesOverviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
