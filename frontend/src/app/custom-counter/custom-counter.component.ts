import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'custom-counter',
  template: `
    <i (click)="decrement()" class="fa fa-minus qntChangeButton"></i>
    <span>{{counter}}</span>
    <i (click)="increment()" class="fa fa-plus qntChangeButton"></i>
  `,
  styleUrls: ['./custom-counter.component.css']
})
export class CustomCounterComponent {

  counterValue = 0;
  @Output() counterChange = new EventEmitter();

  @Input()
  get counter() {
    return this.counterValue;
  }

  set counter(val) {
    this.counterValue = val;
    this.counterChange.emit(this.counterValue);
  }

  decrement(event) {
    if (this.counter > 0) {
      this.counter--;
    }

  }

  increment() {
    this.counter++;
  }

}
