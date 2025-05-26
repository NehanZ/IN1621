import connectMongoDB from '../../../lib/mongodb';
import Product from '../../../models/Product';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      await connectMongoDB();
      const products = await Product.find({});
      res.status(200).json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ message: 'An error occurred while fetching products.' });
    }
  } else if (req.method === 'POST') {
    try {
      const { name, description, price, category, image, stock } = req.body;

      await connectMongoDB();
      const newProduct = new Product({
        name,
        description,
        price,
        category,
        image,
        stock,
      });

      await newProduct.save();
      res.status(201).json(newProduct);
    } catch (error) {
      console.error('Error adding product:', error);
      res.status(500).json({ message: 'An error occurred while adding the product.' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}