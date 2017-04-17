import { IonicModule } from 'ionic-angular';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { SlideTab } from './tab';
import { SlideTabs } from './tabs';
import { SlideTabsController } from './tabs-controller';
import { SlideTabsToolbar } from './tabs-toolbar';

@NgModule({
  imports: [
    IonicModule
  ],
  exports: [
    SlideTab,
    SlideTabs
  ],
  declarations: [
    SlideTab,
    SlideTabs,
    SlideTabsToolbar
  ]
})
export class SlideTabsModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: SlideTabsModule, providers: [SlideTabsController]
    };
  }
}