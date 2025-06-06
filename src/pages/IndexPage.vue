<script setup>
import { ref, onMounted, computed } from 'vue'
import { api } from 'src/boot/axios'
import BoxItems from 'components/BoxItems.vue'

import ImagenCompleta from 'components/ImagenCompleta.vue'

const url = import.meta.env.VITE_URL
const pictures = ref([])
const paisajes = ref([])
const pictureActive = ref(null)

const paisajes1 = computed(() => {
  return paisajes.value.slice(0, Math.floor(paisajes.value.length / 2))
})

const paisajes2 = computed(() => {
  return paisajes.value.slice(Math.floor(paisajes.value.length / 2), paisajes.value.length)
})

onMounted(async () => {
  try {
    const data = await api.get('/index-backgrounds?populate=*')
    const c = await api.get('/items?populate=*')

    pictures.value = data.data.data
    paisajes.value = c.data.data

    if (pictures.value.length > 0) {
      pictureActive.value = 0
    }
  } catch {
    alert('Error cargando imágenes o paisajes')
  }

  setInterval(() => {
    if (pictures.value.length > 0) {
      pictureActive.value = (pictureActive.value + 1) % pictures.value.length
    }
  }, 3000)
})
</script>

<template>
  <div class="main">
    <div class="main-bgs__container">
      <div class="main-bgs__black"></div>

      <img
        class="main-bgs__image"
        :class="{ active: pictureActive === index }"
        v-for="(picture, index) in pictures"
        :key="picture.id"
        :src="url + picture.attributes.picture.data.attributes.url"
        :alt="picture.attributes.picture.data.attributes.name" />

      <div class="main-bgs__titles">
        <div class="main-bgs__titles-h1">Gallery</div>
        <div class="main-bgs__titles-h2">Karel Díaz</div>
      </div>

      <BoxItems></BoxItems>
    </div>

    <div class="main-album__container">
      <div class="main-album__list">
        <ImagenCompleta
          v-for="(paisaje, index) in paisajes1"
          :key="`p-${index}`"
          :imagen="url + paisaje.attributes.picture.data.attributes.formats.large.url"
          :nombre="paisaje.attributes.name"
          :descripcion="paisaje.attributes.decription"
          @clickcustom="clickCustom" />
      </div>

      <div class="main-album__list">
        <ImagenCompleta
          v-for="(paisaje, index) in paisajes2"
          :key="`p-${index}`"
          :imagen="url + paisaje.attributes.picture.data.attributes.formats.large.url"
          :nombre="paisaje.attributes.name"
          :descripcion="paisaje.attributes.decription"
          @clickcustom="clickCustom" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Alex+Brush&family=Uncial+Antiqua&display=swap');

body {
  margin: 0;
  overflow-x: hidden;
}

.main {
  display: flex;
  flex-direction: column;
}

.main-bgs__container {
  position: relative;
  height: 100vh;
  overflow: hidden;
}

.main-bgs__black {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #00000066;
  z-index: 0;
  pointer-events: none;
}

.main-bgs__image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  z-index: -1;
  opacity: 0;
  transition: opacity 1s;

  &.active {
    opacity: 1;
  }
}

.main-bgs__titles {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2;
  text-align: center;

  &-h1 {
    font-family: 'Alex Brush', cursive;
    font-size: 96px;
    color: #ffffff;
    margin: 0;
  }

  &-h2 {
    font-family: 'Uncial Antiqua', cursive;
    font-size: 24px;
    color: rgba(255, 255, 255, 0.6);
    letter-spacing: 0.2em;
    margin-top: -0.5em;
  }
}

.main-album__container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  background-color: #101010;
}

.main-album__list {
  display: flex;
  flex-direction: column;
}
</style>
