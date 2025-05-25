<template>
  <div class="paisajes">
    <div class="header">
      <button class="button-paisaje" @click="showModal = !showModal">Añadir Paisaje</button>
    </div>

    <div class="list">
      <ImagenCompleta
        v-for="(paisaje, index) in paisajes"
        :key="`p-${index}`"
        :imagen="paisaje.imagen"
        :nombre="paisaje.nombre"
        :descripcion="paisaje.descripcion"
        @clickcustom="clickCustom"
      />
    </div>

    <div class="modalpaisaje">
      <Modal v-if="showModal" @close="showModal = false">
        <FormPaisaje @addPicture="add" />
      </Modal>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import ImagenCompleta from 'components/ImagenCompleta.vue'
import Modal from 'components/ModalComponent.vue'
import FormPaisaje from 'components/FormPaisaje.vue'

let showModal = ref(false)
let paisajes = ref([])

const add = (paisaje) => {
  paisajes.value.push(paisaje)
  showModal.value = false
}

// onMounted(() => {
//   const paisajesLocalStorage = localStorage.getItem('paisajes')
//   if (paisajesLocalStorage) {
//     paisajes.value = JSON.parse(paisajesLocalStorage)
//   }
// })
</script>

<style lang="scss" scoped>
.paisajes {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  width: 100%;
  height: 100%;
  padding: 30px;
}

.button-paisaje {
  margin: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 20px;
  background-color: rgb(248, 248, 248);
  color: black;
  cursor: pointer;
  transition: all 0.4s ease-in-out;
  &:hover {
    background-color: rgb(36, 35, 40);
    transform: scale(1.05);
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
    color: rgb(233, 226, 226);
  }
}

.list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
  padding: 40px;
}
</style>
