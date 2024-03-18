import { TestBed } from '@angular/core/testing';

import { KwartetCardService } from './kwartet-card.service';

describe('KwartetCardService', () => {
  let service: KwartetCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KwartetCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
