import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversionCoinComponent } from './conversion-coin.component';

describe('ConversionCoinComponent', () => {
  let component: ConversionCoinComponent;
  let fixture: ComponentFixture<ConversionCoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConversionCoinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConversionCoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
