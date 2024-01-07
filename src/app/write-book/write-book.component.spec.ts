import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteBookComponent } from './write-book.component';

describe('WriteBookComponent', () => {
  let component: WriteBookComponent;
  let fixture: ComponentFixture<WriteBookComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WriteBookComponent]
    });
    fixture = TestBed.createComponent(WriteBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
