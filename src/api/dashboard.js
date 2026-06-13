
import axios from "axios"

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
})

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export const getCurrentUser = async () => {
  const response = await API.get("/user/me")
  return response.data
}

export const getPreferences = async () => {
  const response = await API.get("/preferences/me")
  return response.data
}

export const getAnimeRecommendations = async () => {
  const response = await API.get("/recommend/anime")
  return response.data
}

export const getMusicRecommendations = async () => {
  const response = await API.get("/recommend/music")
  return response.data
}
