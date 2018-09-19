import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MidgardComponent } from './midgard.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('MidgardComponent', () => {
  let component: MidgardComponent;
  let fixture: ComponentFixture<MidgardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ MidgardComponent],
      schemas: [NO_ERRORS_SCHEMA]
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
