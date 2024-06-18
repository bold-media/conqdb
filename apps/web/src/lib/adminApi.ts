import "server-only";
import axios from "axios";

export const adminApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    "x-api-key": process.env.ADMIN_API_KEY,
  },
});
