class APIFeatures {
  constructor(query, queryString) {
    // QUERY (Tour.find())
    this.query = query;
    // query object (req.query)
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const exludedFields = ['page', 'sort', 'limit', 'fields'];
    exludedFields.forEach(el => delete queryObj[el]);
    // find into query string [gt] and replace [$gt]
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gt|gte|lte|lt)\b/g, match => `$${match}`);
    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      // api/v1/tours/sort=price
      // api/v1/tours/sort=-price
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  limit() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  paginate() {
    const page = +this.queryString.page || 1;
    const limit = +this.queryString.limit || 10;
    const skip = (page - 1) * limit;
    // page=2&limit=10
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
