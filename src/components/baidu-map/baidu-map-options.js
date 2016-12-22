"use strict";
exports.baiduMapDefaultOpts = {
    navCtrl: true,
    scaleCtrl: true,
    overviewCtrl: true,
    enableScrollWheelZoom: false,
    zoom: 10,
    city: '武汉',
    mass: {
        enabled: false,
        options: {
            size: BMAP_POINT_SIZE_SMALL,
            shape: BMAP_POINT_SHAPE_CIRCLE,
            color: '#d340c3'
        }
    }
};
//# sourceMappingURL=baidu-map-options.js.map