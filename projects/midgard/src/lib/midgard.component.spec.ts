import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MidgardComponent } from './midgard.component';

describe('MidgardComponent', () => {
  let component: MidgardComponent;
  let fixture: ComponentFixture<MidgardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MidgardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MidgardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
