import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.scss'],
})
export class TitleBarComponent implements OnInit {

  @Input() title: string;
  @Input() subtitle: string;
  @Input() noRefresh: string;
  @Output() refresh = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  hitRefresh() {
    this.refresh.emit(true);
  }

}
