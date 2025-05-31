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
            :key="category.id">
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
@import url('https://fonts.googleapis.com/css2?family=Alex+Brush&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Uncial+Antiqua&display=swap');

.page-container {
  height: 100dvh;
  width: 100%;
}

.main-layout__categories {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  width: 100vw;
  color: #ffffff;
  font-size: 20px;
  font-family: 'Alex Brush', cursive;
}
</style>

<style lang="scss">
.q-page-container {
  padding: 0 !important;
}

.q-header {
  position: fixed;
  z-index: 20;
  background: none !important;
  box-shadow: none !important;
  height: 100px;
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
