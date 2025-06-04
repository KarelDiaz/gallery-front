<script setup>
defineProps({
  space: {
    type: Number,
    default: 20,
  },
})
</script>

<template>
  <div class="main-bgs__box">
    <div class="main-bgs__box-1" :style="{ top: `${space}px`, left: `${space}px` }"></div>
    <div class="main-bgs__box-2" :style="{ top: `${space}px`, right: `${space}px` }"></div>
    <div class="main-bgs__box-3" :style="{ bottom: `${space}px`, left: `${space}px` }"></div>
    <div class="main-bgs__box-4" :style="{ bottom: `${space}px`, right: `${space}px` }"></div>
  </div>
</template>

<style scoped lang="scss">
.main-bgs__box {
  &-1,
  &-2,
  &-3,
  &-4 {
    position: absolute;
    width: 30px;
    height: 30px;
    color: #fff;
    box-sizing: border-box;
    padding: 5px;
    transition: transform 0.4s ease;
  }

  &-1 {
    border-top: 1px solid #fff;
    border-left: 1px solid #fff;
  }

  &-2 {
    border-top: 1px solid #fff;
    border-right: 1px solid #fff;
  }

  &-3 {
    border-bottom: 1px solid #fff;
    border-left: 1px solid #fff;
  }

  &-4 {
    border-bottom: 1px solid #fff;
    border-right: 1px solid #fff;
  }
}
</style>
