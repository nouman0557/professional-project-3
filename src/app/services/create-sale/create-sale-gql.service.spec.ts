import { TestBed } from '@angular/core/testing';

import { CreateSaleGQLService } from './create-sale-gql.service';

describe('CreateSaleGQLService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreateSaleGQLService = TestBed.get(CreateSaleGQLService);
    expect(service).toBeTruthy();
  });
});
