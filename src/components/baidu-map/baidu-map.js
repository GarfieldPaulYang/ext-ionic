"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// 封装参考官方API，http://developer.baidu.com/map/reference/index.php
const core_1 = require("@angular/core");
const baidu_map_loader_1 = require("./baidu-map-loader");
var BMAP_STATUS_SUCCESS;
var BMAP_POINT_SIZE_SMALL;
var BMAP_POINT_SHAPE_CIRCLE;
let BaiduMapController = class BaiduMapController {
    init(opts, ele) {
        return new Promise((resolve, reject) => {
            baidu_map_loader_1.baiduMapLoader().then(() => {
                this.initDeclarations();
                if (!ele || !opts) {
                    resolve();
                    return;
                }
                this.map = new exports.BMap.Map(ele);
                setTimeout(() => {
                    this.map.centerAndZoom(new exports.BMap.Point(opts.center.lng, opts.center.lat), opts.zoom);
                    if (opts.navCtrl) {
                        this.map.addControl(new exports.BMap.NavigationControl());
                    }
                    if (opts.scaleCtrl) {
                        this.map.addControl(new exports.BMap.ScaleControl());
                    }
                    if (opts.overviewCtrl) {
                        this.map.addControl(new exports.BMap.OverviewMapControl());
                    }
                    if (opts.enableScrollWheelZoom) {
                        this.map.enableScrollWheelZoom();
                    }
                    this.map.setCurrentCity(opts.city);
                    resolve();
                });
            }, reject);
        });
    }
    translateGps(gpsData = []) {
        return new Promise(resolve => {
            let points = [];
            gpsData.forEach((value, index) => {
                points.push(new exports.BMap.Point(value.lng, value.lat));
            });
            let convertor = new exports.BMap.Convertor();
            convertor.translate(points, 1, 5, resolve);
        });
    }
    geoLocation() {
        return new Promise((resolve, reject) => {
            let location = new exports.BMap.Geolocation();
            location.getCurrentPosition((result) => {
                if (location.getStatus() === BMAP_STATUS_SUCCESS) {
                    resolve(result);
                }
                else {
                    reject('不能获取位置');
                }
            }, () => {
                reject('定位失败');
            });
        });
    }
    clearOverlays() {
        this.map.clearOverlays();
    }
    panTo(point) {
        this.map.panTo(point);
    }
    geoLocationAndCenter() {
        return new Promise((resolve, reject) => {
            this.geoLocation().then(result => {
                this.panTo(result.point);
                resolve(result);
            }, () => reject('定位失败'));
        });
    }
    addEventListener(event, handler) {
        this.map.addEventListener(event, (e) => {
            handler.emit(e);
        });
    }
    addMarker(markerOpts, clickHandler) {
        let marker = this.createMarker(markerOpts);
        let infoWindow = this.createInfoWindow(markerOpts);
        if (infoWindow) {
            marker.addEventListener('click', (e) => {
                marker.openInfoWindow(infoWindow);
            });
        }
        else {
            marker.addEventListener('click', (e) => {
                clickHandler.emit(e);
            });
        }
        this.map.addOverlay(marker);
    }
    drawMarkers(markers, clickHandler) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // 判断是否含有定位点
                if (!markers || markers.length === 0) {
                    reject('没有传入兴趣点');
                    return;
                }
                this.clearOverlays();
                markers.forEach(marker => {
                    this.addMarker(marker, clickHandler);
                });
                resolve();
            });
        });
    }
    drawMassPoints(markers, opts, clickHandler) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!markers || markers.length === 0) {
                    reject('没有传入兴趣点');
                    return;
                }
                this.clearOverlays();
                var points = [];
                markers.forEach(marker => {
                    points.push(new exports.BMap.Point(marker.point.lng, marker.point.lat));
                });
                var pointCollection = new exports.BMap.PointCollection(points, Object.assign({ size: BMAP_POINT_SIZE_SMALL, shape: BMAP_POINT_SHAPE_CIRCLE, color: '#d340c3' }, opts));
                pointCollection.addEventListener('click', (e) => {
                    clickHandler.emit(e);
                });
                this.map.addOverlay(pointCollection);
                resolve();
            });
        });
    }
    initDeclarations() {
        exports.BMap = window['BMap'];
        BMAP_STATUS_SUCCESS = window['BMAP_STATUS_SUCCESS'];
        BMAP_POINT_SIZE_SMALL = window['BMAP_POINT_SIZE_SMALL'];
        BMAP_POINT_SHAPE_CIRCLE = window['BMAP_POINT_SHAPE_CIRCLE'];
    }
    createIcon(marker) {
        if (marker.icon) {
            if (marker.size) {
                return new exports.BMap.Icon(marker.icon, new exports.BMap.Size(marker.size.width, marker.size.height));
            }
            return new exports.BMap.Icon(marker.icon);
        }
        return null;
    }
    createInfoWindow(marker) {
        if (marker.infoWindow) {
            var msg = '<p>' + marker.infoWindow.title + '</p><p>' + marker.infoWindow.content + '</p>';
            return new exports.BMap.InfoWindow(msg, {
                enableMessage: !!marker.infoWindow.enableMessage,
                enableCloseOnClick: true
            });
        }
        return null;
    }
    createMarker(marker) {
        var icon = this.createIcon(marker);
        var pt = new exports.BMap.Point(marker.point.lng, marker.point.lat);
        if (icon) {
            return new exports.BMap.Marker(pt, { icon: icon });
        }
        return new exports.BMap.Marker(pt);
    }
};
BaiduMapController = __decorate([
    core_1.Injectable()
], BaiduMapController);
exports.BaiduMapController = BaiduMapController;
//# sourceMappingURL=baidu-map.js.map