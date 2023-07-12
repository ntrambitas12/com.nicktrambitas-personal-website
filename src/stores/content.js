import { defineStore } from 'pinia'
import axios from 'axios'

export const useContentStore = defineStore('content', {
  state: () => ({
    carourselSlides: [],
    navBarLinks: [],
    footerContent: {},
    footerLinks: [],
    mainPageButtons: []
  }),
  getters: {

  },
  actions: {
    async loadMainPage () {
      await this.loadCarouselSlides()
      await this.loadFooter()
      await this.loadNavBar()
      await this.loadMainPageButtons()
    },
    async requestPayload (entryID) {
      try {
        const url = `https://cdn.contentful.com/spaces/${process.env.VUE_APP_API_SPACE_ID}/environments/master/entries?sys.id=${entryID}&access_token=${process.env.VUE_APP_API_ACCESS_TOKEN}&include=${process.env.VUE_APP_API_RQST_NESTING}`
        const resp = await axios.get(url)
        return resp.data?.includes
      } catch (error) {
        console.log(error)
      }
    },
    async loadCarouselSlides () {
      const apiData = await this.requestPayload(process.env.VUE_APP_API_CAROUSEL_ID)

      // loop through payload and populate the carouselSlide array
      for (let i = 0; i < apiData?.Entry.length; i++) {
        this.carourselSlides.push({
          slideContent: apiData?.Entry[i]?.fields?.slideContent,
          slideHeading: apiData?.Entry[i]?.fields?.slideHeading,
          slideLink: apiData?.Entry[i]?.fields?.slideLink,
          slideImage: this.findAssetURL(apiData?.Entry[i]?.fields?.slideImage?.sys?.id, apiData)
        })
      }
    },

    async loadNavBar () {
      const apiData = await this.requestPayload(process.env.VUE_APP_API_NAVBAR_ID)

      apiData?.Entry.forEach((link) => {
        this.navBarLinks.push(link?.fields)
      })
    },

    async loadFooter () {
      const apiData = await this.requestPayload(process.env.VUE_APP_API_FOOTER_ID)

      for (let i = 0; i < apiData?.Entry?.length; i++) {
        // case to extract the footer text
        if (apiData?.Entry[i]?.fields?.title === 'Footer Content') {
          this.footerContent = apiData?.Entry[i]?.fields
        } else {
          // this represents a link
          this.footerLinks.push({
            image: this.findAssetURL(apiData?.Entry[i]?.fields?.image?.sys?.id, apiData),
            text: apiData?.Entry[i]?.fields?.text,
            url: apiData?.Entry[i]?.fields?.url
          })
        }
      }
    },

    async loadMainPageButtons () {
      const apiData = await this.requestPayload(process.env.VUE_APP_API_MAINPAGEBUTTONS_ID)

      for (let i = 0; i < apiData?.Entry?.length; i++) {
        this.mainPageButtons.push({
          image: this.findAssetURL(apiData?.Entry[i]?.fields?.image?.sys?.id, apiData),
          text: apiData?.Entry[i]?.fields?.text,
          url: apiData?.Entry[i]?.fields?.url
        })
      }
    },

    findAssetURL (assetID, payload) {
      let findResult = ''

      for (let i = 0; i < payload?.Asset.length; i++) {
        if (payload?.Asset[i]?.sys?.id === assetID) {
          findResult = `https:${payload?.Asset[i]?.fields?.file?.url}`
          break
        }
      }
      return findResult
    }
  }
})
