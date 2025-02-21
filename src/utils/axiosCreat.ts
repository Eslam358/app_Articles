import axios from "axios"

// export const BASE_URL = "http://localhost:3000" locale
export const BASE_URL = "https://app-articles.vercel.app"


export default axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
})