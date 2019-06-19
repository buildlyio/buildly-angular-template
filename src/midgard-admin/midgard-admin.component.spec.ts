import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MidgardAdminComponent } from './midgard-admin.component';

describe('MidgardAdminComponent', () => {
  let component: MidgardAdminComponent;
  let fixture: ComponentFixture<MidgardAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MidgardAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MidgardAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
