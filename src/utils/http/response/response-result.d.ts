export declare class ResponseResult<T> {
    status: number;
    msg: string;
    data: T | any;
    constructor(httpResponse: any);
    private isPagination(obj);
}
export declare class Pagination {
    currentPageNo: number;
    pageSize: number;
    totalCount: number;
    pageCount: number;
    hasNextPage: boolean;
    items: Array<any>;
    constructor(data: any);
    assign(data: any): void;
}
