// src/components/animals/AnimalForm.jsx
import React, { useState } from "react";
import { toast } from "react-toastify";
import "./animalForm.css";

const API_URL = process.env.REACT_APP_API_URL;
//const CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;

const AnimalForm = ({
  animalForm,
  setAnimalForm,
  editingAnimal,
  onSubmit,
  onCancel,
}) => {
  const [uploading, setUploading] = useState(false);

  // 🔒 Signed Cloudinary upload
  const handleImageUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("image", file);

  try {
    setUploading(true);
    const res = await fetch(`${API_URL}/upload`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (res.ok && data.image_url) {
      setAnimalForm({ ...animalForm, image_url: data.image_url });
      toast.success("Image uploaded successfully!");
    } else {
      toast.error(data.error || "Upload failed. Try again.");
    }
  } catch (err) {
    console.error(err);
    toast.error("Image upload failed.");
  } finally {
    setUploading(false);
  }
};
  return (
    <div className="animal-form-modal">
      <div className="modal-content">
        <h2>{editingAnimal ? "Edit Animal" : "Add New Animal"}</h2>
        <form onSubmit={onSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Animal Name *</label>
              <input
                type="text"
                value={animalForm.name}
                onChange={(e) =>
                  setAnimalForm({ ...animalForm, name: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label>Animal Type *</label>
              <select
                value={animalForm.animal_type}
                onChange={(e) =>
                  setAnimalForm({
                    ...animalForm,
                    animal_type: e.target.value,
                  })
                }
                required
              >
                <option value="cattle">Cattle</option>
                <option value="poultry">Poultry</option>
                <option value="swine">Swine</option>
                <option value="sheep">Sheep</option>
                <option value="goat">Goat</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Breed</label>
              <input
                type="text"
                value={animalForm.breed}
                onChange={(e) =>
                  setAnimalForm({ ...animalForm, breed: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>Age (months)</label>
              <input
                type="number"
                value={animalForm.age}
                onChange={(e) =>
                  setAnimalForm({ ...animalForm, age: e.target.value })
                }
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Weight (kg)</label>
              <input
                type="number"
                value={animalForm.weight}
                onChange={(e) =>
                  setAnimalForm({ ...animalForm, weight: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>Price (KES)</label>
              <input
                type="number"
                value={animalForm.price}
                onChange={(e) =>
                  setAnimalForm({ ...animalForm, price: e.target.value })
                }
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label>Quantity</label>
            <input
              type="number"
              value={animalForm.quantity}
              onChange={(e) =>
                setAnimalForm({ ...animalForm, quantity: e.target.value })
              }
              min="1"
            />
          </div>

          <div className="form-group">
            <label>Upload Image</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            {uploading && <p className="uploading">Uploading...</p>}
            {animalForm.image_url && (
              <img
                src={animalForm.image_url}
                alt="Animal preview"
                className="preview-image"
              />
            )}
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              rows="3"
              value={animalForm.description}
              onChange={(e) =>
                setAnimalForm({ ...animalForm, description: e.target.value })
              }
            ></textarea>
          </div>

          <div className="form-buttons">
            <button type="submit" className="btn btn-primary" disabled={uploading}>
              {editingAnimal ? "Update Animal" : "Add Animal"}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
              disabled={uploading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AnimalForm;
