<template>
  <div class="paisajes">
    <div class="header">
      <button class="button-paisaje" @click="showModal = !showModal">Añadir Paisaje</button>
    </div>

    <div class="list">
      <ImagenCompleta
        v-for="(paisaje, index) in paisajes"
        :key="`p-${index}`"
        :id="paisaje.id"
        :imagen="url + paisaje.attributes.picture.data.attributes.formats.large.url"
        :nombre="paisaje.attributes.name"
        :descripcion="paisaje.attributes.description" />
    </div>

    <div class="modalpaisaje">
      <Modal v-if="showModal" @close="showModal = false">
        <FormPaisaje @addPicture="add" />
      </Modal>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

import { api } from 'src/boot/axios'

import ImagenCompleta from 'components/ImagenCompleta.vue'
import Modal from 'components/ModalComponent.vue'
import FormPaisaje from 'components/FormPaisaje.vue'

const url = import.meta.env.VITE_URL
let showModal = ref(false)
let paisajes = ref([])

const add = (paisaje) => {
  paisajes.value.push(paisaje)
  showModal.value = false
}

onMounted(async () => {
  try {
    const data = await api.get('/items?populate=*')
    paisajes.value = data.data.data
  } catch {
    alert('Ocurrio un error al obtener las fotos')
  }
})
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
