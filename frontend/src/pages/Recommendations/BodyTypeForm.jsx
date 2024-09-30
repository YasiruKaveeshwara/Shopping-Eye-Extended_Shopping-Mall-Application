import React, { useState, useEffect  } from 'react'
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import CustomPopup from '../Recommendations/Components/CustomPopup'; // Modal component

const BodyTypeForm = () => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    image: null  
  });
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState('');  // For displaying image preview

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState('info'); // 'info' or 'error'
  const navigate = useNavigate();

  const { bodyTypesId } = useParams(); // Get the eventId from URL params
  const [selectedBodyType, setSelectedBodyType] = useState(null);


  useEffect(() => {
    console.log('bodyTypesId:', bodyTypesId); // Print the bodyTypesId
    if (bodyTypesId) {
      // Only trigger this effect if bodyTypesId exists

      axios
        .get(`http://localhost:3050/api/bodyTypes/getBodyType/${bodyTypesId}`)
        .then(response => {
          console.log('Fetched BodyType:', response.data); // Print the fetched body type
          setSelectedBodyType(response.data); // Set the body type data
        })
        .catch(error => {
          console.error('There was an error fetching the body type!', error);
        });
    }
  }, [bodyTypesId]);



    useEffect(() => {
    if (selectedBodyType) {
      setForm({
        name: selectedBodyType.name || '',
        description: selectedBodyType.description || '',  // Set description
        image: null  // Clear image state
      });
      setImagePreview(selectedBodyType.imageUrl || '');  // Set image preview
    }
  }, [selectedBodyType]);



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
  
    // Basic validation
    if (!form.name || !form.description) {
      setError('Please fill in all fields.');
      return;
    }
  
    try {
      // Determine URL and method based on whether bodyTypesId is present
      const url = bodyTypesId
        ? `http://localhost:3050/api/bodyTypes/updateBodyType/${bodyTypesId}`
        : 'http://localhost:3050/api/bodyTypes/addBodyType';
      const method = bodyTypesId ? 'PUT' : 'POST';
  
      // Prepare FormData object
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('description', form.description);
      if (form.image) formData.append('image', form.image); // Append image if provided
  
      // Send request
      const response = await fetch(url, {
        method,
        body: formData, // No need to set Content-Type with FormData
      });
  
      // Convert response to JSON
      const data = await response.json();
  
      // Handle the response based on success or error
      if (response.ok) {
        handleResponse('BodyType saved/updated successfully!', 'info');
      } else {
        handleError(data.message || 'Error saving/updating BodyType. Please try again.');
      }
    } catch (error) {
      handleError('Error saving/updating BodyType. Please try again.');
    }
  };
  
  // Handle success response
  const handleResponse = (message, type) => {
    setPopupMessage(message);
    setPopupType(type);
    setIsPopupOpen(true);
  
    // Reset form after successful submission
    setForm({
      name: '',
      description: '',
      image: null,
    });
    setImagePreview(''); // Reset image preview
    setError(''); // Clear any previous errors
  };
  
  // Handle error response
  const handleError = (message) => {
    setPopupMessage(message);
    setPopupType('error');
    setIsPopupOpen(true);
  };
  
  // Handle cancel button click
  const handleCancel = () => {
    navigate('/listBodyTypes'); // Navigate to body types list
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-5">
      <form className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg" onSubmit={onSubmit}>
        <h2 className="text-2xl font-bold mb-5 text-gray-800 text-center">{bodyTypesId ? 'Edit Product' : 'Add Product'}</h2>

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
            {bodyTypesId ? 'Update BodyType' : 'Add BodyType'}
          </button>
          <button type="button" onClick={handleCancel} className="bg-gray-500 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-500">
            Cancel
          </button>
        </div>
      </form>


      <CustomPopup
          isOpen={isPopupOpen}
          message={popupMessage}
          onClose={() => {
            setIsPopupOpen(false);
            navigate("/listBodyTypes");
          }}
          type={popupType}
        />

    </div>
  );
}

export default BodyTypeForm;
