import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusCoinComponent } from './status-coin.component';

describe('StatusCoinComponent', () => {
  let component: StatusCoinComponent;
  let fixture: ComponentFixture<StatusCoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusCoinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusCoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
