<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  linkData: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
   <div class="projectButtons">
        <div v-for="(link, index) in props.linkData" :key="index"  class="linkContainer">
          <a :href="link?.URL" class="linkContent">
            <img :src="link?.imgSrc ?? ''" class="linkImage"/>
            <span class="linkText">{{ link?.text  }}</span>
            </a>
        </div>
      </div>
</template>

<style>
.projectButtons {
    @media screen and (max-width: 800px) {
        flex-direction: column;
        gap: 1rem;
        align-content: center;
        flex-wrap: wrap;
  }
    display: flex;
    flex-direction: row;
    gap: 2rem;
    justify-content: center;
}
.linkContent {
    text-decoration: none;
    font-size: 1em;
    background-color: #1c87c9;
    border: none;
    color: white;
    padding: 1.25em 2.125em;
    display: flex;
    flex-direction: row;
    margin: .25em .125em;
    border-radius: 5em;
    cursor: pointer;
    transition: all 0.5s;
      }
.linkContent:hover {
    background-color: #0e6aa4;
}
.linkContainer {
    height: auto;
    width: 14em;
}

.linkImage {
    height: auto;
    max-width: 1.5em;
    flex-grow: 0;
}

.linkText {
    flex-grow: 1;
    align-self: center;
    padding-left: 0.5em;
}
</style>
