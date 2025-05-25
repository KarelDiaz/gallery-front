<template>
  <div>
    <div class="imagen-completa" @click="handlerShowFullscreen()">
      <div class="img-container">
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
        @close="showFullscreen = false"
      />
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ImagenFullscreen from './ImagenFullScreen.vue'

const showFullscreen = ref(false)

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
.imagen-completa {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-family: Arial, sans-serif;
  border: 1px solid #000;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: 0.4s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }

  .img-container {
    width: 70%;
    height: 300px;
    overflow: hidden;
    border-radius: 8px;
    position: relative;
    transition: cubic-bezier(0.075, 0.82, 0.165, 1) 0.4s;

    .img {
      max-width: 100%;
      height: auto;
      border-radius: 8px;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s ease-in-out;
    }
  }

  .name {
    font-size: 1.5rem;
    font-weight: bold;
    margin-top: 10px;
    color: #333;
  }

  .description {
    font-size: 1rem;
    margin-top: 5px;
    color: #666;
  }
}
</style>
