import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrudComponent } from '@src/midgard/modules/crud/crud.component';
import {MatIconModule } from '@angular/material';
import { MidgardGraphQLModule } from '@src/midgard/modules/graphql/graphql.module';
import {FjButtonModule, FjCardItemModule, FjSpinnerModule, FjTableModule, FjTextInputModule} from 'freyja-ui';
import { CrudDirective } from '@src/midgard/modules/crud/crud.directive';
import { MgCardItemModule } from '../../components/card-item/card-item.module';
import { MgTopViewSwitcherModule} from '../../components/top-view-switcher/top-view-switcher.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FilterByNamePipe } from '../../pipes/filter-by-name.pipe';

const components = [
  CrudComponent,
  CrudDirective,
  FilterByNamePipe
];

@NgModule({
  imports: [
    CommonModule,
    ScrollingModule,
    FjTableModule,
    MgCardItemModule,
    MidgardGraphQLModule,
    MatIconModule,
    FjSpinnerModule,
    FjCardItemModule,
    FjButtonModule,
    FjTextInputModule,
    MgTopViewSwitcherModule
  ],
  declarations: components,
  exports: components
})
export class MidgardCrudModule { }
