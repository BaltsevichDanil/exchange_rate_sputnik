import axios from 'axios'

export const API_URL = 'https://api.apilayer.com/exchangerates_data'

const API_KEY = process.env.REACT_APP_EXCHANGER_RATES_API_KEY || ''

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    apikey: API_KEY
  }
})

export default axiosInstance
