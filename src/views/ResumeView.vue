<script setup>
// Static imports
import Resume from '@/assets/Hybrid-EV Controls.pdf'
</script>
<template>
  <div class="ResumeView">
    <h1>Resume</h1>
    <embed :src="Resume" type="application/pdf" width="100%" height="600px" class="PDFViewer" />
    <a @click="$router.go(-1)" class="ResumeLink" >Go Back</a>
  </div>
</template>
 <style>
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
    padding-bottom: 1rem;
 }

 .PDFViewer {
  padding-bottom: 5rem;
 }

 .ResumeLink:hover {
    background-color: #0e6aa4;
}
</style>
