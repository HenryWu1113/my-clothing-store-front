import { ref, reactive, computed, type Ref, type ComputedRef } from 'vue'
import { defineStore } from 'pinia'
import { useMessage } from 'naive-ui'
import { api } from '@/plugins/axios'
import router from '@/router'

export const useUserStore = defineStore(
  'user',
  () => {
    // state
    const token: Ref<string> = ref('')
    const email: Ref<string> = ref('')
    const address: Ref<string> = ref('')
    const cellphone: Ref<string> = ref('')
    const name: Ref<string> = ref('')
    const sex: Ref<string> = ref('')
    const birthday: Ref<string> = ref('')
    const avatar: Ref<string> = ref('')
    const backgroundImg: Ref<string> = ref('')
    const favorites: Ref<string[]> = ref([])
    const cart: Ref<number> = ref(0)
    const theme: Ref<string> = ref('')
    // getters
    /** 是否登入中 */
    const isLogin: ComputedRef<boolean> = computed(() => {
      return token.value.length !== 0
    })
    // actions
    const login = async (form: { email: string; password: string }) => {
      try {
        const { data } = await api.post('/users/login', form)
        router.push('/')
        token.value = data.result.token
      } catch (error: any) {
        console.log(error)
      }
    }

    const logout = () => {
      token.value = ''
    }

    return {
      token,
      email,
      address,
      cellphone,
      name,
      sex,
      birthday,
      avatar,
      backgroundImg,
      favorites,
      cart,
      theme,
      isLogin,
      login,
      logout
    }
  },
  {
    persist: {
      key: 'clothing-store',
      paths: ['token']
    }
  }
)
