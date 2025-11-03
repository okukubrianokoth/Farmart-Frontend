// src/services/cloudinary.js
import axios from "axios";

export async function getSignature() {
  const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/uploads/sign`);
  return res.data;
}

export async function uploadToCloudinary(file) {
  const { timestamp, signature, api_key, cloud_name } = await getSignature();

  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", api_key);
  formData.append("timestamp", timestamp);
  formData.append("signature", signature);

  const uploadUrl = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;

  const res = await axios.post(uploadUrl, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data.secure_url; // image URL
}
