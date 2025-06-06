<template>
  <div @mouseenter="space = -12" @mouseleave="space = -5">
    <div class="imagen-completa" @click="handlerShowFullscreen()">
      <div class="img-container">
        <BoxItems :space="space"></BoxItems>
        <img :src="imagen" class="img" :alt="nombre" />
      </div>
      <div class="name">{{ nombre }}</div>
      <div class="description">{{ descripcion }}</div>
    </div>
    <transition name="fade">
      <ImagenFullscreen
        v-if="showFullscreen"
        :imagen="imagen"
        :nombre="nombre"
        :descripcion="descripcion"
        @close="showFullscreen = false" />
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ImagenFullscreen from 'components/ImagenFullscreen.vue'
import BoxItems from 'components/BoxItems.vue'

const showFullscreen = ref(false)
const space = ref(-5)

const emit = defineEmits(['clickcustom'])

const handlerShowFullscreen = () => {
  showFullscreen.value = !showFullscreen.value
  emit('clickcustom', showFullscreen.value)
}

defineProps({
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
</script>

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
