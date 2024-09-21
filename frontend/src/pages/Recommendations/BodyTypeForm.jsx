import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BodyTypeForm = ({ product, onSuccess = () => {}, onCancel = () => {} }) => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    image: null  
  });
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState('');  // For displaying image preview
  const isEditing = Boolean(product);

  const navigate = useNavigate();

  // useEffect(() => {
  //   if (isEditing && product) {
  //     setForm({
  //       name: product.name || '',
  //       description: product.description || '',  // Set description
  //       image: null  // Clear image state
  //     });
  //     setImagePreview(product.imageUrl || '');  // Set image preview
  //   }
  // }, [product, isEditing]);

  const onUpdateField = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const onFileChange = (e) => {
    setForm({
      ...form,
      image: e.target.files[0]  // Handle image file
    });

    // Set image preview
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.description) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const url = isEditing
        ? `http://localhost:3050/api/bodyTypes/updateBodyType/${product._id}`
        : 'http://localhost:3050/api/bodyTypes/addBodyType';
      const method = isEditing ? 'PUT' : 'POST';
      
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('description', form.description);  // Append description
      if (form.image) formData.append('image', form.image);  // Append image if present

      const response = await fetch(url, {
        method,
        body: formData,  // No need to set Content-Type with FormData
      });

      const data = await response.json();

      if (response.ok) {
        console.log(`BodyType ${isEditing ? 'updated' : 'added'} successfully`);
        setForm({
          name: '',
          description: '',  // Reset description
          image: null  // Reset image
        });
        setImagePreview('');  // Reset image preview
        setError('');
        if (typeof onSuccess === 'function') {
          onSuccess();
        } else {
          console.warn('onSuccess is not a function');
        }
      } else {
        setError(data.message || `Failed to ${isEditing ? 'update' : 'add'} item. Please try again.`);
      }
    } catch (err) {
      console.error(`Error ${isEditing ? 'updating' : 'adding'} item:`, err);
      setError(`An error occurred while ${isEditing ? 'updating' : 'adding'} the item.`);
    }
  };

  const handleCancel = () => {
    navigate('/listBodyTypes');  // Navigate to the list page when cancel is clicked
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-5">
      <form className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg" onSubmit={onSubmit}>
        <h2 className="text-2xl font-bold mb-5 text-gray-800 text-center">{isEditing ? 'Edit Product' : 'Add Product'}</h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Body Type Name</label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
            type="text"
            name="name"
            value={form.name}
            onChange={onUpdateField}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
            name="description"
            value={form.description}
            onChange={onUpdateField}
            rows="4"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Image</label>
          {imagePreview && (
            <div className="mb-4">
              <img src={imagePreview} alt="" className="w-full h-auto rounded-lg" />
            </div>
          )}
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
            type="file"
            name="image"
            onChange={onFileChange}
          />
        </div>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="flex justify-between">
          <button type="submit" className="bg-indigo-500 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-500">
            {isEditing ? 'Update BodyType' : 'Add BodyType'}
          </button>
          <button type="button" onClick={handleCancel} className="bg-gray-500 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-500">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default BodyTypeForm;
