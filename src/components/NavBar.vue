<script setup>
import { defineProps, defineEmits, onMounted, ref } from 'vue'
import hamburgerIcon from '@/assets/nav-hamburger.png'
import closeIcon from '@/assets/nav-close.png'
const navClass = ref('navBar')
const isMobile = ref(false)
const isDrawerActive = ref(false)

const props = defineProps({
  links: {
    type: Array,
    default: () => []
  },
  navbarStickyPoint: {
    type: Number,
    default: () => 900
  }
})

const emit = defineEmits(['toggle-scroll'])

const handleScroll = () => {
  navClass.value = (window.scrollY - 100 >= props.navbarStickyPoint) ? 'navBar sticky' : 'navBar'
}

const handleResize = () => {
  // 850 px is the trigger to switch to mobile view
  const wasPreviouslyMobile = isMobile.value
  isMobile.value = (window.innerWidth <= 760)

  // handle case if drawer was opened and viewport goes back to desktop
  if (!isMobile.value && (wasPreviouslyMobile.value !== isMobile.value)) {
    if (isDrawerActive.value) {
      emit('toggle-scroll')
      isDrawerActive.value = false
    }
  }
}

const showMobileDrawer = () => {
  isDrawerActive.value = !isDrawerActive.value
  emit('toggle-scroll')
}

onMounted(() => {
  // To get scroll data and react to a scroll event, add a listener
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('resize', handleResize)
  handleResize()
  handleScroll()
})
</script>

<template>
    <nav v-if="!isDrawerActive" :class="navClass">
  <div class="nav__left">
   <img v-if="isMobile" class="navPic" :src="hamburgerIcon" alt="menu-rounded" @click="showMobileDrawer()"/>
  </div>
  <div class="nav__right">
    <ul v-if="!isMobile" class="navLinks">
       <li v-for="(link, index) in props.links" :key="index">
         <router-link :to="{path: link?.path ?? '', hash: link?.hash ?? ''}" class="link">{{ link?.text }}</router-link>
       </li>
    </ul>
  </div>
</nav>
<transition name="slide">
<div v-if="isDrawerActive" class="mobileDrawer">
    <div class="closeDrawer">
        <img class="navPic" :src="closeIcon" @click="showMobileDrawer()"/>
    </div>
    <ul class="mobileList">
       <li v-for="(link, index) in props.links" :key="index" class="mobileLinks">
         <router-link  @click="showMobileDrawer()" :to="{path: link?.path ?? '', hash: link?.hash ?? ''}" class="mobileLink" >{{ link?.text }}</router-link>
       </li>
    </ul>
</div>
</transition>
</template>

<style lang="scss">
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s;
}

.slide-leave-active,
.slide-leave-to {
  transform: translateX(-100%);
}

    .navBar {
    display: flex;
    flex-direction: row;
    background-color: #e30b0b4e;
    padding: 0.5rem;
    }
    .sticky {
     position: -webkit-sticky; /* Safari */
     position: sticky;
     top: 0;
     z-index: 9999;
    }

    .navLinks {
    display: flex;
    gap: 1rem;
    list-style-type: none;
    justify-content: flex-end;
    padding-top: 1.25em;
    padding-right: 4rem;
    }

    .link {
        @media screen and (max-width: 950px){
            font-size: 1.2em;
        }
    padding: 0.5em 1em 0.5em 1em;
    border-radius: 22%;
    font-size: 1.8em;
    text-align: center;
    font-weight: 500;
    text-decoration: none;
    color: white;
    transition: all 0.5s;
}
    .link:hover {
    color:rgba(255, 115, 115, 0.8705882353);
    background-color: white;
    }

    .navPic{
    scale: .5;
    cursor: pointer;
    }

    .nav__right {
    flex-grow: 1;
    }

    .nav__left {
    padding-top: 0.15em;
    flex-grow: 0;
    }

    .closeDrawer {
      z-index: 9999;
      position: absolute;
      height: 8rem;
    }

    .mobileDrawer {
     position: fixed;
     top: 0;
     left: 0;
     width: 100%;
     height: 100%;
     background-color: #f0f0f0ae;
     z-index: 1000000;
     display: flex;
     flex-direction: row;
    }

    .mobileList {
     flex-grow: 1;
     flex-direction: column;
     display: flex;
     gap: 2rem;
     list-style-type: none;
     justify-content: center;
     align-content: center;
     flex-wrap: wrap;
     padding-left: 0;
    }

    .mobileLink {
    text-decoration: none;
    @media screen and (min-width: 325px) and (max-width: 450px){
    font-size: 2rem;
    }
    @media screen and (min-width: 280px) and (max-width: 325px){
    font-size: 1.5rem;
    }
    @media screen and (min-width: 0px) and (max-width: 280px){
    font-size: 1rem;
    }
    font-size: 3rem;
    font-weight: 500;
    }

</style>
