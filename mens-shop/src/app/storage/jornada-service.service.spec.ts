import { TestBed } from '@angular/core/testing';

import { JornadaServiceService } from './jornada-service.service';

describe('JornadaServiceService', () => {
  let service: JornadaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JornadaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
