import { ref, reactive, computed, type Ref, type ComputedRef } from 'vue'
import { defineStore } from 'pinia'
import { useMessage } from 'naive-ui'
import { api } from '@/plugins/axios'
import router from '@/router'

export const useUserStore = defineStore(
  'user',
  () => {
    // state
    const userId: Ref<string> = ref('')
    const address: Ref<string> = ref('')
    const avatar: Ref<string> = ref('')
    const backgroundImg: Ref<string> = ref('')
    const birthday: Ref<string> = ref('')
    const cart: Ref<number> = ref(0)
    const cellphone: Ref<string> = ref('')
    const disabled: Ref<boolean> = ref(false)
    const email: Ref<string> = ref('')
    const favorites: Ref<string[]> = ref([])
    const name: Ref<string> = ref('')
    const sex: Ref<string> = ref('')
    const token: Ref<string> = ref('')
    // getters
    /** 是否登入中 */
    const isLogin: ComputedRef<boolean> = computed(() => {
      return token.value.length !== 0
    })
    // actions
    async function login(form: { email: string; password: string }) {
      const { data } = await api().post('/users/login', form)
      console.log(data)
      // router.push('/')
      token.value = data.result.token
      getUser()
    }

    async function getUser() {
      if (token.value.length === 0) return
      try {
        const { data } = await api('auth').get('/users')
        console.log(data)
        userId.value = data.result._id
        disabled.value = data.result.disabled
        email.value = data.result.email
        address.value = data.result.address ?? ''
        cellphone.value = data.result.cellphone ?? ''
        name.value = data.result.name ?? ''
        sex.value = data.result.sex ?? ''
        birthday.value = data.result.birthday ?? ''
        avatar.value =
          data.result.avatar ?? `https://source.boringavatars.com/beam/160/${userId.value}`
        backgroundImg.value = data.result.backgroundImg ?? ''
        favorites.value = data.result.favorites
        cart.value = data.result.cart.length
      } catch (error) {
        logout()
      }
    }

    async function editUser(userInfo: {
      name?: string
      sex?: string
      birthday?: string
      address?: string
      cellphone?: string
    }) {
      const { data } = await api('auth').patch('users', userInfo)
      name.value = data.result.name ?? ''
      sex.value = data.result.sex ?? ''
      birthday.value = data.result.birthday ?? ''
      cellphone.value = data.result.cellphone ?? ''
      address.value = data.result.address ?? ''
    }

    async function editUserImage(image: File, type: 'avatar' | 'backgroundImg') {
      const fd = new FormData()
      fd.append(type, image)
      if (type === 'avatar') {
        const { data } = await api('auth').patch('users/avatar', fd)
        avatar.value = data.result.avatar ?? ''
      } else if (type === 'backgroundImg') {
        const { data } = await api('auth').patch('users/backgroundImg', fd)
        backgroundImg.value = data.result.backgroundImg ?? ''
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

    async function addCart(cartItem: {
      product: string
      quantity: number
      color: string
      size: string
    }) {
      const { data } = await api('auth').post('/users/cart', cartItem)
      cart.value = data.result
    }

    async function editCart(cartItem: {
      product: string
      quantity: number
      color: string
      size: string
    }) {
      const { data } = await api('auth').patch('/users/cart', cartItem)
      cart.value = data.result
    }

    async function checkout(orderInfo: {
      payMethod: string
      deliveryMethod: string
      recipientName: string
      recipientPhone: string
      recipientAddress: string
      recipientEmail?: string
    }) {
      const { data } = await api('auth').post('/orders', { ...orderInfo, user: userId.value })
      cart.value = 0
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
      userId.value = ''
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
      disabled.value = false
    }

    return {
      userId,
      token,
      email,
      address,
      cellphone,
      disabled,
      name,
      sex,
      birthday,
      avatar,
      backgroundImg,
      favorites,
      cart,
      isLogin,
      login,
      getUser,
      editUser,
      editUserImage,
      editFav,
      getFav,
      addCart,
      editCart,
      checkout,
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
