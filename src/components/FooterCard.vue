<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  content: {
    type: Object,
    default: () => {}
  },
  links: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
    <div class="footerCard">
        <h1>{{ props.content.heading}}</h1>
        <h3> {{ props.content.subheading }}</h3>
        <ul class="footerList">
            <li v-for="(link, index) in props.links" :key="index">
               <a :href="link?.URL" class="footerElements">
                <img :src="link?.imgSrc ?? ''" class="linkImage"/>
                <span class="linkText">{{ link?.content }}</span>
               </a>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.footerCard {
    margin-top: 1.5rem;
    flex-direction: column;
    display: flex;
    background-color: aquamarine;
}

.footerList {
    display: flex;
    flex-direction: row;
    list-style-type: none;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1.5rem;
    padding-inline-start: 0;

    @media screen and (min-width: 800px){
        gap: 2.5rem;
        }
}

.footerElements {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-wrap: wrap;
    text-decoration: none;
    transition: all 0.5s;
}

.linkImage {
    flex-grow: 0;
    align-self: center;
    transition: all 0.5s;
}

.footerElements:hover {
    transform: scale(1.1);
}

.linkText {
    flex-grow: 1;
    align-self: center;
}

</style>
