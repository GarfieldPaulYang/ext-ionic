import { Component, Input, EventEmitter, Output, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

export interface GalleryOptions {
  colWidth: number;
  urlKey?: string;
  thumbKey?: string;
  thumbnailTitleKey?: string;
}

@Component({
  selector: 'ion-gallery',
  template: `
		<div class="row">
		  <div *ngFor="let item of items" tappable (click)="itemTapped(item)" [ngStyle]="colStyle" class="col">
		    <div class="thumbnal">
					<ion-image-loader src="{{item[options.thumbKey]}}"></ion-image-loader>
		      <div *ngIf="options.thumbnailTitleKey" class="thumbnailTitle">{{item[options.thumbnailTitleKey]}} </div>
		    </div>
		  </div>
		</div>
	`,
  styles: [`
		.thumbnailTitle {
		  display: block;
		}
		.row {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      padding: 5px;
      width: 100%;
      flex-flow: row wrap;
      color: red;
		}
		.row .col {
      display: block;
      text-align: center;
      -webkit-box-flex: 1;
      -webkit-flex: 1;
      -ms-flex: 1;
      flex: 1 1 30%;
      padding: 5px;
		}
`],
})
export class Gallery implements OnInit, OnDestroy {
  @Input() items: any;
  @Input() options: GalleryOptions;
  @Output() itemClick: EventEmitter<any> = new EventEmitter();
  colStyle: any;

  private watches: Subscription[] = [];

  constructor(private nav: NavController, private elementRef: ElementRef) {
    let obsToMerge: Observable<any>[] = [
      Observable.fromEvent(window, 'orientationchange'),
      Observable.fromEvent(window, 'resize')
    ];
    this.watches.push(Observable.merge.apply(
      this,
      obsToMerge
    ).debounceTime(10).subscribe(() => {
      this.calculateCol();
    }));
  }

  ngOnInit() {
    this.options.colWidth = Math.abs(this.options.colWidth) || 200;
    this.options.urlKey = this.options.urlKey || 'url';
    this.options.thumbKey = this.options.thumbKey || this.options.urlKey;
    this.colStyle = {};
  }

  ngOnDestroy(): void {
    this.watches.forEach((watch) => {
      watch.unsubscribe && watch.unsubscribe();
    });
  }

  calculateCol() {
    let row = this.elementRef.nativeElement.firstElementChild;
    let width = row.clientWidth;
    let colWidth = this.options.colWidth;
    let col = Math.trunc(width / colWidth);
    if (col <= 1) col = 1;
    let percent = 100 / col + '%';
    this.colStyle.flexBasis = percent;
    this.colStyle.maxWidth = percent;
  }

  itemTapped(item: any) {
    this.itemClick.emit(item);
  }
}
