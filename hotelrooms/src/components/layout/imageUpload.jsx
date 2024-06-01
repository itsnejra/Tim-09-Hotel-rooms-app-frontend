import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ImageUpload = ({ setImageFiles, roomNumber }) => {
  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedImages(files);
    setImageFiles(files); // Set image files in the parent component
  };

  const removeImage = (index) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
    setImageFiles(updatedImages);
  };

  return (
    <div>
      <label
        htmlFor="imageUpload"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Postavi slike
      </label>
      <label htmlFor="imageUpload" className="block text-sm font-medium text-gray-700 mb-1 cursor-pointer">
        <span className="inline-block bg-blue-50 text-blue-700 py-2 px-4 rounded-full text-sm font-semibold hover:bg-blue-100">
          Izaberi slike
        </span>
        <input
          id="imageUpload"
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="hidden" // Hide the input element, but keep it functional
        />
      </label>
      <div className="mt-4">
        {selectedImages.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Izabrane slike;
            </h3>
            <ul>
              {selectedImages.map((file, index) => (
                <li key={index} className="text-sm text-gray-700 w-full flex justify-between items-center mb-5">
                <span>{file.name}</span>
                <button type="button" onClick={() => removeImage(index)} className="text-white bg-red-500 py-1 px-3 rounded">
                  X
                </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

ImageUpload.propTypes = {
  setImageFiles: PropTypes.func.isRequired,
  roomNumber: PropTypes.number,
};

export default ImageUpload;
