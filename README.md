# whcyit-ionic
ionic2 扩展库
- 打开外部链接

# demo
https://github.com/squallliu/whcyit-demo

# install
```
npm install git+https://github.com/squallliu/whcyit-ionic.git --save
```
修改 app.module.ts

```ts
import { WhcyitModule } from 'whcyit-ionic';
......
@NgModule({
  ......
  imports: [
    IonicModule.forRoot(MyApp),
    WhcyitModule
  ]
  ......
})
```

# Components

## 打开外部链接
```ts
import { Component } from '@angular/core';
import { OpenUrlModalController } from 'whcyit-ionic';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(private openUrlCtrl: OpenUrlModalController) {
  }

  openExternalUrl() {
    this.openUrlCtrl.open({
      title: '百度',
      url: 'http://www.baidu.com',
      color: 'primary' // 默认主题为light
    });
  }
}
```
## AlphaScroll
alpha-scroll.html

```html
<ion-header>
  <ion-navbar>
    <ion-title>alpha-scroll</ion-title>
  </ion-navbar>
</ion-header>

<ion-content>
  <ion-alpha-scroll *ngIf="breeds" [listData]="breeds" key="name" [itemTemplate]="alphaScrollItemTemplate" [currentPageClass]="currentPageClass"
    [triggerChange]="triggerAlphaScrollChange">
  </ion-alpha-scroll>
</ion-content>
```
alpha-scroll.ts

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'page-alpha-scroll',
  templateUrl: 'alpha-scroll.html'
})
export class AlphaScrollPage {
  breeds: any[] = [];
  currentPageClass = this;
  alphaScrollItemTemplate: string = `
    <ion-item (click)="currentPageClass.onItemClick(item)">
      <h2>{{item.name}}</h2>
      <p>{{item.description}}</p>
    </ion-item>
  `;
  triggerAlphaScrollChange: number = 0;

  constructor() {
    this.assignBreeds();
  }

  onItemClick(item) {
    this.triggerAlphaScrollChange++;
  }

  assignBreeds() {
    var str = "ZABCJKLDEFGOPQRHIMNSWXY";
    for (var i = 0; i < str.length; i++) {
      var nextChar = str.charAt(i);
      for (var j = 0; j < 5; j++) {
        var name = nextChar + 'name' + j;
        this.breeds.push({
          name: name,
          description: 'My name is ' + name
        });
      }
    }
  }
}
```

# Pipes
- mapToIterable 把 Map、Object 转成数组
- orderBy 排序"items | orderBy:'-'"，对象数组"items | orderBy: ['-prop1', 'prop2']"，'-'号为DESC，默认为ASC