import { defineStore } from 'pinia'
import axios from 'axios'

export const useContentStore = defineStore('content', {
  state: () => ({
    carourselSlides: [],
    navBarLinks: [],
    footerContent: {},
    footerLinks: [],
    mainPageButtons: [],
    mainPageContent: {}
  }),
  getters: {
    getCarouselSlides (state) {
      return state.carourselSlides
    },
    getNavBarLinks (state) {
      const sortedLinks = []
      state.navBarLinks.forEach(element => {
        const idx = element?.linkOrder
        sortedLinks[idx] = element
      })
      return sortedLinks
    },
    getFooterContent (state) {
      return state.footerContent
    },
    getFooterLinks (state) {
      return state.footerLinks
    },
    getMainPageButtons (state) {
      return state.mainPageButtons
    },
    getMainPageContent (state) {
      return state.mainPageContent
    }
  },
  actions: {
    async loadMainPage () {
      await this.loadCarouselSlides()
      await this.loadFooter()
      await this.loadNavBar()
      await this.loadMainPageButtons()
      await this.loadMainPageContent()
    },
    async requestPayload (entryID) {
      try {
        const url = `https://cdn.contentful.com/spaces/${process.env.VUE_APP_API_SPACE_ID}/environments/master/entries?sys.id=${entryID}&access_token=${process.env.VUE_APP_API_ACCESS_TOKEN}&include=${process.env.VUE_APP_API_RQST_NESTING}`
        const resp = await axios.get(url)
        return resp.data
      } catch (error) {
        console.log(error)
      }
    },
    async loadCarouselSlides () {
      this.carourselSlides = []
      const payload = await this.requestPayload(process.env.VUE_APP_API_CAROUSEL_ID)
      const apiData = payload?.includes
      // loop through payload and populate the carouselSlide array
      for (let i = 0; i < apiData?.Entry.length; i++) {
        this.carourselSlides.push(this.resolveContentAssetLinks(apiData?.Entry[i]?.fields, apiData))
      }
    },

    async loadNavBar () {
      this.navBarLinks = []
      const payload = await this.requestPayload(process.env.VUE_APP_API_NAVBAR_ID)
      const apiData = payload?.includes
      apiData?.Entry.forEach((link) => {
        this.navBarLinks.push(link?.fields)
      })
    },

    async loadFooter () {
      this.footerContent = {}
      this.footerLinks = []
      const payload = await this.requestPayload(process.env.VUE_APP_API_FOOTER_ID)
      const apiData = payload?.includes
      for (let i = 0; i < apiData?.Entry?.length; i++) {
        // case to extract the footer text
        if (apiData?.Entry[i]?.fields?.title === 'Footer Content') {
          this.footerContent = apiData?.Entry[i]?.fields
        } else {
          // this represents a link
          this.footerLinks.push(this.resolveContentAssetLinks(apiData?.Entry[i]?.fields, apiData))
        }
      }
    },

    async loadMainPageButtons () {
      this.mainPageButtons = []
      const payload = await this.requestPayload(process.env.VUE_APP_API_MAINPAGEBUTTONS_ID)
      const apiData = payload?.includes
      for (let i = 0; i < apiData?.Entry?.length; i++) {
        this.mainPageButtons.push(this.resolveContentAssetLinks(apiData?.Entry[i]?.fields, apiData))
      }
    },

    async loadMainPageContent () {
      this.mainPageContent = {}
      const apiData = await this.requestPayload(process.env.VUE_APP_API_MAINPAGECONTENT_ID)
      const content = apiData?.items[0].fields
      const assets = apiData?.includes
      this.mainPageContent = this.resolveContentAssetLinks(content, assets)
    },

    resolveContentAssetLinks (content, assets) {
      Object.keys(content).forEach((key) => {
        if (content[key]?.sys) {
          content[key] = this.findAssetURL(content[key]?.sys?.id, assets)
        }
      })
      return content
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
