import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "./getCroppedImg";
import classes from "./CropModal.module.css"; // CSS dosyasını ekliyoruz.

const CropModal = ({ imageSrc, onClose, onSave }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSave = async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      onSave(croppedImage);
      onClose();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={classes.modal}>
      <div className={classes.cropContainer}>
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={1} // 1:1 oran (dairesel görünüm için)
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
        />
      </div>
      <div className={classes.controls}>
        <input
          type="range"
          value={zoom}
          min={1}
          max={3}
          step={0.1}
          onChange={(e) => setZoom(e.target.value)}
        />
        <button onClick={onClose}>İptal</button>
        <button onClick={handleSave}>Kaydet</button>
      </div>
    </div>
  );
};

export default CropModal;
