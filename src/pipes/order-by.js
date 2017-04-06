"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var _ = require("lodash");
var OrderBy = (function () {
    function OrderBy() {
    }
    OrderBy.prototype.transform = function (input, orderConfigs) {
        if (orderConfigs === void 0) { orderConfigs = '+'; }
        if (!Array.isArray(input)) {
            return input;
        }
        if (this.isSingle(orderConfigs)) {
            var orderConfig = !Array.isArray(orderConfigs) ? orderConfigs : orderConfigs[0];
            var config = this.parseProperty(orderConfig);
            if (config.property === '') {
                return _.orderBy(input, [], config.order);
            }
            return _.orderBy(input, [config.property], [config.order]);
        }
        var configs = this.parseProperties(orderConfigs);
        return _.orderBy(input, configs.properties, configs.orders);
    };
    OrderBy.prototype.isSingle = function (orderConfigs) {
        return !Array.isArray(orderConfigs) || (Array.isArray(orderConfigs) && orderConfigs.length === 1);
    };
    OrderBy.prototype.parseProperty = function (config) {
        var orderChar = config.substr(0, 1);
        var isDesc = orderChar === '-';
        var hasOrder = orderChar || orderChar === '+';
        return { order: isDesc ? 'desc' : 'asc', property: hasOrder ? config.substr(1) : config };
    };
    OrderBy.prototype.parseProperties = function (configs) {
        var _this = this;
        var result = { orders: [], properties: [] };
        configs.forEach(function (configStr) {
            var config = _this.parseProperty(configStr);
            result.orders.push(config.order);
            result.properties.push(config.property);
        });
        return result;
    };
    return OrderBy;
}());
OrderBy = __decorate([
    core_1.Pipe({
        name: 'orderBy'
    }),
    core_1.Injectable()
], OrderBy);
exports.OrderBy = OrderBy;
//# sourceMappingURL=order-by.js.map