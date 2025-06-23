import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import { api } from 'src/boot/axios'

export const usePicturesStore = defineStore('pictures', () => {
  const pictures = ref([])
  const pictureIndex = ref(null)

  const currentPicture = computed(() => {
    return pictures.value[pictureIndex.value] || null
  })

  const getPictures = async () => {
    try {
      const { data } = await api.get('/items?populate=*')
      pictures.value = data.data
    } catch (error) {
      console.error('Failed to fetch pictures:', error)
    }
  }

  return {
    pictures,
    pictureIndex,
    currentPicture,
    getPictures,
  }
})
