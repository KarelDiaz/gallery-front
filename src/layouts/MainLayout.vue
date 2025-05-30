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
            <q-btn
              flat
              :to="category.attributes.slug"
              :label="category.attributes.name"
              class="main-layout__categories-btn"
            />
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
  width: 100%;
}
</style>
