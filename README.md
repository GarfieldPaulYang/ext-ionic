# whcyit-ionic
ionic2 扩展库

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

# 组件

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
## AlphaScroll 通讯录样式的列表(首字母索引)
alpha-scroll.html

```html
<ion-header>
  <ion-navbar>
    <ion-title>alpha-scroll</ion-title>
  </ion-navbar>
</ion-header>
<ion-content>
  <ion-alpha-scroll *ngIf="breeds" [listData]="breeds" key="name" [itemTemplate]="alphaScrollItemTemplate" [currentPageClass]="currentPageClass">
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

## 百度地图

### 例子
baidu-map.html

```html
<ion-header>
  <ion-navbar>
    <ion-title>BaiduMap</ion-title>
  </ion-navbar>
</ion-header>
<ion-content>
  <ion-baidu-map [options]="mapOptions"></ion-baidu-map>
</ion-content>
```
baidu-map.ts

```ts
import { Component } from '@angular/core';

import { BaiduMapOptions, GpsPoint } from 'whcyit-ionic';

@Component({
  selector: 'page-baidu-map',
  templateUrl: 'baidu-map.html'
})
export class BaiduMapPage {
  mapOptions: BaiduMapOptions;

  constructor() {
    let point: GpsPoint = {
      lng: 121.506191,
      lat: 31.245554
    };
    this.mapOptions = {
      center: point,
      zoom: 17,
      city: 'ShangHai',
      markers: [{
        point: point,
        icon: './assets/images/baidu-map/mappoint.png',
        size: {
          width: 49,
          height: 60
        },
        infoWindow: {
          title: 'Where',
          content: '<a href="http://www.baidu.com" target="_blank">Put description here</a>'
        }
      }]
    };
  }
}
```
baidu-map.scss

```css
ion-baidu-map {
  width: 100%;
  height: 100%;
  display: block;
}
```
### 说明
GpsPoint

| 属性 | 类型 | 说明 | 默认值
|-----|------|-----|-------
| lng | number | 经度
| lat | number | 纬度

MarkerSize

| 属性 | 类型 | 说明 | 默认值
|-----|------|-----|-------
| width | number | 宽度
| height | number | 高度

BaiduMapOptions

| 属性 | 类型 | 说明 | 默认值
|-----|------|-----|-------
| center | GpsPoint | 初始化中心点
| navCtrl | boolean | 导航控件 | true
| scaleCtrl | boolean | 缩放控件 | true
| overviewCtrl | boolean | 缩略地图控件 | true
| enableScrollWheelZoom | boolean | 鼠标滚轮缩放 | false
| zoom | number | 初始化缩放级别 | 10
| city | string | 初始化城市 | 'wuhan'
| markers | MarkerOptions | marker数组
| mass | MassOptions | 海量数据选项

MarkerOptions

| 属性 | 类型 | 说明 | 默认值
|-----|------|-----|-------
| point | GpsPoint | marker坐标值
| icon | string | marker图标
| size | MarkerSize | marker大小
| infoWindow | MarkerInfoWindow | marker气泡弹窗

MarkerInfoWindow

| 属性 | 类型 | 说明 | 默认值
|-----|------|-----|-------
| title | string | 标题
| content | string | 内容(支持html)

MassOptions

| 属性 | 类型 | 说明 | 默认值
|-----|------|-----|-------
| enabled | boolean | 是否启用海量数据渲染 | false
| options | PointCollectionOptions | 海量数据渲染选项 | {size: BMAP_POINT_SIZE_SMALL, shape: BMAP_POINT_SHAPE_CIRCLE, color: '#d340c3'}

BaiduMapController
- translateGps(gpsData: Array<GpsPoint> = []): Promise\<any\> gps信号转换为百度坐标
- geoLocation(): Promise\<any\> 获取当前位置
- clearOverlays 清除地图上所有覆盖物
- panTo(point: BMap.Point) 导航到中心点
- geoLocationAndCenter(): Promise\<any\> 以当前位置为中心导航地图

# 管道(全部管道可注入使用)
- mapToIterable 把 Map、Object 转成数组
- orderBy 排序"items | orderBy:'-'"，对象数组"items | orderBy: ['-prop1', 'prop2']"，'-'号为DESC，默认为ASC
