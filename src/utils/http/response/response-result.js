import * as _ from 'lodash';
export var ResponseResult = (function () {
    function ResponseResult(httpResponse) {
        this.status = httpResponse.status;
        this.msg = httpResponse.msg;
        this.data = httpResponse.data;
        if (this.isPagination(this.data)) {
            this.data = new Pagination(this.data);
        }
    }
    ResponseResult.prototype.isPagination = function (obj) {
        return obj && _.has(obj, 'currentPageNo') && _.has(obj, 'pageSize');
    };
    return ResponseResult;
}());
export var Pagination = (function () {
    function Pagination(data) {
        this.items = [];
        this.assign(data);
    }
    Pagination.prototype.assign = function (data) {
        this.currentPageNo = data.currentPageNo;
        this.pageSize = data.pageSize;
        this.totalCount = data.totalCount;
        this.pageCount = data.pageCount;
        this.hasNextPage = data.hasNextPage;
        this.items = this.items.concat(data.items);
    };
    return Pagination;
}());
//# sourceMappingURL=response-result.js.map