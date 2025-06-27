import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryPerson } from './delivery-person';

describe('DeliveryPerson', () => {
  let component: DeliveryPerson;
  let fixture: ComponentFixture<DeliveryPerson>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliveryPerson]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryPerson);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
