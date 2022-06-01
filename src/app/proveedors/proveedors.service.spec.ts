import { TestBed } from '@angular/core/testing';

import { ProveedorsService } from './proveedors.service';

describe('ProveedorsService', () => {
  let service: ProveedorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProveedorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
