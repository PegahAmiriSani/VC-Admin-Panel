import axios from "axios";

const instance = axios.create({
  baseURL: "http://192.168.112.48:8081",
});

//errors from back with interceptor
export default instance;
