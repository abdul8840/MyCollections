import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import app from "../firebase";

export default function EditPost() {
  const { id } = useParams();
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
    // images: ''
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/country/get/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.error('Error fetching post:', error.message);
      }
    };

    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Please select an image");
        return;
      }
      setImageUploadError(null);

      const storage = getStorage(app);
      const fileName = new Date().getTime() + '-' + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError('Image upload failed');
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              setImageUploadProgress(null);
              setImageUploadError(null);
              setFormData({ ...formData, image: downloadURL }); // Update image URL in formData
            })
            .catch((error) => {
              setImageUploadError('Failed to get download URL');
              console.error('Error getting download URL:', error);
            });
        }
      );

    } catch (error) {
      setImageUploadError('Image upload failed');
      setImageUploadProgress(null);
      console.error('Error uploading image:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.country || !formData.capital || !formData.currency || !formData.language || !formData.currency_code || !formData.region || !formData.isd_code || !formData.monetary || !formData.land || !formData.banknote || !formData.coin || !formData.island) {
      return setErrorMessage("Please fill in all fields");
    }

    try {
      const response = await fetch(`/api/country/edit/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error updating post:', error.message);
    }
  };

  return (
    <div className="container">
      <h1 className="main_heading">Edit Post</h1>
      <div className="row">
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            placeholder="Country"
            id="country"
            value={formData.country}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Capital"
            id="capital"
            value={formData.capital}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Currency"
            id="currency"
            value={formData.currency}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Language"
            id="language"
            value={formData.language}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Currency Code"
            id="currency_code"
            value={formData.currency_code}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Region"
            id="region"
            value={formData.region}
            onChange={handleChange}
          />

          <input
            type="text"
            placeholder="Isd Code"
            id="isd_code"
            value={formData.isd_code}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Land Area"
            id="land"
            value={formData.land}
            onChange={handleChange}
          />

          <input
            type="text"
            placeholder="Monetary System"
            id="monetary"
            value={formData.monetary}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Banknote"
            id="banknote"
            value={formData.banknote}
            onChange={handleChange}
          />

          <input
            type="text"
            placeholder="Coin"
            id="coin"
            value={formData.coin}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Island"
            id="island"
            value={formData.island}
            onChange={handleChange}
          />

          {/* <div className="upload-file">
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <button
              type="button"
              className="post_button"
              onClick={handleUploadImage}
            >
              Upload Image
            </button>
          </div> */}

          {imageUploadProgress && <p>Upload Progress: {imageUploadProgress}%</p>}
          {imageUploadError && <p className="error">{imageUploadError}</p>}

          <button type="submit" className="post_button">
            Update Post
          </button>
        </form>
      </div>
    </div>
  );
}
