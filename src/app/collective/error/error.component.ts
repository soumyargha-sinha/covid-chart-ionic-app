import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent implements OnInit {

  @Output() retryEvent = new EventEmitter<String>();

  constructor() { }

  ngOnInit() {}

  retryClick() {
    this.retryEvent.emit('retry');
  }

}
