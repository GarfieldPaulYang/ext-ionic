import { Component, Input } from '@angular/core';

@Component({
  selector: 'ion-progress-bar',
  template: `
    <div class="ion-progress-outer">
      <div class="ion-progress-inner" [style.width]="progress + '%'" [style.background-color]="innerColor">
        {{progress}}%
      </div>
    </div>
  `,
  styles: [`
    .ion-progress-outer {
      width: 96%;
      margin: 10px 2%;
      padding: 3px;
      text-align: center;
      background-color: #f4f4f4;
      border: 1px solid #dcdcdc;
      color: #fff;
      border-radius: 20px;
    }
    .ion-progress-inner {
      min-width: 15%;
      white-space: nowrap;
      overflow: hidden;
      padding: 5px;
      border-radius: 20px;
    }
  `]
})
export class ProgressBarCmp {
  @Input() progress: number;
  @Input() innerColor: string = '#387ef5';
  constructor() { }
}