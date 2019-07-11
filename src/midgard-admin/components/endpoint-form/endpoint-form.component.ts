import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'endpoint-form',
  templateUrl: './endpoint-form.component.html',
  styleUrls: ['./endpoint-form.component.scss']
})
export class EndpointFormComponent implements OnInit {
  /**
   * Inputs for the crud module
   */
  @Input() crudInputs: any;
  /**
   * current endpoint swagger Definitions
   */
  @Input() definitions: any;

  constructor() { }

  ngOnInit() {
  }

}
