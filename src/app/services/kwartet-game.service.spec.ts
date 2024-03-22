import { TestBed } from '@angular/core/testing';

import { KwartetGameService } from './kwartet-game.service';

describe('KwartetGameService', () => {
  let service: KwartetGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KwartetGameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
