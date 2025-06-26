<script setup>
import { storeToRefs } from 'pinia'

import { usePicturesStore } from 'src/stores/pictures'

const url = import.meta.env.VITE_URL
const picturesStore = usePicturesStore()
const { currentPicture, pictureIndex, pictures } = storeToRefs(picturesStore)

const next = () => {
  if (pictureIndex.value === null) return
  if (pictureIndex.value === pictures.value.length - 1) {
    pictureIndex.value = 0
  } else {
    pictureIndex.value++
  }
}

const previous = () => {
  if (pictureIndex.value === null) return
  if (pictureIndex.value === 0) {
    pictureIndex.value = pictures.value.length - 1
  } else {
    pictureIndex.value--
  }
}

const close = () => {
  pictureIndex.value = null
}

const escape = (event) => {
  if (event.key === 'Escape') {
    close()
  }
}
</script>

<!-- ImagenFullscreen.vue -->
<template>
  <div class="fullscreen-background" @click.self="close" @keypress="escape">
    <div class="fullscreen-content">
      <!-- Información a un costado -->
      <div class="fullscreen-text">
        <h2>{{ currentPicture.attributes.name }}</h2>
        <p>{{ currentPicture.attributes.decription }}</p>
      </div>

      <!-- Imagen grande -->
      <img
        :src="url + currentPicture.attributes.picture.data.attributes.formats.large.url"
        :alt="currentPicture.attributes.nombre"
        class="fullscreen-image"
      />

      <!-- Botón cerrar -->
      <button class="close-button" @click="close"><q-icon name="close" /></button>
    </div>

    <button class="action next" @click="next()">
      <q-icon name="chevron_right" size="50px" color="white" />
    </button>

    <button class="action prev" @click="previous()">
      <q-icon name="chevron_left" size="50px" color="white" />
    </button>
  </div>
</template>

<style scoped lang="scss">
@import 'src/css/mixins';

.fullscreen-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  /* Fondo translúcido */
  backdrop-filter: blur(20px);
  /* Desenfoque de fondo */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.fullscreen-content {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  padding: 10px;
  border-radius: 10px;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  transition: opacity 0.6s;
  opacity: 2;

  @include r(lg) {
    flex-direction: row;
  }
}

/* Imagen Principal */
// .fullscreen-image {
//   max-width: 100%;
//   max-height: 100vh;
//   object-fit: contain;
//   border-radius: 8px;
//   width: 50vw;
//   @include r(sm) {

//   }
// }

/* Imagen Principal */
.fullscreen-image {
  max-width: 100%;
  max-height: calc(100vh - 210px);
  object-fit: contain;
  border-radius: 8px;
  width: 90vw; /* Más ancho en móvil */
  display: block;
  margin: 0 auto; /* ✅ Esto la centra en móvil */

  @include r(lg) {
    width: 50vw; /* ✅ Más pequeño en pantallas grandes */
    margin: 0; /* ✅ Quita el centrado si no lo quieres en desktop */
    display: inline; /* Opcional, depende de tu layout */
    max-height: 100%;
  }
}

/* Información Costado */
.fullscreen-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #fff;
  text-align: center;
  width: 100%;
  @include r(lg) {
    max-width: 400px;
    text-align: left;
  }
}

.fullscreen-text h2 {
  font-size: 24px;
  margin-bottom: 10px;
  font-weight: bold;
}

.fullscreen-text p {
  font-size: 14px;
}

// /* Flechas y su acción */
.action {
  position: absolute;
  top: 0;
  bottom: 0;
  height: 100%;
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5%;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      rgba(116, 116, 116, 0),
      rgba(0, 0, 0, 0.8),
      rgba(116, 116, 116, 0)
    );
    opacity: 0;
    transition: 0.3s;
  }

  &:hover {
    &::before {
      opacity: 1;
    }
  }

  &.next {
    right: 0;
  }

  &.prev {
    left: 0;
  }
}

/* Botón de cerrar */
.close-button {
  position: absolute;
  top: 30px;
  right: 30px;
  background: transparent;
  border: none;
  border-radius: 1000px;
  font-size: 20px;
  cursor: pointer;
  color: #dfd2d2;
  z-index: 100;
  transition: 0.5s;

  @include r(lg) {
    right: 100px;
  }

  &:hover {
    background: #dfd2d2;
    color: #000;
    transition: 0.8s;
  }
}
</style>
