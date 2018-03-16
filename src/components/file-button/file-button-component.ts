import { Attribute, ChangeDetectionStrategy, Component, ElementRef, Input, Renderer, ViewChild, ViewEncapsulation } from '@angular/core';
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
       [accept]="_accept"
     [multiple]="_allowMultiple" #inputFile/>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class FileButton extends Button {

  @ViewChild('inputFile')
  private nativeInputFile: ElementRef;

  private _fileChange: Function;

  @Input()
  set fileChange(fn: Function) {
    this._fileChange = fn;
  }

  _capture: string;

  @Input()
  set capture(v: string) {
    this._capture = v;
  }

  _accept: string;

  @Input()
  set accept(v: string) {
    this._accept = v;
  }

  _allowMultiple: boolean;

  @Input()
  set allowMultiple(v: boolean) {
    this._allowMultiple = v;
  }

  constructor(
    @Attribute('ion-file-button') ionButton: string,
    config: Config,
    elementRef: ElementRef,
    renderer: Renderer) {
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
    const input: any = e.target;
    const files: FileList = input.files;
    if (files.length > 0) {
      this._fileChange(files);
    }
  }
}