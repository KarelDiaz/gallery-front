<template>
  <form class="form_form-paisaje" @submit.prevent="addPaisaje" v-if="true">
    <ImagePicker v-model="paisaje.imagen" />
    <input
      class="input1"
      required
      type="text"
      placeholder="Nombre del paisaje"
      v-model="paisaje.nombre"
    />
    <input
      class="input2"
      required
      type="text"
      placeholder="Descripción del paisaje"
      v-model="paisaje.descripcion"
    />
    <button class="submit" type="submit">Agregar Paisaje</button>
  </form>
</template>

<style scoped lang="scss">
.form_form-paisaje {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  align-items: center;
  gap: 20px;
  max-height: 100%;
  border-radius: 20px;
  padding: 40px;
}

.submit {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 20px;
  background-color: rgb(248, 248, 248);
  color: black;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: rgb(36, 35, 40);
    transform: scale(1.05);
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
    color: white;
  }
}

.input1,
.input2 {
  padding: 10px;
  border-radius: 20px;
  border: 1px solid rgb(22, 15, 85);
  background-color: rgb(255, 255, 255);
}
</style>

<script setup>
import { ref } from 'vue'

import ImagePicker from 'components/ImagePicker.vue'

const emit = defineEmits(['addPicture'])

const paisaje = ref({
  id: 0,
  nombre: '',
  descripcion: '',
  imagen: '',
})

const addPaisaje = () => {
  emit('addPicture', paisaje.value)
  // Reset the form
  paisaje.value = {
    id: 0,
    nombre: '',
    descripcion: '',
    imagen: '',
  }
}
</script>
