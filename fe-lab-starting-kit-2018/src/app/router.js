
/** Export Router to render pages with diffetent routes. */
export const Router = {

  /**
   * @function getUrl
   * Get Url of route.
   */
    getUrl() {
        return window.location.hash.slice(1)
    },

  /**
   * @function navigate
   * Navigate to route.
   * @param {String} hash - Hash of route.
   */
    navigate(hash) {
        window.location.hash = hash
    }
}