import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MidgardComponent } from './midgard.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MidgardStoreModule } from './modules/store/store.module';
import { StoreMock } from './modules/store/store-mock';
import { Store } from './modules/store/store';

describe('MidgardComponent', () => {
  let component: MidgardComponent;
  let fixture: ComponentFixture<MidgardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MidgardStoreModule.forRoot(), TranslateModule.forRoot()],
      declarations: [ MidgardComponent],
      providers: [
        {provide: Store, useClass: StoreMock}
      ],
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
