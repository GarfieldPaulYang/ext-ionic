"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const _ = require("lodash");
let OrderBy = class OrderBy {
    transform(input, orderConfigs = '+') {
        if (!Array.isArray(input)) {
            return input;
        }
        if (this.isSingle(orderConfigs)) {
            let orderConfig = !Array.isArray(orderConfigs) ? orderConfigs : orderConfigs[0];
            let config = this.parseProperty(orderConfig);
            // Basic array
            if (config.property === '') {
                return _.orderBy(input, [], config.order);
            }
            return _.orderBy(input, [config.property], [config.order]);
        }
        let configs = this.parseProperties(orderConfigs);
        return _.orderBy(input, configs.properties, configs.orders);
    }
    isSingle(orderConfigs) {
        return !Array.isArray(orderConfigs) || (Array.isArray(orderConfigs) && orderConfigs.length === 1);
    }
    parseProperty(config) {
        let orderChar = config.substr(0, 1);
        let isDesc = orderChar === '-';
        let hasOrder = orderChar || orderChar === '+';
        return { order: isDesc ? 'desc' : 'asc', property: hasOrder ? config.substr(1) : config };
    }
    parseProperties(configs) {
        let result = { orders: [], properties: [] };
        configs.forEach(configStr => {
            let config = this.parseProperty(configStr);
            result.orders.push(config.order);
            result.properties.push(config.property);
        });
        return result;
    }
};
OrderBy = __decorate([
    core_1.Pipe({
        name: 'orderBy'
    }),
    core_1.Injectable()
], OrderBy);
exports.OrderBy = OrderBy;
//# sourceMappingURL=order-by.js.map