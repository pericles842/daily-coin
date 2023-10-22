import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigBancosComponent } from './config-bancos.component';

describe('ConfigBancosComponent', () => {
  let component: ConfigBancosComponent;
  let fixture: ComponentFixture<ConfigBancosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigBancosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigBancosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
