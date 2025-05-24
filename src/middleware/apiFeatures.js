export class ApiFeatures {
    constructor(mongooseSchema, searchQuery) {
        this.mongooseSchema = mongooseSchema;
        this.searchQuery = searchQuery;
    }

    pagination() {
        let pageNumber = this.searchQuery.page * 1 || 1;
        if (pageNumber < 0 || pageNumber > 20) pageNumber = 1;
        let limit = 2;
        let skip = (parseInt(pageNumber) - 1) * limit;
        this.mongooseSchema.skip(skip).limit(limit);
        this.pageNumber = pageNumber;
        return this;
    }

    filter() {
        let filterObj = { ...this.searchQuery };
        let arrayFilter = ['page', 'fields', 'search', 'sort'];
        arrayFilter.forEach(val => delete filterObj[val]);
        this.mongooseSchema.find(filterObj);
        return this;
    }

    sort() {
        if (this.searchQuery.sort) {
            let sortedBy = this.searchQuery.sort.split(',').join(' ');
            this.mongooseSchema.sort(sortedBy);
        }
        return this;
    }

    fields() {
        if (this.searchQuery.fields) {
            let getField = this.searchQuery.fields.split(',').join(' ');
            this.mongooseSchema.select(getField);
        }
        return this;
    }

    search() {
        if (this.searchQuery.search) {
            this.mongooseSchema.find({
                $or: [{ caption: { $regex: this.searchQuery.search, $options: 'i' } }],
            });
        }
        return this;
    }
}
