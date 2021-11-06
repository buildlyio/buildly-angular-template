import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import * as config from '../../config.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private titleService: Title) {
    this.titleService.setTitle((config as any).appTitle);
  }
}
