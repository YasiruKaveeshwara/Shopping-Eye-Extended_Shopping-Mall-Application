import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import bgblue from '../../../src/assets/recommendations/bgblue1.jpg'; // Background image
import CustomPopup from '../Recommendations/Components/CustomPopup'; // Modal component
import Carousel from '../Recommendations/Components/Carousel'; // Modal component
import ListMeasurements from '../Recommendations/ListMeasurements'
import bust1 from '../../../src/assets/recommendations/bust1.jpg'; // Image for Bust measurement guide
import bust2 from '../../../src/assets/recommendations/bust2.jpg'; // Image for Waist measurement guide
import bust3 from '../../../src/assets/recommendations/bust3.jpg'; // Image for Hip measurement guide
import bust4 from '../../../src/assets/recommendations/bust4.jpg'; // Image for Hip measurement guide
import waist1 from '../../../src/assets/recommendations/waist1.jpg'; // Image for Hip measurement guide
import waist2 from '../../../src/assets/recommendations/waist2.jpg'; // Image for Hip measurement guide
import waist3 from '../../../src/assets/recommendations/waist3.jpg'; // Image for Hip measurement guide
import waist4 from '../../../src/assets/recommendations/waist4.jpg'; // Image for Hip measurement guide
import waist5 from '../../../src/assets/recommendations/waist5.jpg'; // Image for Hip measurement guide
import hip1 from '../../../src/assets/recommendations/hip1.webp'; // Image for Hip measurement guide
import hip2 from '../../../src/assets/recommendations/hip2.jpg'; // Image for Hip measurement guide
import hip3 from '../../../src/assets/recommendations/hip3.jpg'; // Image for Hip measurement guide
import hip4 from '../../../src/assets/recommendations/hip4.webp'; // Image for Hip measurement guide

