import axios from "axios";
const API_URL = "https://your-flask-api.onrender.com/api/animals/";

const getAll = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export default { getAll };
