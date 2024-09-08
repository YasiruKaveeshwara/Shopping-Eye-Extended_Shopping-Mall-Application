import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import ItemView from '../../components/ProductCardView/ItemView'; // Adjust the path as necessary

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import bgblue from '../../../src/assets/recommendations/bgblue1.jpg'; // Background image
import hourglass1 from '../../../src/assets/recommendations/hourglass1.jpeg'; 

import ConfirmDeletion from '../Recommendations/Components/ConfirmDeletion'; // Import the modal component
import CustomPopup from '../Recommendations/Components/CustomPopup'; // Import the modal component

// Import outfit images
import fitted1 from '../../../src/assets/recommendations/fitted1.jpeg';
import fitted2 from '../../../src/assets/recommendations/fitted2.jpeg';
import fitted3 from '../../../src/assets/recommendations/fitted3.jpeg';

import wrap1 from '../../../src/assets/recommendations/wrap1.jpeg';
import wrap2 from '../../../src/assets/recommendations/wrap2.jpeg';
import wrap3 from '../../../src/assets/recommendations/wrap3.jpeg';

import highwaistsk1 from '../../../src/assets/recommendations/highwaistsk1.jpeg';
import highwaistsk2 from '../../../src/assets/recommendations/highwaistsk2.jpeg';
import highwaistsk3 from '../../../src/assets/recommendations/highwaistsk3.jpeg';

import vneck1 from '../../../src/assets/recommendations/vneck1.jpeg';
import vneck2 from '../../../src/assets/recommendations/vneck2.jpeg';
import vneck3 from '../../../src/assets/recommendations/vneck3.jpeg';


const outfitData = [
    {
        name: 'Fitted Dress',
        description: 'Show off the waistline.',
        images: [fitted1, fitted2, fitted3]
    },
    {
        name: 'Wrap Dress',
        description: 'Accentuate curves.',
        images: [wrap1, wrap2, wrap3]
    },
    {
        name: 'High-Waisted Skirt',
        description: 'Define the waist.',
        images: [highwaistsk1, highwaistsk2, highwaistsk3]
    },
    {
        name: 'V-Neck Top',
        description: 'Draw attention to the upper body.',
        images: [vneck1, vneck2, vneck3]
    }
];

