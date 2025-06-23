<script setup>
import { ref, onMounted } from 'vue'


import { api } from 'src/boot/axios'
import { usePicturesStore } from 'src/stores/pictures'


import ImagenFullscreen from 'components/ImagenFullscreen.vue'
import { storeToRefs } from 'pinia'


const categories = ref([])
const pagescroll = ref(false)
const picturesStore = usePicturesStore()
const { pictureIndex } = storeToRefs(picturesStore)

const scroll = (e) => {
  if (e.position > 0) pagescroll.value = true
  else pagescroll.value = false
}

onMounted(async () => {
  picturesStore.getPictures()
  try {
    const c = await api.get('/categories?populate=*')
    categories.value = c.data.data
  } catch {
    alert('Ocurrio un error al cargar la barra de navegación')
  }
})
</script>

<template>
  <q-layout view="lHh Lpr lFf" @scroll="scroll">
    <q-header elevated :class="{ onscroll: pagescroll }">
      <q-toolbar>
        <!-- aqui van las categorias -->
        <div class="main-layout__categories">
          <div
            class="main-layout__categories-item"
            v-for="category in categories"
            :key="category.id">
            {{ category.attributes.name }}
          </div>
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container class="page-container">
      <router-view />
    </q-page-container>

    <transition name="fade">
      <ImagenFullscreen v-if="pictureIndex != null" />
    </transition>
  </q-layout>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Alex+Brush&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Uncial+Antiqua&display=swap');

.page-container {
  height: 100dvh;
  width: 100%;
}

.main-layout__categories {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  width: 100vw;
  color: #ffffff;
  font-size: 20px;
  font-family: 'Alex Brush', cursive;
  height: 100%;
}
</style>

<style lang="scss">
.q-page-container {
  padding: 0 !important;
}

.q-header {
  position: fixed;
  z-index: 20;
  background: none !important;
  box-shadow: none !important;
  height: 100px;
  transition: 0.2s;

  &.onscroll {
    height: 60px;
    background: rgba(0, 0, 0, 0.205) !important;
    backdrop-filter: blur(15px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.26);
  }

  .q-layout__shadow {
    display: none !important;
  }

  .q-toolbar {
    height: 100%;
    min-height: 0;
    display: flex;
    align-items: flex-end;
    justify-content: center;
  }
}
</style>
