import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'mg-endpoint-detail',
  templateUrl: './endpoint-detail.component.html',
  styleUrls: ['./endpoint-detail.component.scss']
})
export class EndpointDetailComponent implements OnInit {

  @Input() endpoint: string;

  constructor() { }

  ngOnInit() {
  }

}
