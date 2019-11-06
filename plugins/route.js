export default ({ app }) => {
  app.router.beforeEach((to, from, next) => {
    // console.log(from.fullPath)
    // console.log(to.fullPath)
    app.store.dispatch("route/set", from.fullPath)

    next()
  })
}
