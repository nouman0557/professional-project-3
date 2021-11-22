import { TestBed } from '@angular/core/testing';

import { CreateSaleService } from './create-sale.service';

describe('CreateSaleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreateSaleService = TestBed.get(CreateSaleService);
    expect(service).toBeTruthy();
  });
});
