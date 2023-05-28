import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameRegistrationComponent } from './game-registration.component';

describe('GameRegistrationComponent', () => {
  let component: GameRegistrationComponent;
  let fixture: ComponentFixture<GameRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameRegistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
