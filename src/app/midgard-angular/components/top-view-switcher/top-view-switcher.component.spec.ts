import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopViewSwitcherComponent } from './top-view-switcher.component';

describe('TopViewSwitcherComponent', () => {
  let component: TopViewSwitcherComponent;
  let fixture: ComponentFixture<TopViewSwitcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopViewSwitcherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopViewSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
