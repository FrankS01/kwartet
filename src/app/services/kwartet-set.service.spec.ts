import { TestBed } from '@angular/core/testing';

import { KwartetSetService } from './kwartet-set.service';

describe('KwartetSetService', () => {
  let service: KwartetSetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KwartetSetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
