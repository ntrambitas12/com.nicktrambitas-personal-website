<script setup>
// @ is an alias to /src
import NavBar from '@/components/NavBar.vue'
import WelcomeCard from '@/components/HeadingSubheadingCard.vue'
import CardWithPhoto from '@/components/CardWithPhoto.vue'
import CarouselSlider from '@/components/CarouselSlider.vue'
import ProjectSubLinks from '@/components/ProjectSubLinks.vue'
import SuspenseDots from '@/assets/suspense.gif'
import FooterCard from '@/components/FooterCard.vue'
import { ref, onMounted } from 'vue'

import 'vue3-carousel/dist/carousel.css'

import { useContentStore } from '@/stores/content'
const contentStore = useContentStore()

const stickyPoint = ref(0)
const aboutMeRef = ref(null)
const preventScroll = ref(false)
const pageLoaded = ref(false)

onMounted(async () => {
  await contentStore.loadMainPage()
  pageLoaded.value = true
  stickyPoint.value = aboutMeRef?.value?.offsetTop
})

const toggleScrolling = () => {
  preventScroll.value = !preventScroll.value
  if (preventScroll.value) {
    document.body.classList.add('no-scroll')
  } else {
    document.body.classList.remove('no-scroll')
  }
}

</script>

<template>
  <transition name="fade">
  <div v-if="pageLoaded">
    <NavBar :links="contentStore.getNavBarLinks" :navbar-sticky-point="stickyPoint?.value" @toggle-scroll="toggleScrolling()" />
    <div id="home">
      <WelcomeCard :image="contentStore.getMainPageContent?.mainPageWelcomeCardPhoto"
      :content="{ name: contentStore.getMainPageContent?.mainPageHeading, subheading: contentStore.getMainPageContent?.mainPageSubheading }" />
      <div ref="aboutMeRef" class="aboutMe" id="aboutMe">
        <h1 class="aboutMeHeading">{{ contentStore.getMainPageContent?.aboutMeHeading }}</h1>
        <CardWithPhoto :image="contentStore.getMainPageContent?.aboutMePhoto"
         :content="contentStore.getMainPageContent?.aboutMeText" />
      </div>
      <div class="projects">
        <h1 class="projectHeader">{{ contentStore.getMainPageContent?.myExperiencesHeading }}</h1>
        <p class="projectDescription">{{ contentStore.getMainPageContent?.myExperiencesText }}</p>
        <CarouselSlider :carousel-content="contentStore.getCarouselSlides" />
        <ProjectSubLinks :link-data="contentStore.getMainPageButtons" />
      </div>
      <div class="footer">
        <FooterCard :content="contentStore.getFooterContent" :links="contentStore.getFooterLinks" />
      </div>
    </div>
  </div>
  <div class="suspenseLoading" v-else>
    <img :src="SuspenseDots"/>
  </div>
</transition>
</template>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.suspenseLoading {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.no-scroll {
  overflow: hidden;
}

.aboutMe {
  margin-top: 1.5rem;
}

.aboutMeHeading {
  margin-top: 1em;
  @media screen and (min-width: 800px) {
    margin-bottom: 0;
  }

  @media screen and (max-width: 400px) {
    font-size: 1.8em
  }

}

.projectHeader {
  @media screen and (max-width: 400px) {
    font-size: 1.8em
  }
  margin-bottom: 0.1em;
}

.projects {
  display: flex;
  flex-direction: column;
}

.projectDescription {
  width: 65%;
  font-size: 1.1rem;
  align-self: center;
  padding-bottom: 1em;
  @media screen and (max-width: 800px) {
    font-size: 0.95rem;
    width: 70%;
    padding-bottom: 0;
  }
}
</style>
