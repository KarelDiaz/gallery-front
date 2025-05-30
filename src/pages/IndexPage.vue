<script setup>
import { ref, onMounted } from 'vue'
import { api } from 'src/boot/axios'

const pictures = ref([])

onMounted(async () => {
  try {
    const data = await api.get('/index-backgrounds?populate=*')
    pictures.value = data.data.data
  } catch {
    alert('No ha cargado la imagen bgs')
  }
})
</script>

<template>
  <div class="main-bgs__container">
    <div class="main-bgs__black"></div>

    <div v-for="picture in pictures" :key="picture.id" class="main-bgs__pcts-1">
      <img
        class="main-bgs__image"
        :src="'https://galleryboard.kareldiaz.com' + picture.attributes.picture.data.attributes.url"
        :alt="picture.attributes.picture.data.attributes.name"
        :name="picture.attributes.name"
        :description="picture.attributes.caption"
      />
    </div>

    <div class="main-bgs__titles">
      <div class="main-bgs__titles-h1">Gallery</div>
      <div class="main-bgs__titles-h2">Karel Díaz</div>
    </div>

    <div class="main-bgs__box">
      <div class="main-bgs__box-1"></div>
      <div class="main-bgs__box-2"></div>
      <div class="main-bgs__box-3"></div>
      <div class="main-bgs__box-4"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Alex+Brush&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Uncial+Antiqua&display=swap');

body {
  margin: 0;
  overflow: hidden;
}

.main-bgs__black {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #00000066;
  z-index: 0;
  pointer-events: none;
}

.main-bgs__image {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  z-index: -1;
}

.main-bgs__titles {
  position: fixed;
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
    font-weight: normal;
    color: #ffffff;
  }

  &-h2 {
    font-family: 'Uncial Antiqua', cursive;
    font-size: 24px;
    color: rgba(255, 255, 255, 0.6);
    letter-spacing: 0.3em;
  }
}

.main-bgs__box {
  position: relative;
  &-1,
  &-2,
  &-3,
  &-4 {
    position: fixed;
    width: 30px;
    height: 30px;
    box-sizing: border-box;
    padding: 5px;
    color: #fff;
  }

  &-1 {
    top: 20px;
    left: 20px;
    border-top: 1px solid #fff;
    border-left: 1px solid #fff;
  }

  &-2 {
    top: 20px;
    right: 20px;
    border-top: 1px solid #fff;
    border-right: 1px solid #fff;
  }

  &-3 {
    bottom: 20px;
    left: 20px;
    border-bottom: 1px solid #fff;
    border-left: 1px solid #fff;
  }

  &-4 {
    bottom: 20px;
    right: 20px;
    border-bottom: 1px solid #fff;
    border-right: 1px solid #fff;
  }
}
</style>
