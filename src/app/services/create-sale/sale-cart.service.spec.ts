import { TestBed } from '@angular/core/testing';

import { SaleCartService } from './sale-cart.service';

describe('SaleCartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SaleCartService = TestBed.get(SaleCartService);
    expect(service).toBeTruthy();
  });
});