const TestPage = () => {
    const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3050/api/items');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleEdit = (product) => {
    console.log('Edit product:', product);
    // Handle product editing logic here
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3050/api/items/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (response.ok) {
        setProducts(products.filter((product) => product._id !== id));
        alert(data.message);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleWishlist = (product) => {
    console.log('Wishlist product:', product);
    // Handle wishlist logic here
  };

  // Filter products that contain the word "skirt" in the name, description, or tags
  const filteredProducts = products.filter(product =>
    product.productName.toLowerCase().includes('skirt') ||
    product.description.toLowerCase().includes('skirt') ||
    product.category.toLowerCase().includes('skirt') ||
    (Array.isArray(product.tags) && product.tags.some(tag => tag.toLowerCase().includes('skirt'))) ||
    product.productName.toLowerCase().includes('top') ||
    product.description.toLowerCase().includes('top') ||
    product.category.toLowerCase().includes('top') ||
    (Array.isArray(product.tags) && product.tags.some(tag => tag.toLowerCase().includes('top')))
  );
  



    const pdfRef = useRef();

    const [selectedMeasurements, setSelectedMeasurements] = useState(null);
    const [selectedMeasurementsId, setSelectedMeasurementsId] = useState(null);
    const { measurementsId } = useParams(); // Get the measurementsId from URL params

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [popupType, setPopupType] = useState('info'); // 'info' or 'error'

    const navigate = useNavigate();

    useEffect(() => {
        // Fetch measurements data based on measurementsId when the component mounts
        async function getMyMeasurements() {
            try {
                const response = await axios.get(`http://localhost:3050/measurement/getUserMeasurements/${measurementsId}`);
                setSelectedMeasurements(response.data.userMeasurements);
                console.log("Fetched Measurements Details Successfully");
            } catch (error) {
                console.error("Error fetching Measurements data:", error.message);
                alert("Error fetching Measurements data. Please try again.");
            }
        }
        getMyMeasurements();
    }, [measurementsId]);

    const confirmDelete = async () => {
        if (selectedMeasurements && selectedMeasurements._id) {
            try {
                await axios.delete(`http://localhost:3050/measurement/deleteMyMeasurements/${selectedMeasurements._id}`);
                setIsModalOpen(false); // Close the modal
                setPopupMessage("Measurements Deleted Successfully!");
                setPopupType('info');
                setIsPopupOpen(true);
            } catch (error) {
                console.error("Error deleting measurements:", error.message);
                setPopupMessage("Error deleting measurements. Please try again!");
                setPopupType('error');
                setIsPopupOpen(true);
            }
        }
    };

    



    // Slider settings for each outfit's images
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };


    const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = (e) => {
    e.preventDefault();  // Prevent form submission
    setCurrentIndex((prevIndex) => (prevIndex + 1) % outfitData.length);
  };

  const prevSlide = (e) => {
    e.preventDefault();  // Prevent form submission
    setCurrentIndex((prevIndex) =>
      (prevIndex - 1 + outfitData.length) % outfitData.length
    );
  };



    return (
        <div className="relative min-h-screen">
            {/* Background Image */}
            {/* <div
                className="absolute inset-0 z-0 bg-fixed"
                style={{
                    backgroundImage: `url(${bgblue})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
            </div> */}

            {/* Content Wrapper */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
                <div className="container max-w-5xl p-5 mx-auto my-10 overflow-auto bg-fixed bg-opacity-50 border-8 border-double shadow-2xl rounded-3xl bg-gray-50 shadow-theme-green border-theme-green">
                    <div ref={pdfRef}>
                        <div className="grid grid-cols-1 gap-10 pt-4 lg:px-40 sm:px-10 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1">
                            {/* Example: Displaying Measurements Data */}
                            <div className="container flex items-center justify-center w-full overflow-hidden shadow-md rounded-3xl h-96">
                                <img className="object-fill w-140 h-full" src={hourglass1} alt="Example Image" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-10 pt-4 lg:px-40 sm:px-10 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1">
                            <div>
                                <h1 className="text-2xl font-bold text-center text-green-800 font-inika">Your Body Type: Hourglass</h1>

                                <div className="mt-2 p-des max-h-24">
                                    <p className="text-base text-center font-mclaren">Well-balanced proportions with a defined waist. Bust and hips are approximately the same size.</p>
                                </div>
                                <div className="mt-2 p-des max-h-24">
                                    <p className="text-base text-center font-mclaren">Your body is curvy with a small waist, bust, and hips in proportion.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-2">
                        <div className="flex items-center justify-between mx-48 mt-8 mb-8">
                            {selectedMeasurements && (
                                <Link
                                    to={`/updateMyMeasurements/${selectedMeasurements._id}`}
                                    className="flex items-center text-white text-xl px-3 py-1  bg-blue-500 hover:bg-blue-800   rounded-3xl"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-1">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                                    </svg>
                                    Edit
                                </Link>
                            )}

                            <button
                                className="ml-5 flex items-center text-white text-xl font-mclaren px-3 py-1 bg-red-500 hover:bg-red-800 rounded-3xl"
                                onClick={() => {
                                    if (selectedMeasurements) {
                                        setSelectedMeasurementsId(selectedMeasurements._id);
                                        setIsModalOpen(true);
                                    }
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-1">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                                Reset
                            </button>
                        </div>
                    </div>
                    
                </div>

{/* Carousel Section 2 for Outfits */}
<div className="w-full max-w-full mx-auto mb-5 bg-black">
<h2 className="text-2xl font-bold text-center text-white mb-6 bg-black py-2">Recommended Outfits</h2>
<div className="relative overflow-hidden w-full max-w-3xl mx-auto mb-5 bg-black">
  {/* Slide container */}
  <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
    {outfitData.map((outfit, outfitIndex) => (
      <div className="flex-shrink-0 w-full" key={outfitIndex}>
        {/* Outfit Name */}
        <h3 className="text-xl font-semibold text-center mb-4 text-white">{outfit.name}</h3>
        
        {/* Horizontal Image Collage */}
        <div className="flex justify-center space-x-4">
          {outfit.images.map((image, imgIndex) => (
            <div className="shadow-md rounded-md overflow-hidden w-1/3 max-h-60" key={imgIndex}>
              <img className="w-full h-full object-cover" src={image} alt={`Outfit ${outfitIndex} Image ${imgIndex}`} />
            </div>
          ))}
        </div>
        
        {/* Description Overlay (optional) */}
        <div className="mt-4 text-center">
          <p className="text-md text-white">{outfit.description}</p>
        </div>
      </div>
    ))}
  </div>

  {/* Left Arrow */}
  <button
    className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
    onClick={prevSlide}
  >
    &#10094;
  </button>

  {/* Right Arrow */}
  <button
    className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
    onClick={nextSlide}
  >
    &#10095;
  </button>
</div>
</div>



                {/* Carousel Section for Outfits */}
                {/* <div className="my-10">
                        <h2 className="text-2xl font-bold text-center text-green-800 mb-6">Recommended Outfits</h2>
                        {outfitData.map((outfit, index) => (
                            <div key={index} className="my-8">
                                <h3 className="text-xl font-semibold text-center mb-4">{outfit.name}</h3>
                                <Slider {...sliderSettings}>
                                    {outfit.images.map((image, imgIndex) => (
                                        <div key={imgIndex} className="relative">
                                            <img src={image} alt={`${outfit.name} ${imgIndex + 1}`} className="w-full h-64 object-cover" />
                                            <div className="absolute bottom-0 w-full bg-black bg-opacity-50 text-white text-center py-4">
                                                <p className="text-md">{outfit.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                        ))}
                    </div> */}

                    


                


                {/* Use the Confirm Deletion Modal here */}
                <ConfirmDeletion
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onConfirm={confirmDelete}
                />

                {/* Custom Popup */}
                <CustomPopup
                    isOpen={isPopupOpen}
                    message={popupMessage}
                    onClose={() => {
                        setIsPopupOpen(false);
                        setIsModalOpen(false);
                        navigate("/");
                    }}
                    type={popupType}
                />
            </div>


            <div className="mx-16">
            <div className="product-grid">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <ItemView
            key={product._id}
            product={product}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onWishlist={handleWishlist}
          />
        ))
      ) : (
        <p>No products available.</p>
      )}
    </div>
        </div>
        </div>
    );
};

export default TestPage;


