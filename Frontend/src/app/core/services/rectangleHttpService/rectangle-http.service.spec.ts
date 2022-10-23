import { TestBed } from '@angular/core/testing';

import { RectangleHttpService } from './rectangle-http.service';

describe('RectangleHttpService', () => {
  let service: RectangleHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RectangleHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
