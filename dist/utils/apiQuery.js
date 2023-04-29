"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class APIQuery {
    query;
    queryString;
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    paginate(resultsPerpage) {
        const currentPage = Number(this.queryString.page) || 1;
        const skip = (currentPage - 1) * resultsPerpage;
        this.query = this.query.skip(skip).limit(resultsPerpage);
        return this;
    }
}
exports.default = APIQuery;
