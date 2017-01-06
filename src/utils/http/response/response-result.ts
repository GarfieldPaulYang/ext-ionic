import { isUndefined } from 'ionic-angular/util/util';

export class ResponseResult<T> {
  status: number;
  msg: string;
  data: T | any;

  constructor(httpResponse: any) {
    this.status = httpResponse.status;
    this.msg = httpResponse.msg;
    this.data = httpResponse.data;

    if (this.isPagination(this.data)) {
      this.data = new Pagination(this.data);
    }
  }

  private isPagination(obj: any): boolean {
    return obj && !isUndefined(obj['currentPageNo']) && !isUndefined(obj['pageSize']);
  }
}

export class Pagination {
  currentPageNo: number;
  pageSize: number;
  totalCount: number;
  pageCount: number;
  hasNextPage: boolean;
  items: Array<any> = [];

  constructor(data: any) {
    this.assign(data);
  }

  assign(data: any) {
    this.currentPageNo = data.currentPageNo;
    this.pageSize = data.pageSize;
    this.totalCount = data.totalCount;
    this.pageCount = data.pageCount;
    this.hasNextPage = data.hasNextPage;
    this.items = this.items.concat(data.items);
  }
}