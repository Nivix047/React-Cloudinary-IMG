import React, { useState } from "react";
import axios from "axios";
import { CloudinaryImage } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";

const ImageUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const uploadImage = async () => {
    if (!selectedFile) {
      console.error("No file selected for upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append(
      "upload_preset",
      process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
    );

    let res;
    try {
      res = await axios.post(process.env.REACT_APP_CLOUDINARY_URL, formData);
    } catch (error) {
      console.error(error);
      return;
    }

    const publicId = res.data.public_id;
    setSelectedImage(
      new CloudinaryImage(publicId, { cloudName: "douz904tt" }).resize(
        fill().width(100).height(150)
      )
    );
  };

  return (
    <div>
      <input
        type="file"
        name="file"
        placeholder="Upload an image"
        onChange={handleFileChange}
      />
      <button type="button" onClick={uploadImage}>
        Submit
      </button>
      {selectedImage && <AdvancedImage cldImg={selectedImage} />}
    </div>
  );
};

export default ImageUploader;
