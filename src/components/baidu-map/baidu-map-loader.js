"use strict";
exports.baiduMapLoader = function () {
    return new Promise(function (resolve, reject) {
        window['baiduMapLoaded'] = function () {
            resolve();
        };
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'http://api.map.baidu.com/api?v=2.0&ak=DmMSdcEILbFTUHs4QvlcV2G0&callback=baiduMapLoaded';
        script.onerror = function () {
            document.body.removeChild(script);
            reject();
        };
        document.body.appendChild(script);
    });
};
//# sourceMappingURL=baidu-map-loader.js.map