import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrudComponent } from '@src/midgard/modules/crud/crud.component';
import { MatIconModule } from '@angular/material/icon';
import { MidgardGraphQLModule } from '@midgard/modules/graphql/graphql.module';
import { CrudDirective } from '@midgard/modules/crud/crud.directive';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MgCardItemModule } from '../../components/card-item/card-item.module';
import { MgTopViewSwitcherModule } from '../../components/top-view-switcher/top-view-switcher.module';
import { FilterByNamePipe } from '../../pipes/filter-by-name.pipe';

const components = [
  CrudComponent,
  CrudDirective,
  FilterByNamePipe,
];

@NgModule({
  imports: [
    CommonModule,
    ScrollingModule,
    FjTableModule,
    MgCardItemModule,
    MidgardGraphQLModule,
    MatIconModule,
    MgTopViewSwitcherModule,
  ],
  declarations: components,
  exports: components,
})
export class MidgardCrudModule { }
