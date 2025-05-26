<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <!-- aqui van las categorias -->
      </q-toolbar>
    </q-header>
    <q-page-container class="page-container">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>

</script>

<style scoped>
.page-container {
  height: 100dvh;
  width: 100%;
}
</style>
