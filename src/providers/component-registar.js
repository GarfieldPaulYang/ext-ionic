import { Injectable } from '@angular/core';
import { isPresent } from '../utils/util';
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
        if (!isPresent(components)) {
            return;
        }
        components.forEach(function (component) { return _this.registerComponent(component); });
    };
    ComponentRegistar.prototype.unregisterComponents = function (components) {
        var _this = this;
        if (!isPresent(components)) {
            return;
        }
        components.forEach(function (component) { return _this.unregisterComponent(component); });
    };
    ComponentRegistar.prototype.getComponent = function (componentname) {
        return this.components[componentname];
    };
    ComponentRegistar.prototype.isPresent = function (component) {
        return isPresent(component) && isPresent(component.name);
    };
    return ComponentRegistar;
}());
export { ComponentRegistar };
ComponentRegistar.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ComponentRegistar.ctorParameters = function () { return []; };
//# sourceMappingURL=component-registar.js.map