import Vue from "vue"

export const getUrl = function(path = "", subDomain = "") {
  let url = `${process.env.BASE_URL}${path}`
  if (subDomain) {
    url = `${process.env.BASE_SCHEME}://${subDomain}.${process.env.BASE_DOMAIN}${path}`
  }

  return url
}

Vue.prototype.$getUrl = getUrl
