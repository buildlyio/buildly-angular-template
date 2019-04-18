import { Component, OnInit } from '@angular/core';
import { Store } from '../../../modules/store/store';
import { setTopBarSearchValue } from '../../../state/top-bar/top-bar.actions';

@Component({
  selector: 'mg-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  public searchInputStyles = { width: '300px', borderBottomRightRadius: '0', borderTopRightRadius: '0', marginTop: 0, borderRight: 0 };
  public searchButtonStyles = { borderBottomLeftRadius: '0', borderTopLeftRadius: '0', borderLeft: '0', padding: '11px' };

  constructor(
    private store: Store<any>
  ) { }

  ngOnInit() {}

  /**
   * dispatches an action to change the search value in the store
   * @param searchText - the text to search with
   */
  submitSearch(searchText) {
    this.store.dispatch(setTopBarSearchValue(searchText));
  }
}
