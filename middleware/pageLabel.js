export default function({ store, req }) {
  console.log("middleware pageLabel")

  let host = process.browser
    ? window.location.host.split(":")[0]
    : req.headers.host.split(":")[0]

  const environment = process.env.NODE_ENV
  let pageLabel = null
  const hostParts = host.split(".")

  if (environment == "production") {
    pageLabel = hostParts.length == 3 ? hostParts[0] : null
  } else if (environment == "staging") {
    // host: stg.xxxx.comなので
    pageLabel = hostParts.length == 4 ? hostParts[0] : null
  } else if (environment == "development") {
    // host: dev.xxxx.comなので
    pageLabel =
      hostParts.length == 4 || hostParts.length == 2 ? hostParts[0] : null
  }

  if (pageLabel) {
    // pageページ、post個別ページを表示
    console.log(pageLabel)
    store.dispatch("subDomain/set", { subDomain: pageLabel })
    store.dispatch("page/setLabel", { label: pageLabel })
  } else {
    store.dispatch("subDomain/clear")
  }
}
