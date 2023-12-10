import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigThemeComponent } from './config-theme.component';

describe('ConfigThemeComponent', () => {
  let component: ConfigThemeComponent;
  let fixture: ComponentFixture<ConfigThemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigThemeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
