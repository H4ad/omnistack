import { TestBed } from '@angular/core/testing';

import { IncidentInteractor } from './incident.interactor';

describe('IncidentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IncidentInteractor = TestBed.get(IncidentInteractor);
    expect(service).toBeTruthy();
  });
});
