<!-- ImagenFullscreen.vue -->
<template>
  <div class="fullscreen-background" @click.self="close">
    <div class="fullscreen-content">
      <!-- Información a un costado -->
      <div class="fullscreen-text">
        <h2>{{ nombre }}</h2>
        <p>{{ descripcion }}</p>
      </div>

      <!-- Imagen grande -->
      <img :src="imagen" :alt="nombre" class="fullscreen-image" />

      <!-- Botón cerrar -->
      <button class="close-button" @click="close"><q-icon name="close" /></button>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['close'])

const close = () => {
  emit('close')
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
.fullscreen-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7); /* Fondo translúcido */
  backdrop-filter: blur(20px); /* Desenfoque de fondo */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.fullscreen-content {
  position: relative;
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 10px;
  border-radius: 10px;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  transition: opacity 0.6s;
  opacity: 2;
}

.fullscreen-image {
  max-width: 100%;
  max-height: 100vh;
  object-fit: contain;
  border-radius: 8px;
}

.fullscreen-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 400px;
  color: #fff;
}

.fullscreen-text h2 {
  font-size: 24px;
  margin-bottom: 10px;
  font-weight: bold;
}

.fullscreen-text p {
  font-size: 14px;
}

/* Botón de cerrar */
.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #dfd2d2;
  &:hover {
    background: #8b8a8a;
    color: #000;
  }
}
</style>
