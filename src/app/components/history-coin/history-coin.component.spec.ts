import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryCoinComponent } from './history-coin.component';

describe('HistoryCoinComponent', () => {
  let component: HistoryCoinComponent;
  let fixture: ComponentFixture<HistoryCoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryCoinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryCoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
