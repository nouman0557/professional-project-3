import { TestBed } from '@angular/core/testing';

import { RepairRoomGQLService } from './repair-room-gql.service';

describe('RepairRoomGQLService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RepairRoomGQLService = TestBed.get(RepairRoomGQLService);
    expect(service).toBeTruthy();
  });
});
