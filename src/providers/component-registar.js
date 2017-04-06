"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const util_1 = require("../utils/util");
let ComponentRegistar = class ComponentRegistar {
    constructor() {
        this.components = {};
    }
    registerComponent(component) {
        if (!this.isPresent(component)) {
            return;
        }
        this.components[component.name] = component;
    }
    unregisterComponent(component) {
        if (!this.isPresent(component)) {
            return;
        }
        delete this.components[component.name];
    }
    registerComponents(components) {
        if (!util_1.isPresent(components)) {
            return;
        }
        components.forEach(component => this.registerComponent(component));
    }
    unregisterComponents(components) {
        if (!util_1.isPresent(components)) {
            return;
        }
        components.forEach(component => this.unregisterComponent(component));
    }
    getComponent(componentname) {
        return this.components[componentname];
    }
    isPresent(component) {
        return util_1.isPresent(component) && util_1.isPresent(component.name);
    }
};
ComponentRegistar = __decorate([
    core_1.Injectable()
], ComponentRegistar);
exports.ComponentRegistar = ComponentRegistar;
//# sourceMappingURL=component-registar.js.map