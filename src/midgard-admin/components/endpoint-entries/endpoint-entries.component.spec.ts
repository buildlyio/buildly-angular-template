import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EndpointEntriesComponent } from './endpoint-entries.component';

describe('EndpointEntriesComponent', () => {
  let component: EndpointEntriesComponent;
  let fixture: ComponentFixture<EndpointEntriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndpointEntriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndpointEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
