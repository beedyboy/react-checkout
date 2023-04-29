import { Query } from "mongoose";

interface QueryString {
  keyword?: string;
  page?: string;
}

class APIQuery<T> {
  public query: Query<T[], T>;
  private queryString: QueryString;

  constructor(query: Query<T[], T>, queryString: QueryString) {
    this.query = query;
    this.queryString = queryString;
  }

  paginate(resultsPerpage: number): this {
    const currentPage: number = Number(this.queryString.page) || 1;
    const skip: number = (currentPage - 1) * resultsPerpage;

    this.query = this.query.skip(skip).limit(resultsPerpage);
    return this;
  }
}

export default APIQuery;
