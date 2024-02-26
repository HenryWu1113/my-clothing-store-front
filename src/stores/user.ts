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
    async function login(form: { email: string; password: string }) {
      const { data } = await api().post('/users/login', form)
      console.log(data)
      router.push('/')
      token.value = data.result.token
      getUser()
    }

    async function getUser() {
      if (token.value.length === 0) return
      try {
        const { data } = await api('auth').get('/users')
        console.log(data)
        email.value = data.result.email
        address.value = data.result.address ?? ''
        cellphone.value = data.result.cellphone ?? ''
        name.value = data.result.name ?? ''
        sex.value = data.result.sex ?? ''
        birthday.value = data.result.birthday ?? ''
        avatar.value = data.result.avatar ?? ''
        backgroundImg.value = data.result.backgroundImg ?? ''
        favorites.value = data.result.favorites
        cart.value = data.result.cart.length
        // theme.value = ''
      } catch (error) {
        logout()
      }
    }

    async function editFav(product_Id: string) {
      const { data } = await api('auth').post('/users/favorite', { product: product_Id })
      favorites.value = data.result
      return data
    }

    async function getFav() {
      const { data } = await api('auth').get('/users/favorite')
      favorites.value = data.result.map((item: any) => item._id)
      return data
    }

    async function logout() {
      await api('auth').delete('/users/logout')
      resetPiniaVal()
      return new Promise<void>((res) => {
        setTimeout(() => {
          token.value = ''
          router.push('/')
          res()
        }, 100)
      })
    }

    /** 初始 useUserStore 值 */
    const resetPiniaVal = () => {
      token.value = ''
      email.value = ''
      address.value = ''
      cellphone.value = ''
      name.value = ''
      sex.value = ''
      birthday.value = ''
      avatar.value = ''
      backgroundImg.value = ''
      favorites.value = []
      cart.value = 0
      // theme.value = ''
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
      getUser,
      editFav,
      getFav,
      logout,
      resetPiniaVal
    }
  },
  {
    persist: {
      key: 'clothing-store',
      paths: ['token']
    }
  }
)
