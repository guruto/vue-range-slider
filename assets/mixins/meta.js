export default {
  head() {
    let baseTitle = "PAGEFUL[ペイジフル]"
    const baseDesc = ""

    const head = { meta: [] }

    if (!this.meta) {
      this.meta = {}
    }

    const noindexPathName = [
      "dashboard",
      "user-sign_up_email_sent",
      "user-verify_email-code",
      "user-reset_password-code",
      "dashboard-setting-design",
      "dashboard-setting-email",
      "dashboard-setting-notification",
      "dashboard-setting-page",
      "dashboard-setting-password",
      "dashboard-setting-profile",
      "dashboard-setting-social",
      "dashboard-post-manage",
      "dashboard-post-add",
      "dashboard-post-edit-label",
      "member-profile",
      "member-setting",
      "member-info-term",
      "member-info-transaction_law"
    ]
    const routeName = this.$route.name.replace("___ja", "")
    if (noindexPathName.indexOf(routeName) >= 0) {
      head.meta.push({
        hid: "ROBOTS",
        name: "ROBOTS",
        content: "NOINDEX,NOFOLLOW,NOARCHIVE"
      })
    }

    // ユーザーページのタイトルをbaseTitleにする
    if (this.meta.userPageTitle) {
      baseTitle = this.meta.userPageTitle
    }

    // site_name設定
    head.meta.push({
      hid: "og:site_name",
      property: "og:site_name",
      content: baseTitle
    })

    // タイトル
    let title = ""
    if (this.meta.title) {
      title =
        this.meta.notUseBaseTitle === true
          ? `${this.meta.title}`
          : `${this.meta.title} - ${baseTitle}`
    } else {
      title = baseTitle
    }
    head.title = title
    const ogTitle = this.meta.ogTitle ? this.meta.ogTitle : title
    head.meta.push({ hid: "og:title", property: "og:title", content: ogTitle })
    const twitterTitle = this.meta.twitterTitle ? this.meta.twitterTitle : title
    head.meta.push({
      hid: "twitter:title",
      property: "twitter:title",
      content: twitterTitle
    })

    // ディスクリプション
    let description = ""
    if (this.meta.description) {
      description = this.meta.description
    } else if (!this.meta.description && this.meta.title) {
      description = `${baseTitle}の${this.meta.title}です。${baseDesc}`
    }
    head.meta.push({
      hid: "description",
      name: "description",
      content: description
    })
    const ogDescription = this.meta.ogDescription
      ? this.meta.ogDescription
      : description
    head.meta.push({
      hid: "og:description",
      property: "og:description",
      content: ogDescription
    })
    const twitterDescription = this.meta.twitterDescription
      ? this.meta.twitterDescription
      : description
    head.meta.push({
      hid: "twitter:description",
      property: "twitter:description",
      content: twitterDescription
    })

    // ページタイプ
    let type = this.meta.type ? this.meta.type : "website"
    head.meta.push({ hid: "og:type", property: "og:type", content: type })

    // ページURL
    let url = ""
    if (this.meta.url) {
      url = this.meta.url
    } else {
      // const url = (this.meta.hasOwnProperty('subDomainForUrl')) ? this.$getUrl(this.$route.path, this.meta.subDomainForUrl) : this.$getUrl(this.$route.path)
      url = `${process.env.BASE_URL}${this.$route.path}`
      if (
        this.meta.hasOwnProperty("subDomainForUrl") &&
        this.meta.subDomainForUrl
      ) {
        url = `${process.env.BASE_SCHEME}://${this.meta.subDomainForUrl}.${process.env.BASE_DOMAIN}${this.$route.path}`
      }
    }
    head.meta.push({ hid: "og:url", property: "og:url", content: url })

    // OGP画像URL
    if (this.meta.image) {
      head.meta.push({
        hid: "og:image",
        property: "og:image",
        content: this.meta.image
      })
      head.meta.push({
        hid: "twitter:image:src",
        property: "twitter:image:src",
        content: this.meta.image
      })
    } else {
      // TODO
      head.meta.push({
        hid: "og:image",
        property: "og:image",
        content: "https://pageful.app/img/meta/ogp.png"
      })
    }

    // twitter OGP画像のサイズ
    const twitterCardType = this.meta.isTwitterCardLarge
      ? "summary_large_image"
      : "summary"
    head.meta.push({
      hid: "twitter:card",
      property: "twitter:card",
      content: twitterCardType
    })

    // TODO:: image altの付与

    return head
  }
}
