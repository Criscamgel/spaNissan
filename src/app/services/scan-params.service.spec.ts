import { TestBed } from '@angular/core/testing';

import { ScanParamsService } from './scan-params.service';

describe('ScanParamsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScanParamsService = TestBed.get(ScanParamsService);
    expect(service).toBeTruthy();
  });
});
