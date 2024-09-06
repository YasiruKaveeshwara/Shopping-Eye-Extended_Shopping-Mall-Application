import React, { useState, useRef, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function Building() {
  return (
    <group position={[0, -2, 0]}>
      <mesh>
        <boxGeometry args={[3, 1, 3]} />
        <meshStandardMaterial color={"#6aff00"} />
      </mesh>
      {/* First story */}
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[3, 1, 3]} />
        <meshStandardMaterial color={"#312eff"} />
      </mesh>
      {/* Second story */}
      <mesh position={[0, 2, 0]}>
        <boxGeometry args={[3, 1, 3]} />
        <meshStandardMaterial color={"#ff2929"} />
      </mesh>
      {/* Third story */}
      <mesh position={[0, 3, 0]}>
        <boxGeometry args={[3, 1, 3]} />
        <meshStandardMaterial color={"#44ffff"} />
      </mesh>
    </group>
  );
}

export default function ShopQR() {
  const [url, setUrl] = useState("");
  const [qrCode, setQrCode] = useState(null);
  const [scannedData, setScannedData] = useState("");
  const [showScanner, setShowScanner] = useState(false);
  const scannerRef = useRef(null);

  const generateQRCode = () => {
    if (url.trim() !== "") {
      setQrCode(url); // Set the entered URL or text to generate QR code
    }
  };

  useEffect(() => {
    if (showScanner) {
      // Initialize the QR scanner when showScanner is true
      const html5QrCodeScanner = new Html5QrcodeScanner("reader", {
        fps: 10,
        qrbox: { width: 250, height: 250 },
      });

      html5QrCodeScanner.render(
        (data) => {
          // Data is returned as an object which contains the decoded QR code content
          setScannedData(data);
          html5QrCodeScanner.clear();
          setShowScanner(false);
        },
        (error) => {
          console.log(`QR code scanning error: ${error}`);
        }
      );

      return () => {
        html5QrCodeScanner.clear(); // Cleanup scanner on component unmount
      };
    }
  }, [showScanner]);

  return (
    <div>
      <h1>Shop QR</h1>

      <div>
        <input
          type='text'
          placeholder='Enter Shop Name or URL'
          onChange={(e) => setUrl(e.target.value)}
          value={url}
        />
        <button onClick={generateQRCode}>Generate</button>
      </div>

      {qrCode && (
        <div>
          <h2>QR Code:</h2>
          <QRCodeCanvas value={qrCode} />
        </div>
      )}

      <div>
        <button onClick={() => setShowScanner(true)}>Scan QR Code</button>
      </div>

      {showScanner && <div id='reader' style={{ width: "300px", height: "300px" }}></div>}

      {scannedData && (
        <div>
          <h2>Scanned Data:</h2>
          <p>{scannedData}</p>
        </div>
      )}

      
    </div>
  );
}
