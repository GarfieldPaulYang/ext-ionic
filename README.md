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
```
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
# use
## 打开外部链接
```
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
