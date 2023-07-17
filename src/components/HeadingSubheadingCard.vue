<template>
  <div class="welcomeCard">
    <img class="image" :src="props.image" :style="zoomImage"/>
    <div class="Headings">
      <h1 class="Heading">{{ props.content?.name ?? 'Invalid Prop -- Check name property in object' }}</h1>
      <h2 class="Subheading">{{ props.content?.subheading ?? 'Invalid Prop -- Check subheading property in object' }}</h2>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps, onMounted, ref } from 'vue'

const props = defineProps({
  image: {
    type: String,
    default: () => ''
  },
  content: {
    type: Object,
    default: () => {}
  }
})
onMounted(() => {
  // To get scroll data and react to a scroll event, add a listener
  window.addEventListener('scroll', setScroll)
  window.addEventListener('resize', setHeight)
})
const scrollData = ref(0)
const screenHeight = ref(`${window.innerHeight}px`)

const setScroll = () => {
  scrollData.value = window.scrollY
}

const setHeight = () => {
  screenHeight.value = `${window.innerHeight}px`
}

const zoomImage = computed(() => {
  return `transform: scale(${(100 + (scrollData.value / 6)) / 100});`
}
)

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.welcomeCard {
  position: relative;
  overflow: hidden;
}
.Headings {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  transform: translate(-50%, -50%);
}
.Heading{
  margin: 0;
  @media screen and (min-width: 1090px){
    font-size: 7.4rem;
    padding-top: 10rem;

  }

  @media screen and (min-width: 850px) and (max-width: 1090px){
    font-size: 5.4rem;
    padding-top: 7rem;

  }

  @media screen and (min-width: 500px)  and (max-width: 650px){
    font-size: 3.6rem;

  }

  @media screen and (min-width: 280px) and (max-width: 500px){
    padding-top: 18.5rem;
    font-size: 3.7rem;

  }

  @media screen and (max-width: 280px){
    font-size: 2.8rem;

  }
  font-size: 4.5rem;
  line-height: 1.05;
  padding-top: 25rem;
  margin-bottom: 3.2rem;
  color: rgb(238, 242, 242);
}
.Subheading{
  @media screen and (min-width: 400px) and (max-width: 1090px) {
    font-size: 1.4rem;
  }

  @media screen and (min-width: 280px) and (max-width: 400px){

    font-size: 1.2rem;
}
  @media screen and (max-width: 280px){

    font-size: .9rem;
}

@media screen and (min-width: 1250px){
            padding-bottom: 32rem;
        }
  font-size: 2.4rem;
  padding-bottom: 35rem;
  letter-spacing: -0.25px;
  justify-content: center;
  align-items: center;
  color: rgb(255, 11, 11);
  overflow: hidden;
  margin: 0 auto; /* Gives that scrolling effect as the typing happens */
  white-space: nowrap;
  animation: typing 3.5s steps(40, end),
    }
  /* The typing effect */
@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

.image {
  width: 100%;
  object-fit: cover;
  object-position: top center;
  @media screen and (max-width: 760px){
  height: v-bind(screenHeight);
}
}

</style>
