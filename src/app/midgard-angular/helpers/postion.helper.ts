import { Injectable } from '@angular/core';

@Injectable()
export class PositionHelper {

  public elemPosition(el) {
    let x = 0;
    let y = 0;
    while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
      x += el.offsetLeft;
      y += el.offsetTop;
      el = el.offsetParent;
    }
    return {top: y, left: x};
  }
}
