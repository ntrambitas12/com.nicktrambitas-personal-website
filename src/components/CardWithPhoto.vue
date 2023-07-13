<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  image: {
    type: String,
    default: () => ''
  },
  content: {
    type: String,
    default: () => {}
  }
})
</script>

<template>
        <div class="cardWithPhotoContainer">
          <div class="left">
              <img :src="props.image" alt="Nick_T" class="bioImage">
          </div>
          <div class="right">
            <p class="bioContent">{{ props.content ?? 'Error in loading content' }}</p>
          </div>
</div>
</template>

<style scoped>
.cardWithPhotoContainer {
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 800px){
    flex-direction: column;
  }
  flex-direction: row;
}
.left {
  /* width: 50em;
  height: 50em; */
  display: flex;
  flex-grow: 0;
  justify-content: center;
  align-items: center;
}
.right {
  /* width: 50em;
  height: 50em; */
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
}

.bioImage {
  @media screen and (max-width: 800px){
    width: 55%;
    height: 55%;
    display: block;
  }
  width: 80%;
  height: 80%;
  object-fit: cover; /* Adjust as needed */
  border-radius: 2%; /* Create rounded edges */
  transition: transform 0.3s ease;
}

.bioImage:hover {
  z-index: 1;
  transform: translateY(-1px);
}

.bioContent {
  @media screen and (max-width: 1090px){
    font-size: 1.2rem;
    padding-top: 2rem;
  }

  @media screen and (min-width: 800px) and (max-width: 1090px){
    font-size: 1.1rem;
    padding-top: 2rem;
  }

  @media screen and (max-width: 800px){
    font-size: 0.95rem;
    padding-top: 2rem;
    padding-right: 0;
    width: 70%;
  }

  /* display: block; */
  object-fit: cover;
  padding-right: 5em;
  text-align: center;
  font-size: 1.4rem;
}

</style>
