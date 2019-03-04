import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mg-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  public searchInputStyles = { width: '300px', borderBottomRightRadius: '0', borderTopRightRadius: '0', marginTop: 0, borderRight: 0 };
  public searchButtonStyles = { borderBottomLeftRadius: '0', borderTopLeftRadius: '0', borderLeft: '0', padding: '11px' };

  constructor() { }

  ngOnInit() {
  }

}
