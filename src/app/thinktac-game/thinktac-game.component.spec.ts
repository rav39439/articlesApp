import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThinktacGameComponent } from './thinktac-game.component';

describe('ThinktacGameComponent', () => {
  let component: ThinktacGameComponent;
  let fixture: ComponentFixture<ThinktacGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThinktacGameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThinktacGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
