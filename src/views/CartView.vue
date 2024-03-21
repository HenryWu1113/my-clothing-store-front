<template>
  <div class="cart-page myContainer min-h-screen">
    <div class="top-img-wrap">
      <img src="../assets/images/cartBG.jpg" alt="" />
    </div>
    <div class="cart-info-wrap">
      <div class="title">
        <p>購物車</p>
        <div class="go-back-btn" @click="$router.go(-1)">
          <n-icon :component="ArrowUndoOutline"></n-icon>
        </div>
      </div>
      <div class="body">
        <div class="product-lists-wrap">
          <div class="product-list" v-for="item in cart" :key="item._id">
            <div class="img-wrap" @click="$router.push(`/product/${item.product._id}`)">
              <img :src="item.product.images[0]" />
            </div>
            <div class="info-wrap">
              <div class="product-info">
                <div class="name">{{ item.product.name }}</div>
                <div class="info">
                  <div class="color" :style="{ background: item.color }"></div>
                  <div class="size">尺寸 : {{ item.size }}</div>
                </div>
              </div>
              <div class="product-price">
                <p v-if="item.product.discountRate !== 0">
                  <del>NT. {{ item.product.price }}</del>
                </p>
                <p>NT. {{ item.product.price * ((100 - item.product.discountRate) / 100) }}</p>
              </div>
              <div class="product-quantity">
                <div class="quantity-pill">
                  <n-icon
                    :component="RemoveCircleOutline"
                    @click="editCart(item._id, item.quantity - 1)"
                  ></n-icon>
                  <div class="quantity">{{ item.quantity }}</div>
                  <n-icon
                    :component="AddCircleOutline"
                    @click="editCart(item._id, item.quantity + 1)"
                  ></n-icon>
                </div>
              </div>
              <div class="total-price">
                NT.
                {{ item.product.price * ((100 - item.product.discountRate) / 100) * item.quantity }}
              </div>
              <div class="delete">
                <n-icon :component="TrashOutline" @click="editCart(item._id, 0)"></n-icon>
              </div>
            </div>
          </div>
        </div>
        <div class="total-panel-wrap">
          <div class="panel">
            <div class="product-fee">
              <p>商品金額</p>
              <p>NT. {{ totalPrice }}</p>
            </div>
            <div class="delivery-fee">
              <p>運費</p>
              <p v-if="totalPrice < brand.freeDeliveryFee">NT. {{ brand.deliveryFee }}</p>
              <p v-else>
                <del>NT. {{ brand.deliveryFee }}</del>
              </p>
            </div>
            <div class="total-fee">
              <p>總金額</p>
              <p>NT. {{ orderPrice }}</p>
            </div>
          </div>
          <n-button type="info" ghost @click="onOpen()"> 結帳 </n-button>
          <PaymentModal />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/styles';

