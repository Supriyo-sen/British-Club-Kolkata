const mongoose = require("mongoose");

class MemberFilter {
  constructor(query) {
    this.query = query;
    this.queryString = {};
    this.page = query.page ? parseInt(query.page, 10) : 1;
    this.limit = query.limit ? parseInt(query.limit, 10) : 10;
  }

  filter() {
    if (this.query.search) this.queryString.search = this.query.search;
    return this;
  }

  sort() {
    if (this.query.sortBy) {
      const sortBy = this.query.sortBy === "asc" ? 1 : -1;
      this.queryString.sort = { timeStamp: sortBy };
    }
    return this;
  }

  paginate() {
    const skip = (this.page - 1) * this.limit;
    this.pagination = { skip, limit: this.limit };
    return this;
  }

  async exec() {
    const searchTerms = this.queryString.search
      ? this.queryString.search.split(' ')
      : [];
    const searchPatterns = searchTerms.map(term => new RegExp(term, "i"));
    const searchConditions = searchPatterns.map(pattern => ({
      $or: [
        { name: { $regex: pattern } },
        { email: { $regex: pattern } },
        { mobileNumber: { $regex: pattern } },
        { _id: { $regex: pattern } },
        { fullname: { $regex: pattern } }
      ]
    }));

    const members = await mongoose
      .model("MemberSchema")
      .find(searchConditions.length ? { $and: searchConditions } : {})
      .sort(this.queryString.sort)
      .skip(this.pagination.skip)
      .limit(this.pagination.limit)
      .populate("wallet");

    return members;
  }
}
module.exports = { MemberFilter };
