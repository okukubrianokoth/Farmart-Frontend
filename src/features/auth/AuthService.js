import axios from "axios";

const API_URL = "https://your-flask-api.onrender.com/api/auth/";

const register = async (userData) => {
  const res = await axios.post(API_URL + "register", userData);
  return res.data;
};

const login = async (userData) => {
  const res = await axios.post(API_URL + "login", userData);
  return res.data;
};

export default { register, login };
