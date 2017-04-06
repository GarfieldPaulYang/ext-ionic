"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var util_1 = require("../utils/util");
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
    return ComponentRegistar;
}());
ComponentRegistar = __decorate([
    core_1.Injectable()
], ComponentRegistar);
exports.ComponentRegistar = ComponentRegistar;
//# sourceMappingURL=component-registar.js.map