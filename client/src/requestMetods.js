import axios from "axios";
const BASE_URL = "http://localhost:5000/";
//const BASE_URL = "https://etiktakpizza.herokuapp.com/";
const TOKEN = localStorage.getItem("accessToken");

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { Authorization: "Bearer " + TOKEN },
});
