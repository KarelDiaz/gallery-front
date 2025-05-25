<template>
  <div class="modal">
    <button class="close-button" @click="closeModal">X</button>

    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 30px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  align-items: center;
  gap: 20px;
  background-color: rgb(255, 255, 255);

  max-height: 100%;
  border-radius: 20px;
  padding: 40px;
  overflow: auto;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  font-size: 20px;
  font-weight: bold;
  color: white;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.2);
  }
}
</style>

<script setup>
const emit = defineEmits(['close'])

const closeModal = () => {
  emit('close')
}
</script>
