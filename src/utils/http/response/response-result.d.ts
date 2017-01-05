export declare class ResponseResult<T> {
    private genericType;
    status: number;
    msg: string;
    data: T;
    constructor(httpResponse: any, genericType: any);
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
}
