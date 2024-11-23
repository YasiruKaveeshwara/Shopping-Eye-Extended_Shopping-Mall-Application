import React, { useState } from "react";
import "./headerStyles.css";
import notificationIcon from "../../images/notification.png"; // Import the image
import sidebarIcon from "../../images/list.png"; // Import the image
import scanIcon from "./QrCode.gif";
import ScanQR from "../../pages/scanQR.jsx";

export default function Header({ toggleSidebar }) {
  const [showScanQRPopup, setShowScanQRPopup] = useState(false); // State to control ScanQR popup
  
  const handleScanClick = () => {
    setShowScanQRPopup(true); // Show the ScanQR popup when scan icon is clicked
  };

  const handleCloseScanQR = () => {
    setShowScanQRPopup(false); // Function to close the ScanQR popup
  };

  return (
    <div className='header'>
      <div className='icons'>
        <img
          src={sidebarIcon}
          alt='Sidebar'
          className='sidebar-icon'
          onClick={toggleSidebar} // Trigger sidebar toggle on click
        />
      </div>
      <div className='search-bar'>
        <input type='text' placeholder='Search...' />
      </div>
      <div className='icons'>
        <img
          src={scanIcon}
          alt='scan'
          className='scan-icon'
          onClick={handleScanClick} // Show ScanQR popup on click
        />
      </div>
      <div className='icons'>
        <img src={notificationIcon} alt='Notification' className='notification-icon' />
      </div>

      {/* Conditionally render ScanQR component */}
      {showScanQRPopup && (
        <div className='popup'>
          <ScanQR closePopup={handleCloseScanQR} /> {/* Pass close function as prop */}
        </div>
      )}
    </div>
  );
}
