<script setup>
import { onMounted, ref } from 'vue'
import { useContentStore } from '@/stores/content'
import SuspenseDots from '@/assets/suspense.gif'
const contentStore = useContentStore()
const pageLoaded = ref(false)

onMounted(async () => {
  await contentStore.loadResumePageContent()
  pageLoaded.value = true
})
</script>
<template>
   <transition name="fade">
  <div v-if="pageLoaded">
  <div class="ResumeView">
    <h1>{{ contentStore.getResumePageContent?.pageTitle }}</h1>
    <embed :src="contentStore.getResumePageContent?.resumePdf" type="application/pdf" width="100%" height="600px" class="PDFViewer" />
   <div class="ResumeLinkContainer">
    <a @click="$router.go(-1)" class="ResumeLink" >{{ contentStore.getResumePageContent?.buttonText }}</a>
   </div>
  </div>
  </div>
  <div class="suspenseLoading" v-else>
    <img :src="SuspenseDots"/>
  </div>
  </transition>
</template>
 <style>
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
 h1 {
  font-size: 3rem;
  font-weight: 500;
 }

 .ResumeLink {
  text-decoration: none;
    font-size: 1em;
    background-color: #1c87c9;
    border: none;
    color: white;
    padding: 1.25em 2.125em;
    margin: .25em .125em;
    border-radius: 5em;
    cursor: pointer;
    transition: all 0.5s;
 }

 .ResumeLinkContainer {
  padding-bottom: 5rem;
 }
 .PDFViewer {
  padding-bottom: 5rem;
 }

 .ResumeLink:hover {
    background-color: #0e6aa4;
}
</style>
