import { Pipe, PipeTransform } from '@angular/core';

interface Column {
  name: string;
  prop: string;
}
@Pipe({
  name: 'filterByColumnProperties'
})
export class FilterByColumnPropertiesPipe implements PipeTransform {
  transform(items: any[], searchText: string, columns: Column[]): any[] {
    if (!items) { return []; }
    if (!searchText) { return items; }
    if (!columns) { return items; }
    searchText = searchText.toLowerCase();
    let foundItems = [];
    items.forEach( item => {
      columns.forEach(column => {
        if (item[column.prop].toString().toLowerCase().includes(searchText)) {
          if (!foundItems.includes(item)) {
            foundItems = [...foundItems, item];
          }
        }
      });
    });
    return foundItems;
  }
}
