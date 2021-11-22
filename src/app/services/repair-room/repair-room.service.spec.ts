import { TestBed } from '@angular/core/testing';

import { RepairRoomService } from './repair-room.service';

describe('RepairRoomService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RepairRoomService = TestBed.get(RepairRoomService);
    expect(service).toBeTruthy();
  });
});
