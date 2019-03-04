import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'mg-top-view-switcher',
  templateUrl: './top-view-switcher.component.html',
  styleUrls: ['./top-view-switcher.component.scss']
})
export class TopViewSwitcherComponent implements OnInit {

  public activeView: 'tile' | 'list' | 'table' | 'data-table';

  /**
   * page title
   */
  @Input() title;
  /**
   * text of the add button
   */
  @Input() addButtonText;
  /**
   * default selected view
   */
  @Input() defaultView: 'tile' | 'list' | 'table' | 'data-table';
  /**
   * available views by default all of them
   */
  @Input() availableViews = {tile: true, list: true, table: true};
  /**
   * event that is triggered when a view is selected
   */
  @Output() viewSelected: EventEmitter<any> = new EventEmitter();
  /**
   * event that is triggered when the add button is triggered
   */
  @Output() addButtonClicked: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.activeView = this.defaultView;
  }

  /**
   * emits an event to change the view
   * {'tile' | 'list' | 'table'} view - the selected view
   */
  selectView(view) {
    this.activeView = view;
    this.viewSelected.emit(view);
  }

  /**
   * emits an event that the add button is clicked
   * @param view - the current view
   */
  onButtonClicked(view) {
    this.addButtonClicked.emit(view);
  }

}
