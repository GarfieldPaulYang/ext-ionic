import { IonicModule } from 'ionic-angular';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { TabCmp } from './tab';
import { TabsCmp } from './tabs';

@NgModule({
  imports: [
    IonicModule
  ],
  exports: [
    TabCmp,
    TabsCmp
  ],
  declarations: [
    TabCmp,
    TabsCmp
  ]
})
export class TabsModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: TabsModule, providers: []
    };
  }
}