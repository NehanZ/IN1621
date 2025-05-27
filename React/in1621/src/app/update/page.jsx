'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ManageProductPage() {
  const router = useRouter();

  // State for Add Product Form
  const [addFormData, setAddFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    image: '',
  });

  // State for Delete Product
  const [deleteProductId, setDeleteProductId] = useState('');

  const handleAddInputChange = (e) => {
    const { name, value } = e.target;
    setAddFormData({ ...addFormData, [name]: value });
  };

const handleAddSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch('/api/product', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...addFormData,
        price: Number(addFormData.price),
        stock: Number(addFormData.stock),
      }),
    });

    if (response.ok) {
      alert('Product added successfully!');
      router.refresh(); // Refresh the page to see the updated product list
      setAddFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        image: '',
      });
    } else {
      console.error('Failed to add product');
      alert('Failed to add product');
    }
  } catch (error) {
    console.error('Error adding product:', error);
    alert('An error occurred while adding the product.');
  }
};

  const handleDeleteInputChange = (e) => {
    setDeleteProductId(e.target.value);
  };

  const handleDeleteSubmit = async (e) => {
    e.preventDefault();
    if (!deleteProductId) {
      alert('Please enter a product ID');
      return;
    }

    try {
      const response = await fetch(`/api/products/${deleteProductId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Product deleted successfully!');
        router.reload(); // Refresh the page to see the updated product list
      } else {
        console.error('Failed to delete product');
        alert('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('An error occurred while deleting the product.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Manage Products</h1>

      {/* Add Product Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Add Product</h2>
        <form onSubmit={handleAddSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={addFormData.name}
              onChange={handleAddInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={addFormData.description}
              onChange={handleAddInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Price (LKR)</label>
            <input
              type="number"
              name="price"
              value={addFormData.price}
              onChange={handleAddInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Category</label>
            <select
              name="category"
              value={addFormData.category}
              onChange={handleAddInputChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select a category</option>
              <option value="Coffee">Coffee</option>
              <option value="Cool Drinks">Cool Drinks</option>
              <option value="Buns">Buns</option>
              <option value="Cupcakes">Cupcakes</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Stock</label>
            <input
              type="number"
              name="stock"
              value={addFormData.stock}
              onChange={handleAddInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Image URL</label>
            <input
              type="text"
              name="image"
              value={addFormData.image}
              onChange={handleAddInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Product
          </button>
        </form>
      </div>

      {/* Delete Product Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Delete Product</h2>
        <form onSubmit={handleDeleteSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Product ID</label>
            <input
              type="text"
              value={deleteProductId}
              onChange={handleDeleteInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete Product
          </button>
        </form>
      </div>
    </div>
  );
}