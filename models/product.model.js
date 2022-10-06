const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PRODUCT = 'product';

const productSchema = new Schema({
    name: String,
    description: String,
    department: String,
    price: Number,
    available: Boolean,
    stock: Number
});



productSchema.virtual('price_taxes').get(function () {
    return (this.price * 1.21).toFixed(2);
})

productSchema.method.sameDepartment = function () {
    return this.model(PRODUCT).find({ department: this.department });
}

productSchema.statics.getByMaxPrice = function () {
    return this.model('PRODUCT').find();
}

productSchema.static.availables = function () {
    return this.model(PRODUCT).aggregate([
        {
            $group: {
                _id: '$available',
                count: { $sum: 1 },
                stock: { $sum: '$stock' }
            }
        },
        { $sort: { stock: 1 } }
    ]);
}

module.exports = mongoose.model(PRODUCT, productSchema);