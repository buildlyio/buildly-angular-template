import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EndpointFormComponent } from './endpoint-form.component';

describe('EndpointFormComponent', () => {
  let component: EndpointFormComponent;
  let fixture: ComponentFixture<EndpointFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndpointFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndpointFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
