import React, { useState } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import app from "../firebase";

export default function CreatePost() {
  const [formData, setFormData] = useState({
    country: '',
    capital: '',
    currency: '',
    language: '',
    currency_code: '',
    region: '',
    isd_code: '',
    monetary: '',
    land: '',
    banknote: '', 
    coin: '', 
    island : '',
    images: [] // Array to store image URLs
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [files, setFiles] = useState([]); // State for multiple files
  const [imageUploadProgress, setImageUploadProgress] = useState([]);
  const [imageUploadError, setImageUploadError] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isUploading) {
      setErrorMessage("Please wait for images to finish uploading.");
      return;
    }

    if (!formData.country || !formData.capital || !formData.currency || !formData.language || !formData.currency_code || !formData.region || !formData.isd_code || !formData.monetary || !formData.land || !formData.banknote || !formData.coin || !formData.island || formData.images.length === 0) {
      return setErrorMessage("Please fill in all fields and upload at least one image");
    }

    try {
      const response = await fetch('/api/country/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error creating post:', error.message);
    }
  };

  const handleUploadImage = async () => {
    if (files.length === 0) {
      setImageUploadError([0], "Please select at least one image");
      return;
    }

    setIsUploading(true);
    setImageUploadProgress(Array(files.length).fill(0));
    setImageUploadError(Array(files.length).fill(null));

    const storage = getStorage(app);
    const uploadPromises = files.map((file, index) => {
      const fileName = new Date().getTime() + '-' + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      return new Promise((resolve, reject) => {
        uploadTask.on('state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setImageUploadProgress(prevProgress => {
              const newProgress = [...prevProgress];
              newProgress[index] = progress.toFixed(0);
              return newProgress;
            });
          },
          (error) => {
            setImageUploadError(prevErrors => {
              const newErrors = [...prevErrors];
              newErrors[index] = 'Image upload failed';
              return newErrors;
            });
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref)
              .then((downloadURL) => {
                setFormData(prevFormData => ({
                  ...prevFormData,
                  images: [...prevFormData.images, downloadURL]
                }));
                resolve(downloadURL);
              })
              .catch(error => {
                setImageUploadError(prevErrors => {
                  const newErrors = [...prevErrors];
                  newErrors[index] = 'Error getting download URL';
                  return newErrors;
                });
                reject(error);
              });
          }
        );
      });
    });

    try {
      await Promise.all(uploadPromises);
      setIsUploading(false);
    } catch (error) {
      setIsUploading(false);
      console.error('Error uploading images:', error.message);
      setImageUploadError(Array(files.length).fill('Image upload failed'));
    }
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    setImageUploadProgress(Array(selectedFiles.length).fill(0));
    setImageUploadError(Array(selectedFiles.length).fill(null));
  };

  return (
    <div className="container">
      <h1 className="main_heading">Create Post</h1>
      <div className="row">
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            placeholder="Country"
            id="country"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Capital"
            id="capital"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Currency"
            id="currency"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Language"
            id="language"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Currency Code"
            id="currency_code"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Region"
            id="region"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="ISD Code"
            id="isd_code"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Land Area"
            id="land"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Monetary System"
            id="monetary"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Banknotes"
            id="banknote"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Coins"
            id="coin"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Islands"
            id="island"
            onChange={handleChange}
          />

          <div className="upload-file">
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleFileChange}
              multiple // Allow multiple file selection
            />
            <button
              type="button"
              className="post_button"
              onClick={handleUploadImage}
            >
              Upload Image
            </button>
          </div>

          <div className="image-upload-progress">
            {files.map((file, index) => (
              <div key={index} className="progress-item">
                <p>{file.name}</p>
                {imageUploadProgress[index] !== null && (
                  <progress value={imageUploadProgress[index]} max="100">
                    {imageUploadProgress[index]}%
                  </progress>
                )}
                {imageUploadError[index] && (
                  <p className="error-message">{imageUploadError[index]}</p>
                )}
              </div>
            ))}
          </div>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <button type="submit" className="post_button" disabled={isUploading}>Create Collection</button>
          <button type="reset" className="post_button">Reset</button>
        </form>
      </div>
    </div>
  );
}
