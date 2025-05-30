<script setup>
import { ref, onMounted } from 'vue'
import { api } from 'src/boot/axios'

const categories = ref([])

onMounted(async () => {
  try {
    const c = await api.get('/categories?populate=*')
    categories.value = c.data.data
  } catch {
    alert('Ocurrio un error al cargar la barra de navegación')
  }
})
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <!-- aqui van las categorias -->
        <div class="main-layout__categories">
          <div
            class="main-layout__categories-item"
            v-for="category in categories"
            :key="category.id"
          >
            {{ category.attributes.name }}
          </div>
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container class="page-container">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style scoped>
.page-container {
  height: 100dvh;
  width: 100%;
}

.main-layout__categories {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  color: black;
}
</style>

<style lang="scss">
.q-header {
  position: absolute;
  z-index: 20;
  background: none !important;
  box-shadow: none !important;
  height: 90px;
  padding-bottom: 20px;

  .q-layout__shadow {
    display: none !important;
  }

  .q-toolbar {
    height: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: center;
  }
}
</style>
