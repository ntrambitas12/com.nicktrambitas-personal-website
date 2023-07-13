<script setup>
// @ is an alias to /src
import NavBar from '@/components/NavBar.vue'
import WelcomeCard from '@/components/HeadingSubheadingCard.vue'
import CardWithPhoto from '@/components/CardWithPhoto.vue'
import CarouselSlider from '@/components/CarouselSlider.vue'
import ProjectSubLinks from '@/components/ProjectSubLinks.vue'
import FooterCard from '@/components/FooterCard.vue'
import { ref, onMounted, onBeforeMount } from 'vue'

import 'vue3-carousel/dist/carousel.css'
import { useContentStore } from '@/stores/content'

const welcomeCardData = ref(null)
const welcomeCardImage = ref(null)
const aboutMe = ref(null)
const bioContent = ref(null)
const bioPic = ref(null)
const projectsHeading = ref(null)
const projectsDescription = ref(null)
const projectSlides = ref(null)
const stickyPoint = ref(0)
const aboutMeRef = ref(null)
const navBarLinks = ref(null)
const footerContent = ref(null)
const mainPageButtons = ref(null)
const footerLinks = ref(null)
const preventScroll = ref(false)

onMounted(() => {
  stickyPoint.value = aboutMeRef.value.offsetTop
})

onBeforeMount(() => {
  loadContent()
})

async function loadContent () {
  const contentStore = useContentStore()
  await contentStore.loadMainPage()
  const mainPageContent = contentStore.getMainPageContent
  welcomeCardData.value = { name: mainPageContent?.mainPageHeading, subheading: mainPageContent?.mainPageSubheading }
  welcomeCardImage.value = mainPageContent?.mainPageWelcomeCardPhoto
  aboutMe.value = mainPageContent?.aboutMeHeading
  bioContent.value = mainPageContent?.aboutMeText
  bioPic.value = mainPageContent?.aboutMePhoto
  projectsHeading.value = mainPageContent?.myExperiencesHeading
  projectsDescription.value = mainPageContent?.myExperiencesText
  navBarLinks.value = contentStore.getNavBarLinks
  footerContent.value = contentStore.getFooterContent
  footerLinks.value = contentStore.getFooterLinks
  mainPageButtons.value = contentStore.getMainPageButtons
  projectSlides.value = contentStore.getCarouselSlides
}

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

    <NavBar :links="navBarLinks" :navbar-sticky-point="stickyPoint.value" @toggle-scroll="toggleScrolling()" />
    <div id="home">
      <WelcomeCard :image="welcomeCardImage" :content="welcomeCardData" />
      <div ref="aboutMeRef" class="aboutMe" id="aboutMe">
        <h1 class="aboutMeHeading">{{ aboutMe }}</h1>
        <CardWithPhoto :image="bioPic" :content="bioContent" />
      </div>
      <div class="projects">
        <h1 class="projectHeader">{{ projectsHeading }}</h1>
        <p class="projectDescription">{{ projectsDescription }}</p>
        <CarouselSlider :carousel-content="projectSlides" />
        <ProjectSubLinks :link-data="mainPageButtons" />
      </div>
      <div class="footer">
        <FooterCard :content="footerContent" :links="footerLinks" />
      </div>
    </div>
</template>

<style lang="scss">
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