const AddMeasurements = () => {
  const [bust, setBust] = useState("");
  const [waist, setWaist] = useState("");
  const [hip, setHip] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState('info'); // 'info' or 'error'
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();


  const imagesBust = [bust1, bust2, bust3, bust4];
  const imagesWaist = [waist1, waist2, waist3, waist4, waist5];
  const imagesHip = [hip1, hip2, hip3, hip4];

  function validateInput(name, value) {
    switch (name) {
      case 'bust':
        if (value < 1) return "Enter Bust";
        return "";
      case 'waist':
        if (value < 1) return "Enter Waist";
        return "";
      case 'hip':
        if (value < 1) return "Enter Hip";
        return "";
      default:
        return "";
    }
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setErrors({
      ...errors,
      [name]: validateInput(name, value)
    });
    switch (name) {
      case 'bust':
        setBust(value);
        break;
      case 'waist':
        setWaist(value);
        break;
      case 'hip':
        setHip(value);
        break;
      default:
        break;
    }
  }

  function sendData(e) {
    e.preventDefault();

    const validationErrors = Object.keys(errors).reduce((acc, key) => {
      const error = validateInput(key, eval(key));
      if (error) acc[key] = error;
      return acc;
    }, {});

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newMeasurements = {
      bust,
      waist,
      hip
    }

    axios.post("http://localhost:3050/measurement/saveMeasurements", newMeasurements)
      .then(() => {
        setPopupMessage("Measurements Saved successfully!");
        setPopupType('info');
        setIsPopupOpen(true);

        // Resetting input fields
        setBust("");
        setWaist("");
        setHip("");
      }).catch((err) => {
        setPopupMessage("Error Saving Measurements. Please try again.");
        setPopupType('error');
        setIsPopupOpen(true);
      })
  }

  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-fixed"
        style={{
          backgroundImage: `url(${bgblue})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>

      {/* Content Wrapper */}
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <div className="container my-10 max-w-5xl mx-auto p-10 bg-white opacity-90 shadow-2xl shadow-blue-400 rounded-[5px] overflow-auto font-lexend">
            
        <div className="text-5xl font-extrabold ...">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-black justify-center">
              Enter Measurements
            </span>
          </div>

        <form className="mt-3" onSubmit={sendData}>

{/* Measurement Box 1*/}
        <div className="grid grid-cols-2 gap-16 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 mt-4 mb-4">
    <div className="container shadow-md rounded-md overflow-hidden w-full max-h-80 mt-7">

      <Carousel images={imagesBust} />

    </div>
        <div className="px-0 py-2">

            {/* with Lexend font */}
            <h1 className="text-xl font-bold text-green-800 font-inika">Bust Measurement</h1>
            <h6 className="flex items-center text-sm text-gray-600 font-lexend">
Step 1: Stand straight with your feet together, keeping your arms relaxed at your sides.<br /><br />
Step 2: Wrap a measuring tape around the fullest part of your bust, typically across your nipples and around your back. Ensure the tape is parallel to the ground and lies flat against your body.<br /><br />
Step 3: Make sure the tape is snug but not tight — it should not compress your chest. Take a deep breath in and out, then note the measurement where the end of the tape meets the rest.<br /><br /></h6>
            <div className="flex  mt-2">
            <label className="block font-bold text-lg text-blue-800 mr-3" htmlFor="bust">Bust</label>
              <input className="w-28 p-1 border border-gray-200 rounded text-base font-lexend form-check"
                type="number" placeholder="Enter Bust" name="bust" value={bust}
                onChange={handleInputChange}
              />
              <p className="flex items-center text-base font-bold text-green-600 pr-12 ml-3">cm</p>
            </div>
            {errors.bust && <div className="text-red-600">{errors.bust}</div>}

                   
        </div>  
  
      </div>
      {/* Measurement Box 1 Ends*/}

<hr></hr>

      {/* Measurement Box 2 */}
      <div className="grid grid-cols-2 gap-16 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 mt-4 mb-4" >
    <div className="container shadow-md rounded-md overflow-hidden w-full max-h-80 mt-7">
    <Carousel images={imagesWaist} />
    </div>
        <div className="px-0 py-4">


            
            {/* Event Date with Lexend font */}
            <h1 className="text-xl font-bold text-green-800 font-inika">Waist Measurement</h1>
            <h6 className="flex items-center text-sm text-gray-600 font-lexend">
           Step 1: Using your fingers, locate your waist by placing your thumbs at the base of your rib cage and your index fingers at the top of your hips. Your waist will be the narrowest part of your torso.<br /><br />

Step 2: Stand up straight, exhale slowly, and wrap the measuring tape around your body from your navel to your back. Ensure that the tape connects at the front.<br /><br />

Step 3: The tape should be parallel to the floor and snug around your torso without digging in.<br /><br />

Step 4: Write down the number where the ends of the tape meet. This is your waist measurement.<br /><br /></h6>
            

            <div className="flex  mt-2">
            <label className="block font-bold text-lg text-blue-800 mr-3" htmlFor="waist">Waist</label>
              <input className="w-28 p-1 border border-gray-200 rounded text-base font-lexend form-check"
                type="number" placeholder="Enter Waist" name="waist" value={waist}
                onChange={handleInputChange}
              />
             

              <p className="flex items-center text-base font-bold text-green-600 pr-12 ml-3">cm</p>
              
            </div>
            {errors.waist && <div className="text-red-600">{errors.waist}</div>}
  
           
  
            
                      
        </div>  
        
  
      </div>
      {/* Measurement Box 2 Ends*/}

<hr></hr>
      {/* Measurement Box 3*/}
      <div className="grid grid-cols-2 gap-16 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 mt-4 mb-4">
    <div className="container shadow-md rounded-md overflow-hidden w-full max-h-80 mt-7">
    <Carousel images={imagesHip} />
    </div>
        <div className="px-0 py-4">

            
            
            {/* with Lexend font */}
            <h1 className="text-xl font-bold text-green-800 font-inika">Hip Measurement</h1>
            <h6 className="flex items-center text-sm text-gray-600 font-lexend">
Step 2: Stand straight with your feet together, keeping your arms relaxed at your sides.<br /><br />
Step 3: Wrap a measuring tape around the fullest part of your bust, typically across your nipples and around your back. Ensure the tape is parallel to the ground and lies flat against your body.<br /><br />
Step 4: Make sure the tape is snug but not tight — it should not compress your chest. Take a deep breath in and out, then note the measurement where the end of the tape meets the rest.<br /><br /></h6>

            <div className="flex  mt-2">
            <label className="block font-bold text-lg text-blue-800 mr-3" htmlFor="hip">Hip</label>
              <input className="w-28 p-1 border border-gray-200 rounded text-base font-lexend form-check"
                type="number" placeholder="Enter Hip" name="hip" value={hip}
                onChange={handleInputChange}
              />
              

              <p className="flex items-center text-base font-bold text-green-600 pr-12 ml-3">cm</p>
            </div>
            {errors.hip && <div className="text-red-600">{errors.hip}</div>}
  
  
            
            
                      
        </div>  
        
  
      </div>
      {/* Measurement Box 3 Ends*/}

      <center>
              <br />
              <div className="flex justify-center mt-5">
                <button className="flex items-center bg-blue-700 text-white text-lg px-6 py-2 border border-blue-800 rounded-full cursor-pointer font-bold hover:bg-blue-400 hover:border-blue-950" type="submit" name="submit" id="submit">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg> Proceed
                </button>

                <Link to={`/listMeasurements`} className="flex items-center ml-24 bg-red-700 text-white text-lg px-3 py-2 border border-red-800 rounded-full cursor-pointer font-bold hover:bg-red-400 hover:border-red-950" type="button" name="cancel" id="cancel">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12h-9m9 0l-4.5 4.5m4.5-4.5L12 7.5" />
                  </svg> Cancel
                </Link>
              </div>
            </center>
      </form>
      <CustomPopup
          isOpen={isPopupOpen}
          message={popupMessage}
          onClose={() => {
            setIsPopupOpen(false);
            navigate("/listMeasurements");
          }}
          type={popupType}
        />

         
        </div>
      </div>

    </div>
  );
}

export default AddMeasurements;
