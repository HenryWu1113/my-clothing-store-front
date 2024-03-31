import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'

export const useRegisterModalStore = defineStore('registerModal', () => {
  // state
  const isOpen: Ref<boolean> = ref(false)
  // getters

  // actions
  function onOpen() {
    isOpen.value = true
  }

  function onClose(callback: () => void) {
    isOpen.value = false
    if (typeof callback === 'function') {
      callback()
    }
  }

  return {
    isOpen,
    onOpen,
    onClose
  }
})
