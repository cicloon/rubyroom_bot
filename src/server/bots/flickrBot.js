import { extend, sample, map } from "lodash"
import { get } from "request"

module.exports = (_app) => {

  class FlickrBot {
    constructor(responder) {
      this.name = "FlickrBot"
      this.apiCallUrl = "https://api.flickr.com/services/rest/"
      this.responder = responder
      this.qs = {
        method: "flickr.photos.search",
        api_key: process.env.FLICKR_KEY,
        format: "json",
        nojsoncallback: 1,
        sort: "relevance",
        privacy_filter: 1, // public
        content_type: 1, // photos only (no screenshots)
        media: "photos",
        extras: "url_z,url_n,url_m,url_l",
        per_page: 10
      }
    }

    perfomRequest(query, cb) {
      if (!query) return

      const qs = extend({text: query}, this.qs)
      const params = {json: true, url: this.apiCallUrl, qs: qs}
      get(params, (_e, _r, body) => body && cb(body))
    }

    onMessage(message) {

      if ( typeof this.qs.api_key !== "undefined") {
        message.hear(/^([\w\-]+)\.jpg$/, (match) => {
          const query = match[1].replace(/[-_+\s]+/g, " ").trim()
          this.perfomRequest(query, body => {
            const options = map(body.photos.photo, photo => photo.url_m)
            if (!options[0]) return
            message.send(`${query}: ${sample(options)}`)
          })
        })
      }

    }
  }

  return FlickrBot
}
