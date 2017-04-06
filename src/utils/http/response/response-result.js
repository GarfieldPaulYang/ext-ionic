"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
class ResponseResult {
    constructor(httpResponse) {
        this.status = httpResponse.status;
        this.msg = httpResponse.msg;
        this.data = httpResponse.data;
        if (this.isPagination(this.data)) {
            this.data = new Pagination(this.data);
        }
    }
    isPagination(obj) {
        return obj && _.has(obj, 'currentPageNo') && _.has(obj, 'pageSize');
    }
}
exports.ResponseResult = ResponseResult;
class Pagination {
    constructor(data) {
        this.items = [];
        this.assign(data);
    }
    assign(data) {
        this.currentPageNo = data.currentPageNo;
        this.pageSize = data.pageSize;
        this.totalCount = data.totalCount;
        this.pageCount = data.pageCount;
        this.hasNextPage = data.hasNextPage;
        this.items = this.items.concat(data.items);
    }
}
exports.Pagination = Pagination;
//# sourceMappingURL=response-result.js.map