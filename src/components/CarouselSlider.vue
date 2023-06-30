<script setup>
import { defineProps, onMounted, ref, computed } from 'vue'
import { Carousel, Slide, Navigation } from 'vue3-carousel'

const props = defineProps({
  carouselContent: {
    type: Array,
    default: () => []
  }
})

const screenSize = ref(0)

const setScreenSize = () => {
  screenSize.value = window.innerWidth
}

onMounted(() => {
  // To get scroll data and react to a scroll event, add a listener
  window.addEventListener('resize', setScreenSize)
  setScreenSize()
})

const shouldShowNav = computed(() => {
  return screenSize.value > 800
}
)

</script>

<template>
  <div class="Carousel">
        <Carousel :wrap-around="true">
          <Slide v-for="slide in props?.carouselContent" :key="slide">
          <div class="carousel__item">
            <a :href="slide?.imgLink" class="carousel__link">
              <img :src="slide?.img" alt="Slide Image" class="carousel__image">
            </a>
            <div class="carousel__content">
              <h4 class="carousel__title">{{ slide?.heading }}</h4>
              <p class="carousel__description">{{ slide?.content }}</p>
            </div>
          </div>
          </Slide>

          <template #addons>
            <Navigation v-if="shouldShowNav" />
           </template>
          </Carousel>
  </div>
</template>

<style>

.carousel__content {
    flex-grow: 1;
    @media screen and (max-width: 500px) {
    display: flex;
    flex-direction: column;
  }
}
.carousel__item {

    @media screen and (min-width: 500px) and (max-width: 800px) {
    flex-direction: column;
    gap: 2rem;
    padding: 0rem 4rem 4.5rem 4rem;
  }

  @media screen and (min-width: 330px) and (max-width: 500px) {
    flex-direction: column;
    gap: 2rem;
    padding: 0rem 3.5rem 7rem 3.5rem;
  }

  @media screen and (max-width: 330px) {
    flex-direction: column;
    gap: 2rem;
    padding: 0rem 3.5rem 10rem 3.5rem;
  }

    width: 90%;
    height: 80%;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 3.2rem 5.8rem 3.2rem 6.5rem;
    gap: 8.6rem;
    background-color: #1971c2;
    border-radius: 9px;
}

.carousel__link {
    @media screen and (min-width: 1330px) {
    height: 140%;
    width: 12%;
  }

  @media screen and (min-width: 1125px) and (max-width: 1330px) {
    height: 135%;
    width: 14%;
  }

  @media screen and (min-width: 950px) and (max-width: 1125px) {
    height: 130%;
    width: 17%;
  }

  @media screen and (min-width: 800px) and (max-width: 950px) {
    height: 120%;
    width: 25%;
  }

  @media screen and (min-width: 400px) and (max-width: 800px) {
    height: 40%;
    width: 25%;
  }

  @media screen and (min-width: 280px) and (max-width: 400px) {
    height: 40%;
    width: 50%;
  }

  @media screen and (max-width: 280px) {
    height: 35%;
    width: 60%;
  }

    height: 170%;
    width: 12%;
    flex-shrink: 0;
    display: inline-block;
    overflow: hidden;
    border-radius: 9px;
    scale: 1.5;
    border: 2px solid #333;
    transition: all 0.4s;
}
.carousel__image {
    height: 100%;
    width: 100%;
    object-fit: cover;
    overflow: hidden;
    object-position: center;
  }

.carousel__link:hover {
  transform: translateY(-2px);
}

.carousel__description {
    @media screen and (max-width: 500px) {
    font-size: .95em;
    line-height: 1.3;
  }
    font-size: 1em;
    line-height: 1.6;
    color: #fff;
    padding-bottom: 1em;
}

.carousel__title {
    @media screen and (max-width: 500px) {
    font-size: 1.3em;
  }
    color: #fff;
    font-size: 1.9em;
    font-weight: 600;
    margin-bottom: 0.8rem;
}
</style>
