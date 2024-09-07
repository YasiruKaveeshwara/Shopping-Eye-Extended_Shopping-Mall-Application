import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import bgblue from '../../../src/assets/recommendations/bgblue1.jpg'; // Background image
import CustomPopup from '../Recommendations/Components/CustomPopup'; // Modal component
import ListMeasurements from '../Recommendations/ListMeasurements'
import bustGuide from '../../../src/assets/recommendations/bust_guide.jpg'; // Image for Bust measurement guide
import waistGuide from '../../../src/assets/recommendations/waist_guide.jpg'; // Image for Waist measurement guide
import hipGuide from '../../../src/assets/recommendations/hip_guide.jpg'; // Image for Hip measurement guide

const TestPage = () => {
  const [bust, setBust] = useState("");
  const [waist, setWaist] = useState("");
  const [hip, setHip] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState('info'); // 'info' or 'error'
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

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
        <div className="container my-10 max-w-3xl mx-auto p-10 bg-secondary-blue opacity-90 shadow-2xl shadow-blue-400 rounded-[50px] overflow-auto font-lexend">
          <div className="text-5xl font-extrabold ...">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-black justify-center">
              Enter Measurements
            </span>
          </div>

          <form className="mt-3" onSubmit={sendData}>
            {/* Measurement Guides Section */}
            <div className="mt-5">
              <h2 className="text-2xl font-bold text-blue-800">How to Take Your Measurements</h2>
              <div className="mt-5">
                <h3 className="text-xl font-semibold">Bust</h3>
                <img src={bustGuide} alt="Bust Measurement Guide" className="w-full max-w-md rounded shadow-md" />
                <p className="mt-2 text-gray-700">Measure around the fullest part of your bust, keeping the tape level and snug but not tight.</p>
              </div>
              <div className="mt-5">
                <h3 className="text-xl font-semibold">Waist</h3>
                <img src={waistGuide} alt="Waist Measurement Guide" className="w-full max-w-md rounded shadow-md" />
                <p className="mt-2 text-gray-700">Measure around the narrowest part of your waist, usually just above your belly button.</p>
              </div>
              <div className="mt-5">
                <h3 className="text-xl font-semibold">Hip</h3>
                <img src={hipGuide} alt="Hip Measurement Guide" className="w-full max-w-md rounded shadow-md" />
                <p className="mt-2 text-gray-700">Measure around the widest part of your hips, keeping the tape level and snug but not tight.</p>
              </div>
            </div>

            {/* User bust */}
            <div className="ml-30 text-base font-semibold mt-5">
              <label className="block font-bold text-xl text-blue-800" htmlFor="bust">Bust</label>
              <input className="w-full p-1 border border-gray-200 rounded text-lg font-lexend form-check"
                type="number" placeholder="Enter Bust" name="bust" value={bust}
                onChange={handleInputChange}
              />
              {errors.bust && <div className="text-red-600">{errors.bust}</div>}
            </div>

            {/* User Waist */}
            <div className="ml-30 text-base font-semibold mt-5">
              <label className="block font-bold text-xl text-blue-800" htmlFor="waist">Waist</label>
              <input className="w-full p-1 border border-gray-200 rounded text-lg font-lexend form-check"
                type="number" placeholder="Enter Waist" name="waist" value={waist}
                onChange={handleInputChange}
              />
              {errors.waist && <div className="text-red-600">{errors.waist}</div>}
            </div>

            {/* User Hip */}
            <div className="ml-30 text-base font-semibold mt-5">
              <label className="block font-bold text-xl text-blue-800" htmlFor="hip">Hip</label>
              <input className="w-full p-1 border border-gray-200 rounded text-lg font-lexend form-check"
                type="number" placeholder="Enter Hip" name="hip" value={hip}
                onChange={handleInputChange}
              />
              {errors.hip && <div className="text-red-600">{errors.hip}</div>}
            </div>

            <center>
              <br />
              <div className="flex justify-center mt-5">
                <button className="flex items-center bg-blue-700 text-white text-lg px-6 py-2 border border-blue-800 rounded-full cursor-pointer font-bold hover:bg-blue-400 hover:border-blue-950" type="submit" name="submit" id="submit">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg> Proceed
                </button>

                <Link to={`/`} className="flex items-center ml-24 bg-red-700 text-white text-lg px-3 py-2 border border-red-800 rounded-full cursor-pointer font-bold hover:bg-red-400 hover:border-red-950" type="button" name="cancel" id="cancel">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12h-9m9 0l-4.5 4.5m4.5-4.5L12 7.5" />
                  </svg> Cancel
                </Link>
              </div>
            </center>
          </form>
        </div>
      </div>
      <CustomPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} message={popupMessage} type={popupType} />
      <ListMeasurements />
    </div>
  );
}

export default TestPage;
