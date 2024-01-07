import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortFolioUserComponent } from './port-folio-user.component';

describe('PortFolioUserComponent', () => {
  let component: PortFolioUserComponent;
  let fixture: ComponentFixture<PortFolioUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PortFolioUserComponent]
    });
    fixture = TestBed.createComponent(PortFolioUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
