import { TestBed } from '@angular/core/testing';

import { DeliveryPerson } from './delivery-person';

describe('DeliveryPerson', () => {
  let service: DeliveryPerson;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeliveryPerson);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
