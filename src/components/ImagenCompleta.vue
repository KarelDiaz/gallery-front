<template>
  <div>
    <div class="imagen-completa" @click="handlerShowFullscreen()">
      <div class="img-container">
        <div class="box-wrapper">
          <BoxItems :space="-3"></BoxItems>
        </div>
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
import ImagenFullscreen from 'components/ImagenFullscreen.vue'
import BoxItems from 'components/BoxItems.vue'

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
@import url('https://fonts.googleapis.com/css2?family=Alex+Brush&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Uncial+Antiqua&display=swap');

.imagen-completa {
  font-family: Arial, sans-serif;
  background-color: #101010;
  padding: 40px 30px;
  display: flex;
  flex-direction: column;

  .img-container {
    position: relative;
    margin-bottom: 20px;
    .img {
      height: auto;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .name {
    font-family: 'Uncial Antiqua', cursive;
    font-size: 16px;
    margin-top: 10px;
    color: #ffffff;
    margin-bottom: 5px;
    align-items: start;
  }

  .description {
    font-family: 'Alex Brush', cursive;
    font-size: 16px;
    color: #ffffff;
  }
}
</style>
