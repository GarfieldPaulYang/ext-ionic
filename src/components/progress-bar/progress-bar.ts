import { Component, Input } from '@angular/core';

@Component({
  selector: 'progress-bar',
  template: `
    <div class="progress-outer">
      <div class="progress-inner" [style.width]="progress + '%'">
        {{progress}}%
      </div>
    </div>
  `
})
export class ProgressBarCmp {
  @Input('progress') progress: number;
  constructor() { }
}