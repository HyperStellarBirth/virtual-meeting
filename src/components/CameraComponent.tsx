// src/CameraComponent.tsx
import React, { useState, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';

interface CameraProps {
  videoConstraints?: MediaStreamConstraints;
}

const CameraComponent: React.FC<CameraProps> = ({ videoConstraints }) => {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const webcamRef = useRef<Webcam>(null);

  const handleCameraToggle = async () => {
    if (!isCameraActive) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        setIsCameraActive(true);
        if (webcamRef.current) {
          webcamRef.current.stream = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    } else {
      setIsCameraActive(false); // Turn off camera if already active
      // Optionally, release the media stream for better resource management:
      if (webcamRef.current && webcamRef.current.stream) {
        webcamRef.current.stream.getTracks().forEach((track) => track.stop());
      }
    }
  };

  return (
    <div>
      {isCameraActive ? (
        <div>
          <Webcam audio={false} ref={webcamRef} width={640} height={480} />
          <button onClick={handleCameraToggle}>Turn Off Camera</button>
        </div>
      ) : (
        <button onClick={handleCameraToggle}>Turn On Camera</button>
      )}
    </div>
  );
};

export default CameraComponent;
