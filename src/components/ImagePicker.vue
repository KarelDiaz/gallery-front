<script setup>
import { ref, watch } from 'vue'

// Configuración del v-model personalizado
const props = defineProps({
  modelValue: String, // Propiedad para el v-model
})
const emit = defineEmits(['update:modelValue']) // Evento para el v-model

const imagen = ref(props.modelValue)

const onChangeImagen = (event) => {
  const file = event?.target?.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      imagen.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

// Sincronizar cambios de la imagen con el v-model
watch(imagen, (newValue) => {
  emit('update:modelValue', newValue)
})

// Actualizar el valor local cuando cambie la propiedad modelValue
watch(
  () => props.modelValue,
  (newValue) => {
    imagen.value = newValue
  },
  { immediate: true },
)
</script>

<template>
  <label class="img-picker">
    <div v-if="!imagen" class="empty">No imagen</div>
    <img v-else class="img" :src="imagen" alt="" />
    <input class="input" type="file" accept="image/*" @change="onChangeImagen" />
  </label>
</template>

<style lang="scss" scoped>
.img-picker {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  background-color: white;
  border: 1px solid #ccc;
  cursor: pointer;
  user-select: none;
  border-radius: 20px;
  overflow: hidden;
}
.img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.input {
  display: none;
}
</style>
