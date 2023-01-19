import axios from "axios";

export const api = axios.create({
  baseURL: "http://www.drdhn-dl.cerist.dz/api",
  headers: {
    "Content-Type": "application/json",
  },
});
