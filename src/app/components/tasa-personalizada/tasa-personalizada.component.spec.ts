import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasaPersonalizadaComponent } from './tasa-personalizada.component';

describe('TasaPersonalizadaComponent', () => {
  let component: TasaPersonalizadaComponent;
  let fixture: ComponentFixture<TasaPersonalizadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasaPersonalizadaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasaPersonalizadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
