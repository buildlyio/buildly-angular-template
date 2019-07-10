import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EndpointPathsComponent } from './endpoint-paths.component';

describe('EndpointPathsComponent', () => {
  let component: EndpointPathsComponent;
  let fixture: ComponentFixture<EndpointPathsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndpointPathsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndpointPathsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
