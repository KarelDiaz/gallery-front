<script setup>
import { ref, onMounted } from 'vue'

import { usePicturesStore } from 'src/stores/pictures'
import BoxItems from 'components/BoxItems.vue'
import { storeToRefs } from 'pinia'

const picturesStore = usePicturesStore()
const { pictureIndex } = storeToRefs(picturesStore)
const space = ref(-5)
const inScreen = ref(false)
const img = ref(null)
const animationName = ref('fade')

const isElementInViewport = (el) => {
  const rect = el.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

const handlerShowFullscreen = () => {
  console.log('handlerShowFullscreen', prop.index);
  pictureIndex.value = prop.index
}

const prop = defineProps({
  index: {
    type: Number,
    required: true,
  },
  imagen: {
    type: String,
    required: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
})

const asignRandomAnimation = () => {
  const animations = ['fade', 'slide-bottom', 'slide-left', 'slide-right', 'fade-zoom']
  animationName.value = animations[Math.floor(Math.random() * animations.length)]
}

onMounted(() => {
  asignRandomAnimation()
  window.addEventListener('scroll', () => {
    if (!inScreen.value)
      inScreen.value = isElementInViewport(img.value)
  })
})
</script>

<template>
  <div style="min-height: 300px;" ref="img">
    <transition :name="animationName">
      <div @mouseenter="space = -12" @mouseleave="space = -5" v-if="inScreen">
        <div class="imagen-completa" @click="handlerShowFullscreen()">
          <div class="img-container">
            <BoxItems :space="space"></BoxItems>
            <img :src="imagen" class="img" :alt="nombre" />
          </div>
          <div class="name">{{ nombre }}</div>
          <div class="description">{{ descripcion }}</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Alex+Brush&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Uncial+Antiqua&display=swap');

.imagen-completa {
  font-family: Arial, sans-serif;
  background-color: #101010;
  padding: 40px 30px;
  display: flex;
  flex-direction: column;
  cursor: pointer;

  .img-container {
    line-height: 0;
    font-size: 0;
    position: relative;

    .img {
      width: 100%;
    }
  }

  .name {
    font-family: 'Uncial Antiqua', cursive;
    font-size: 16px;
    margin-top: 10px;
    color: #ffffff;
    margin-bottom: 5px;
    align-items: start;
    margin-top: 20px;
  }

  .description {
    font-family: 'Alex Brush', cursive;
    font-size: 16px;
    color: #ffffff;
  }
}
</style>
