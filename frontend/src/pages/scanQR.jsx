import React, { useState, useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import "./scanQR.css";
import Close from "./Close.gif";

export default function ScanQR({ closePopup }) {
  const [scannedData, setScannedData] = useState("");
  const [showScanner, setShowScanner] = useState(true);

  useEffect(() => {
    if (showScanner) {
      const html5QrCodeScanner = new Html5QrcodeScanner(
        "reader",
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        /* verbose= */ false
      );

      html5QrCodeScanner.render(
        (data) => {
          setScannedData(data);
          html5QrCodeScanner.clear();
          setShowScanner(false);
        },
        (error) => {
          console.log(`QR code scanning error: ${error}`);
        }
      );

      return () => {
        html5QrCodeScanner.clear();
      };
    }
  }, [showScanner]);

  return (
    <>
      {showScanner && <div className="popup-overlay"></div>} {/* Popup overlay */}
      <div className="container">
        <img src={Close} className="close-popup" onClick={closePopup} alt="Close"/> {/* Close button */}
        <div className="scan-qr-wrapper">
          {showScanner && (
            <>
              <div className="qr-scanner-container">
                <div id="reader"></div>
                <div className="qr-scanner-border"></div>
                {/* Add the animated line */}
                <div className="scanner-line"></div>
              </div>
            </>
          )}

          {scannedData && (
            <div>
              <h2>Go to Location</h2>
              <p>{scannedData}</p>
              <button onClick={() => window.location.href = `http://localhost:3000/map/${scannedData}`}>Location</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
