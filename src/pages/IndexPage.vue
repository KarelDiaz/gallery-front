<script setup>
import { storeToRefs } from 'pinia'
import { api } from 'src/boot/axios'
import { ref, onMounted, computed } from 'vue'


import { usePicturesStore } from 'src/stores/pictures'


import BoxItems from 'components/BoxItems.vue'
import ImagenCompleta from 'components/ImagenCompleta.vue'

const url = import.meta.env.VITE_URL
const backgrounds = ref([])
const backgroundsActive = ref(null)
const picturesStore = usePicturesStore()
const { pictures } = storeToRefs(picturesStore)

const pictures1 = computed(() => {
  return pictures.value.slice(0, Math.floor(pictures.value.length / 2))
})

const pictures2 = computed(() => {
  return pictures.value.slice(Math.floor(pictures.value.length / 2), pictures.value.length)
})

onMounted(async () => {
  try {
    const data = await api.get('/index-backgrounds?populate=*')

    backgrounds.value = data.data.data

    if (backgrounds.value.length > 0) {
      backgroundsActive.value = 0
    }
  } catch {
    alert('Error cargando imágenes o pictures')
  }

  setInterval(() => {
    if (backgrounds.value.length > 0) {
      backgroundsActive.value = (backgroundsActive.value + 1) % backgrounds.value.length
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
        :class="{ active: backgroundsActive === index }"
        v-for="(background, index) in backgrounds"
        :key="background.id"
        :src="url + background.attributes.picture.data.attributes.url"
        :alt="background.attributes.picture.data.attributes.name" />

      <div class="main-bgs__titles">
        <div class="main-bgs__titles-h1">Gallery</div>
        <div class="main-bgs__titles-h2">Karel Díaz</div>
      </div>

      <BoxItems></BoxItems>
    </div>

    <div class="main-album__container">
      <div class="main-album__list">
        <ImagenCompleta
          v-for="(picture1, index) in pictures1"
          :key="`p-${index}`"
          :index="pictures.indexOf(picture1)"
          :imagen="url + picture1.attributes.picture.data.attributes.formats.large.url"
          :nombre="picture1.attributes.name"
          :descripcion="picture1.attributes.decription" />
      </div>

      <div class="main-album__list">
        <ImagenCompleta
          v-for="(picture2, index) in pictures2"
          :key="`p-${index}`"
          :index="pictures.indexOf(picture2)"
          :imagen="url + picture2.attributes.picture.data.attributes.formats.large.url"
          :nombre="picture2.attributes.name"
          :descripcion="picture2.attributes.decription" />
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
