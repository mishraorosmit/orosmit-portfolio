import axios from 'axios'

const studioApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api/v1',
  headers: {
    'X-Studio-Key': import.meta.env.VITE_STUDIO_KEY || 'om-studio-key-2024'
  }
})

export default studioApi
