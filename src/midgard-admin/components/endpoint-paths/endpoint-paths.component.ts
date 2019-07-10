import { Component, Input } from '@angular/core';

@Component({
  selector: 'mg-endpoint-paths',
  templateUrl: './endpoint-paths.component.html',
  styleUrls: ['./endpoint-paths.component.scss']
})
export class EndpointPathsComponent  {
  /**
   * current endpoint swagger Definitions
   */
  @Input() definitions: any;
  /**
   * current endpoint swagger paths
   */
  @Input() paths: any;

  definitionsString: string;
  showDefinitions = false;

  constructor() { }
  /**
   * copies selected endpoint to clipboard
   * @param val - value to be copied
   */
  copyEndpoint(val: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

}
