const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            default: '',
            trim: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        category: {
            type: String,
            enum: ['Coffee', 'Cool Drinks', 'Buns', 'Cupcakes'],
            trim: true,
        },
        stock: {
            type: Number,
            default: 0,
            min: 0,
        },
        image: {
            type: String,
            default: '',
            trim: true,
        },
        
    },
    {
        timestamps: true,
    }
);
const Product = mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;