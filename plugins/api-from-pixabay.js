import axios from "axios"
import * as qs from "qs"

const apiFromPixabay = axios.create({
  baseURL: process.env.API_PIXABAY_URL+process.env.PIXABAY_KEY,
  responseType: "json"
})

apiFromPixabay.interceptors.request.use(request => {
  console.log("apiFromPixabay request: " + process.env.API_PIXABAY_URL+process.env.PIXABAY_KEY+request.url)
  return request
})

apiFromPixabay.interceptors.response.use(
  response => {
    console.log("api response")
    console.log(response.data)
    if (response.data) {
      return Promise.resolve({
        is_error: false,
        data: response.data,
        success_message: ''
      })
    } else {
      return Promise.resolve({
        is_error: true,
        error_title: "通信エラー",
        error_description: "通信にエラーが発生しました。",
        error: error
      })
    }
  },
  error => {
    return Promise.resolve({
      is_error: true,
      error_title: "通信エラー",
      error_description: "通信にエラーが発生しました。",
      error: error
    })
  }
)

function apiGet(params = '') {
  const config = {
    headers: {
      "Content-Type": "application/json",
      accept: "application/json"
    },
    data: {}
  }
  return params ? apiFromPixabay.request(`&per_page=50&q=${params}`) : apiFromPixabay.request(`&per_page=50`)
}


export default {
  getList(params = '') {
    return apiGet(params)
  },
}
