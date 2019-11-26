import axios from "axios"

const apiFromPixabay = axios.create({
  baseURL: process.env.API_PIXABAY_URL,
  responseType: "json"
})

apiFromPixabay.interceptors.response.use(
  response => {
    console.log("api response")
    console.log(response.data)
    if (response.data) {
      return Promise.resolve({
        is_error: false,
        data: response.data,
        success_message: ""
      })
    } else {
      return Promise.resolve({
        is_error: true,
        error_title: "通信エラー",
        error_description: "通信にエラーが発生しました。",
        error: "不正なリクエスト"
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

function apiGet(params) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      accept: "application/json"
    }
  }
  return apiFromPixabay.request(params)
}

export default {
  getList(params = "") {
    const _params = params ? `&per_page=50&q=${params}` : `&per_page=50`
    return apiGet("?key=" + process.env.PIXABAY_KEY + _params)
  }
}
