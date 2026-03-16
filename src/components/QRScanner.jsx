import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { Camera, X, AlertCircle } from "lucide-react";

const QRScanner = ({ onScanSuccess, onClose }) => {
  const scannerRef = useRef(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState(null);
  const [cameraId, setCameraId] = useState(null);

  useEffect(() => {
    let html5QrCode = null;

    const startScanner = async () => {
      try {
        // Get available cameras
        const devices = await Html5Qrcode.getCameras();

        if (devices && devices.length > 0) {
          // Prefer back camera on mobile devices
          const backCamera = devices.find(device =>
            device.label.toLowerCase().includes('back') ||
            device.label.toLowerCase().includes('rear') ||
            device.label.toLowerCase().includes('environment')
          );

          const selectedCamera = backCamera || devices[0];
          setCameraId(selectedCamera.id);

          html5QrCode = new Html5Qrcode("qr-reader");

          const config = {
            fps: 10,
            qrbox: { width: 250, height: 250 },
            aspectRatio: 1.0,
          };

          await html5QrCode.start(
            selectedCamera.id,
            config,
            (decodedText) => {
              // Success callback
              if (decodedText) {
                html5QrCode.stop().then(() => {
                  onScanSuccess(decodedText);
                }).catch(err => {
                  console.error("Error stopping scanner:", err);
                  onScanSuccess(decodedText);
                });
              }
            },
            (errorMessage) => {
              // Error callback (this fires continuously, so we don't set error state here)
              // console.log("Scanning...", errorMessage);
            }
          );

          setIsScanning(true);
          setError(null);
        } else {
          setError("No cameras found on this device");
        }
      } catch (err) {
        console.error("Error starting scanner:", err);
        setError(err.message || "Failed to start camera. Please check permissions.");
      }
    };

    startScanner();

    // Cleanup
    return () => {
      if (html5QrCode && html5QrCode.isScanning) {
        html5QrCode.stop().catch(err => {
          console.error("Error stopping scanner:", err);
        });
      }
    };
  }, [onScanSuccess]);

  const handleClose = () => {
    if (scannerRef.current) {
      Html5Qrcode.getCameras().then(() => {
        onClose();
      }).catch(() => {
        onClose();
      });
    } else {
      onClose();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Camera size={24} className="text-blue-600 dark:text-blue-400" />
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">
            Scan QR Code
          </h3>
        </div>
        <button
          onClick={handleClose}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <X size={24} className="text-gray-600 dark:text-gray-300" />
        </button>
      </div>

      {error ? (
        <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
          <AlertCircle size={48} className="mx-auto mb-4 text-red-500" />
          <p className="text-red-800 dark:text-red-300 mb-4">{error}</p>
          <button
            onClick={handleClose}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div
            id="qr-reader"
            ref={scannerRef}
            className="w-full rounded-lg overflow-hidden border-4 border-blue-500 dark:border-blue-400"
          />

          {isScanning && (
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Camera active - Position QR code within the frame
                </p>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                The VIN will be automatically filled once detected
              </p>
            </div>
          )}

          <button
            onClick={handleClose}
            className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-3 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all font-semibold"
          >
            Cancel Scanning
          </button>
        </div>
      )}
    </div>
  );
};

export default QRScanner;
