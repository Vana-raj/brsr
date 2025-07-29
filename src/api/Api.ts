import axios from 'axios';

const BASE_URL = 'http://192.168.2.27:1000';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;


export const backend_endpoint = "/data.json"
export const json_url = "/data.json"

export const endpoint = "https://aeiforo.onrender.com/"