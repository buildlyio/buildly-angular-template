import { TestBed, inject } from '@angular/core/testing';

import { MidgardService } from './midgard.service';

describe('MidgardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MidgardService]
    });
  });

  it('should be created', inject([MidgardService], (service: MidgardService) => {
    expect(service).toBeTruthy();
  }));
});
