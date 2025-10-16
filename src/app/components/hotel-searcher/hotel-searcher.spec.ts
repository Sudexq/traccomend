import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelSearcher } from './hotel-searcher';

describe('HotelSearcher', () => {
  let component: HotelSearcher;
  let fixture: ComponentFixture<HotelSearcher>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelSearcher]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelSearcher);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
