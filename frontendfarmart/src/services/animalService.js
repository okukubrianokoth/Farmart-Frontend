// src/services/animalService.js
import api from "./api";

export const animalService = {
  getAnimals,
  getAnimal,
  createAnimal,
  updateAnimal,
  deleteAnimal,
  getMyAnimals,
  getUploadSignature,
  uploadImageToCloudinary,
};

/**
 * Fetch all animals (optionally filtered)
 */
function getAnimals(filters = {}) {
  const params = new URLSearchParams();
  Object.keys(filters).forEach((key) => {
    const v = filters[key];
    if (v !== "" && v !== null && v !== undefined) params.append(key, v);
  });
  const query = params.toString();
  return api.get(`/animals${query ? `?${query}` : ""}`);
}

/**
 * Fetch single animal by ID
 */
function getAnimal(id) {
  return api.get(`/animals/${id}`);
}

/**
 * Create new animal entry (text fields only; image uploaded separately)
 */
function createAnimal(animalData) {
  return api.post("/animals", animalData);
}

/**
 * Update animal details
 */
function updateAnimal(id, animalData) {
  return api.put(`/animals/${id}`, animalData);
}

/**
 * Delete animal
 */
function deleteAnimal(id) {
  return api.delete(`/animals/${id}`);
}

/**
 * Get all animals for the logged-in farmer
 */
function getMyAnimals(filters = {}) {
  const params = new URLSearchParams();
  Object.keys(filters).forEach((key) => {
    const v = filters[key];
    if (v !== "" && v !== null && v !== undefined) params.append(key, v);
  });
  const query = params.toString();
  return api.get(`/animals/farmer/my-animals${query ? `?${query}` : ""}`);
}

/**
 * --- 🖼️ Cloudinary Upload Helpers ---
 * Step 1: Request signed upload credentials from backend
 */
async function getUploadSignature() {
  const res = await api.get("/uploads/sign");
  return res.data;
}

/**
 * Step 2: Upload image directly to Cloudinary using signed credentials
 */
async function uploadImageToCloudinary(file, signatureData) {
  const { timestamp, signature, api_key, cloud_name } = signatureData;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", api_key);
  formData.append("timestamp", timestamp);
  formData.append("signature", signature);

  const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;

  const response = await fetch(cloudinaryUrl, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Cloudinary upload failed");
  }

  const data = await response.json();
  return data.secure_url; // ✅ return the uploaded image URL
}
