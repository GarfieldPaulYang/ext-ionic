"use strict";
var core_1 = require('@angular/core');
var util_1 = require('../utils/util');
var ComponentRegistar = (function () {
    function ComponentRegistar() {
        this.components = {};
    }
    ComponentRegistar.prototype.registerComponent = function (component) {
        if (!this.isPresent(component)) {
            return;
        }
        this.components[component.name] = component;
    };
    ComponentRegistar.prototype.unregisterComponent = function (component) {
        if (!this.isPresent(component)) {
            return;
        }
        delete this.components[component.name];
    };
    ComponentRegistar.prototype.registerComponents = function (components) {
        var _this = this;
        if (!util_1.isPresent(components)) {
            return;
        }
        components.forEach(function (component) { return _this.registerComponent(component); });
    };
    ComponentRegistar.prototype.unregisterComponents = function (components) {
        var _this = this;
        if (!util_1.isPresent(components)) {
            return;
        }
        components.forEach(function (component) { return _this.unregisterComponent(component); });
    };
    ComponentRegistar.prototype.getComponent = function (componentname) {
        return this.components[componentname];
    };
    ComponentRegistar.prototype.isPresent = function (component) {
        return util_1.isPresent(component) && util_1.isPresent(component.name);
    };
    ComponentRegistar.decorators = [
        { type: core_1.Injectable },
    ];
    ComponentRegistar.ctorParameters = [];
    return ComponentRegistar;
}());
exports.ComponentRegistar = ComponentRegistar;
//# sourceMappingURL=component-registar.js.map