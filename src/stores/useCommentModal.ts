import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'

export const useCommentModalStore = defineStore('commentModal', () => {
  // state
  const isOpen: Ref<boolean> = ref(false)
  // getters

  // actions
  function onOpen() {
    isOpen.value = true
  }

  function onClose(callback: () => void) {
    isOpen.value = false
    if (!callback) return
    callback && callback()
  }

  return {
    isOpen,
    onOpen,
    onClose
  }
})
