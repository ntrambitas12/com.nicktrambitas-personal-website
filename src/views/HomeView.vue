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
// Image imports
import BackgroundImage from '@/assets/background.jpg'
import BioPic from '@/assets/bioPic.jpg'
import MyVoltControl from '@/assets/cadillac.jpg'
import GithubIcon from '@/assets/github.png'
import ResumeIcon from '@/assets/resume.png'

const content = { name: 'Nicholas Trâmbițaș', subheading: 'Computer Scientist & Engineer' }
const aboutMe = 'About Me'
const bioContent = 'Hi! My name is Nick Trambitas. I am an avid software enginner with a passion for cars and planes. From a young age, I`ve had a passion for technology and coding. I enjoy learning about how the world works.'
const projectSlides = [{ content: 'A simple C# program that allows a user to test a bunch of stuff. This is still a work inn progress but were getting close. This is some sample long text to test for formatting. Good night and sweet dreams', img: MyVoltControl, heading: 'MyVoltControl', imgLink: 'https://www.cadillac.com' }, { content: 'A simple C# program that allows a user to test a bunch of stuff. This is still a work inn progress but were getting close. Good night and sweet dreams', img: MyVoltControl, heading: 'MyVoltControl', imgLink: 'https://www.cadillac.com' }]
const projects = 'My Experiences'
const stickyPoint = ref(0)
const aboutMeRef = ref(null)
const links = [{ path: '', hash: '#home', text: 'Home Page' }, { path: '', hash: '#aboutMe', text: 'About Me' }, { path: '', hash: '#projects', text: 'Project Stuff' }]
const linkData = [{ URL: 'https://www.github.com', text: 'My GitHub', imgSrc: GithubIcon }, { URL: '/resume', text: 'View Resume', imgSrc: ResumeIcon }]
const footerContent = { heading: 'Let\'s keep in touch', subheading: 'Feel free to reach out to me in any of the ways below!' }
const footerLinks = [{ imgSrc: GithubIcon, content: 'Instagram', URL: 'https://www.instagram.com' }, { imgSrc: GithubIcon, content: 'Snapchat', URL: 'https://www.instagram.com' }, { imgSrc: GithubIcon, content: 'Whatsapp', URL: 'https://www.instagram.com' }, { imgSrc: GithubIcon, content: 'Facebook', URL: 'https://www.instagram.com' }]
const preventScroll = ref(false)
const contentStore = useContentStore()

onMounted(() => {
  stickyPoint.value = aboutMeRef.value.offsetTop
})

onBeforeMount(() => {
  contentStore.loadMainPage()
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
  <NavBar :links="links"
          :navbar-sticky-point="stickyPoint.value"
           @toggle-scroll="toggleScrolling()"/>
<div id="home">
    <WelcomeCard :image="BackgroundImage"
                 :content="content"/>
  <div ref="aboutMeRef" class="aboutMe" id="aboutMe">
      <h1 class="aboutMeHeading">{{ aboutMe }}</h1>
      <CardWithPhoto  :image="BioPic"
                      :content="bioContent"/>
  </div>
  <div class="projects">
      <h1 class="projectHeader">{{ projects }}</h1>
      <p class="projectDescription">Below, you will find a collection of some of my favorite projects that I've worked on both professionally and for fun. My expeience ranges from developing full-fleged applications in VueJS, C#, and Java to writing embedded software in C for Aerospace and Automotive applications. I also have a strong background in CANBUS and diagnosing Automotive electronics and networks/ </p>
      <CarouselSlider :carousel-content="projectSlides"/>
      <ProjectSubLinks :link-data="linkData"/>
  </div>
  <div class="footer">
    <FooterCard :content="footerContent"
                :links="footerLinks"  />
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

.projectHeader {
  padding-bottom: 0.5em;
}

.projects {
  display: flex;
  flex-direction: column;
}

.projectDescription {
  width: 65%;
  align-self: center;
}

</style>
