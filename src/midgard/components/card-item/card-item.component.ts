import {
  Component, EventEmitter, Input, OnInit, Output, ViewChild,
} from '@angular/core';
import { CardItemOptions } from './card-item-options';

@Component({
  selector: 'mg-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss'],
})
export class CardItemComponent implements OnInit {
  /**
   * current item data
   */
  @Input() item: any;

  /**
   * current item options
   */
  @Input() options?: CardItemOptions;

  /**
   * card layout (tile or list)
   */
  @Input() layout?: 'tile' | 'list';

  /**
   * if the card is highlight card
   */
  @Input() isHighlight = false;

  /**
   * event triggered when an action is clicked
   */
  @Output() actionClicked: EventEmitter<any> = new EventEmitter();

  /**
   * event triggered when an element is edited
   */
  @Output() elementEdited: EventEmitter<any> = new EventEmitter();

  /**
   * checks wether the card item is expanded
   * {boolean}
   */
  public isExpanded = false;

  /**
   * checks if a click event is a single ou double click
   * {boolean}
   */
  public isSingleClick = false;

  /**
   * checks wether the card item elements are in edit mode
   * {boolean}
   */
  public isEdit = {
    title: false,
    subText: false,
    subText2: false,
    caption: false,
    link: false,
    date1: false,
    date2: false,
    dateHeader1: false,
    dateHeader2: false,
    details: false,
    description: false,
    tags: false,
  };

  public showBelowMenu = false;

  public inputFieldStyles = { marginTop: 0, width: '100%' };

  public lightBoxImages;

  ngOnInit() {
    // init dynamic details field isEdit value to false
    if (this.options && this.options.details) {
      this.options.details.forEach((detailItem, index: number) => {
        this.isEdit[`detailItem${index}`] = false;
      });
    }
  }

  /**
   * fired when an action has been clicked
   * @param evt - click event
   * @param actionType - type of the action that has been fired
   */
  public onActionClicked(evt, actionType?: string) {
    if (evt.stopPropagation) {
      evt.stopPropagation();
    } else {
      actionType = evt;
    }
    this.actionClicked.emit(actionType);
  }

  /**
   * activates edit mode for one field
   * @param evt - click event
   * @param field - field to be edited
   */
  public activateEditMode(evt, field) {
    this.isSingleClick = false;
    this.isEdit[field] = true;
  }

  /**
   * deactivates edit mode for all fields
   */
  public deactivateEditMode() {
    Object.keys(this.isEdit).forEach((field) => {
      this.isEdit[field] = false;
    });
  }

  /**
   * toggles expanded view on single click
   */
  public toggleExpanded() {
    // deactivate any active edit mode
    this.isSingleClick = true;
    setTimeout(() => {
      if (this.isSingleClick) {
        this.deactivateEditMode();
        this.isExpanded = !this.isExpanded;
      }
    }, 250);
  }

  /**
   * a function that will be triggered when an editable input is focused and it will deactivate the edit mode for other inputs
   * @param {string} element - element  is edited
   */
  public onInputFocused(element: string) {
    Object.keys(this.isEdit).forEach((key) => {
      if (key !== element && this.isEdit[key]) {
        this.isEdit[key] = false;
      }
    });
  }

  /**
   * a function that is triggered when the card item picture is clicked and it sets the image in the lightbox component
   */
  public onPictureClicked(e: any) {
    e.stopPropagation();
    if (this.item[this.options.picture.image] && this.item[this.options.title.prop]) {
      this.lightBoxImages = [
        {
          src: this.item[this.options.picture.image],
          alt: this.item[this.options.title.prop],
        },
      ];
    }
  }

  /**
   * a function that will be triggered when an item has been edited
   * @param {editObj} the edited object that contains:
   * value - value of the edited element
   * element - elementName that is edited
   * index - index of the element in case of dynamic fields like details blocks
   */
  public onEditElement(editObj: { value: string, elementName: string, index?: number }) {
    this.isEdit[editObj.elementName] = false;
    this.elementEdited.emit(editObj);
  }
}
