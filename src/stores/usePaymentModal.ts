import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'

export const usePaymentModalStore = defineStore('paymentModal', () => {
  // state
  const isOpen: Ref<boolean> = ref(false)
  // getters

  // actions
  function onOpen() {
    isOpen.value = true
  }

  /**
   * 關閉視窗(cb 只能執行無參數 function)
   */
  function onClose(...args: Function[]) {
    console.log(args)
    isOpen.value = false
    args.forEach((el) => {
      el()
    })
  }

  return {
    isOpen,
    onOpen,
    onClose
  }
})
