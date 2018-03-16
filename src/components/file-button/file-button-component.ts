import { Attribute, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, NgZone, Output, Renderer, ViewChild, ViewEncapsulation } from '@angular/core';
import { Button, Config } from 'ionic-angular';

@Component({
  selector: '[ion-file-button]',
  template: `
    <span class="button-inner">
      <ng-content></ng-content>
    </span>
    <div class="button-effect"></div>
    <input type="file"
          style="display: none"
       (change)="doChange($event)"
       [accept]="accept"
     [multiple]="allowMultiple" #inputFile/>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class FileButton extends Button {

  @ViewChild('inputFile')
  private nativeInputFile: ElementRef;

  @Output()
  fileChange = new EventEmitter<any>();

  @Input()
  accept: string;

  @Input()
  allowMultiple: boolean;

  constructor(
    @Attribute('ion-file-button') ionButton: string,
    config: Config,
    elementRef: ElementRef,
    renderer: Renderer,
    private ngZone: NgZone) {
    super(ionButton, config, elementRef, renderer);
  }

  ngOnInit() {
    this._renderer.listen(this.getElementRef().nativeElement, 'click', () => {
      const clickEvent: MouseEvent = new MouseEvent('click', { bubbles: false });
      this._renderer.invokeElementMethod(
        this.nativeInputFile.nativeElement, 'dispatchEvent', [clickEvent]);
    });
  }

  doChange(e: Event) {
    this.ngZone.run(() => {
      this.fileChange.emit(e);
    });
  }
}