.cart-page {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .top-img-wrap {
    height: 250px;
    > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top center;
    }
  }

  .cart-info-wrap {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .title {
      font-size: 2rem;
      color: $text-color;
      font-weight: bold;
      border-bottom: 1px solid $border-color;
      padding-bottom: 1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .n-icon {
        padding-top: 8px;
        cursor: pointer;
      }
    }

    .body {
      display: flex;
      gap: 1rem;
      .product-lists-wrap {
        width: 70%;
        display: flex;
        flex-direction: column;
        .product-list {
          height: 200px;
          display: flex;
          align-items: center;
          padding: 1rem 0;
          border-bottom: 1px solid $border-color;
          .img-wrap {
            cursor: pointer;
            height: 100%;
            aspect-ratio: 1 / 1;
            > img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }
          .info-wrap {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-left: 1rem;
            > div {
              height: 100%;
              display: flex;
              color: $text-color2;
              &.product-info {
                width: 30%;

                flex-direction: column;
                justify-content: center;
                font-weight: bold;
                .name {
                  font-size: 1.2rem;
                }
                .info {
                  display: flex;
                  align-items: center;
                  gap: 0.5rem;
                  font-size: 1rem;
                  margin-top: 0.5rem;
                  .color {
                    width: 18px;
                    height: 18px;
                    border-radius: 50%;
                  }
                }
              }

              &.product-price {
                width: 20%;

                font-size: 1.2rem;
                align-items: center;
                justify-content: center;
                flex-direction: column;
              }

              &.product-quantity {
                width: 20%;

                font-size: 1.2rem;
                align-items: center;
                justify-content: center;

                .quantity-pill {
                  min-width: 100%;
                  display: flex;
                  align-items: center;
                  border: 1px solid $border-color;
                  border-radius: 100px;
                  padding: 5px;
                  justify-content: space-between;
                  .n-icon {
                    font-size: 1.5rem;
                    cursor: pointer;
                  }
                }
              }

              &.total-price {
                width: 20%;

                font-size: 1.2rem;
                align-items: center;
                justify-content: center;
              }

              &.delete {
                width: 10%;
                font-size: 1.2rem;
                align-items: center;
                justify-content: flex-end;
                padding-right: 2rem;
                .n-icon {
                  cursor: pointer;
                  color: $error;
                }
              }
            }
          }
        }
      }

      .total-panel-wrap {
        width: 30%;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        .panel {
          font-size: 1rem;
          background: $bg-color2;
          padding: 10px;
          color: $text-color2;
          > div {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 5px 0;
            > p:first-child {
              font-weight: bold;
            }
            &.total-fee {
              border-top: 1px solid $border-color;
            }
          }
        }
      }
    }
  }
}
</style>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import type { ICart, IBrand } from '@/types'
import { useUserStore } from '@/stores/user'
import { usePaymentModalStore } from '@/stores/usePaymentModal'
import { storeToRefs } from 'pinia'
import { api } from '@/plugins/axios'
import {
  ArrowUndoOutline,
  RemoveCircleOutline,
  AddCircleOutline,
  TrashOutline
} from '@vicons/ionicons5'
import { useMessage } from 'naive-ui'

import PaymentModal from '@/components/modals/PaymentModal.vue'

const { isOpen } = storeToRefs(usePaymentModalStore())
const { onOpen, onClose } = usePaymentModalStore()

const message = useMessage()
const user = useUserStore()

const cart = reactive<ICart[]>([])

const brand = ref<IBrand>({
  _id: '',
  name: '',
  deliveryFee: 0,
  freeDeliveryFee: 0,
  updatedAt: '',
  createdAt: ''
})

async function editCart(id: string, quantity: number) {
  const idx = cart.findIndex((item) => item._id === id)
  if (idx === -1) throw new Error('??')
  const cartItem = {
    product: cart[idx].product._id,
    quantity,
    size: cart[idx].size,
    color: cart[idx].color
  }
  try {
    await user.editCart(cartItem)
    if (quantity === 0) {
      cart.splice(idx, 1)
    } else {
      cart[idx].quantity = quantity
    }
  } catch (error: any) {
    console.log(error)
    message.error(error.isAxiosError ? error.response.data.message : error.message)
  }
}

async function getCart() {
  try {
    const { data } = await api('auth').get('/users/cart')
    console.log(data)
    cart.push(...data.result)
    console.log(cart)
  } catch (error: any) {
    console.log(error)
    message.error(error.isAxiosError ? error.response.data.message : error.message)
  }
}
getCart()

async function getBrand() {
  try {
    const { data } = await api().get('/brands')
    console.log(data)
    if (data.result.length > 0) {
      brand.value = data.result[0]
    }
  } catch (error: any) {
    console.log(error)
    message.error(error.isAxiosError ? error.response.data.message : error.message)
  }
}
getBrand()

/** 所有商品加起來的價格 */
const totalPrice = computed(() => {
  return cart.reduce((a: any, c: ICart) => {
    return a + c.product.price * ((100 - c.product.discountRate) / 100) * c.quantity
  }, 0)
})

/** 訂單總價加起來的價格 */
const orderPrice = computed(() => {
  return totalPrice.value < brand.value.freeDeliveryFee
    ? totalPrice.value + brand.value.deliveryFee
    : totalPrice.value
})
</script>
