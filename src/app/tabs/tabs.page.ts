import { Component } from '@angular/core';
import { specs } from '../collective/specs';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  readonly SPECS = specs;

  constructor() {}

}
