import { isUndefined } from 'ionic-angular/util/util';

export class ResponseResult<T> {
  status: number;
  msg: string;
  data: T;

  constructor(httpResponse: any, private genericType) {
    this.status = httpResponse.status;
    this.msg = httpResponse.msg;
    this.data = httpResponse.data;

    if (this.isPagination(this.data)) {
      this.data = new genericType(this.data);
    }
  }

  private isPagination(obj: any): boolean {
    return obj && !isUndefined(obj['currentPageNo']);
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
    this.currentPageNo = data.currentPageNo;
    this.pageSize = data.pageSize;
    this.totalCount = data.totalCount;
    this.pageCount = data.pageCount;
    this.hasNextPage = data.hasNextPage;
    this.items = this.items.concat(data.items);
  }
}