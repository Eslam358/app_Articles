import axios from "axios"

// export const BASE_URL = "http://localhost:3000" locale
export const BASE_URL = "https://app-articles-jbhb2r6i2-eslams-projects-a656fcfb.vercel.app"

export default axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
})