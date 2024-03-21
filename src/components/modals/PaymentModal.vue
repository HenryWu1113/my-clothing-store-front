<template>
  <Teleport to="body">
    <transition name="modal">
      <div v-if="isOpen" class="modal-mask">
        <div class="modal">
          <n-steps :current="currentStep" :status="'process'">
            <n-step title="付款方式" description="請選擇付款方式" />
            <n-step title="購買資訊" description="填寫購買的詳細資料" />
            <n-step title="完成" description="完成訂單" />
          </n-steps>
          <div :class="['body', `step${currentStep}`]">
            <template v-if="currentStep === STEP.payMethod">
              <div class="category-wrap">
                <div class="category">信用卡</div>
                <div class="btn-group">
                  <div
                    @click="paymentForm.payMethod = '信用卡一次付清'"
                    :class="payMethodSelected('信用卡一次付清')"
                  >
                    一次付清
                  </div>
                </div>
              </div>
              <div class="category-wrap">
                <div class="category">其他付款方式</div>
                <div class="btn-group">
                  <div
                    @click="paymentForm.payMethod = '貨到付款'"
                    :class="payMethodSelected('貨到付款')"
                  >
                    貨到付款
                  </div>
                </div>
              </div>
            </template>
            <template v-else-if="currentStep === STEP.payInfo">
              <div class="payInfo">
                <div class="title">付款資訊</div>
                <div class="body">
                  <div class="card-wrap">
                    <CreditCard :creditCardForm="creditCardForm" />
                  </div>
                  <div class="card-info-wrap">
                    <div>
                      <p>姓名</p>
                      <n-input v-model:value="creditCardForm.name"></n-input>
                    </div>
                    <div>
                      <p>信用卡號</p>
                      <n-input v-model:value="creditCardForm.number"></n-input>
                    </div>
                    <div>
                      <p>過期日</p>
                      <n-input v-model:value="creditCardForm.expireM"></n-input>
                      <n-input v-model:value="creditCardForm.expireY"></n-input>
                    </div>
                    <div>
                      <p>卡片背面後3碼</p>
                      <n-input
                        @focus="creditCardForm.onBack = true"
                        @blur="creditCardForm.onBack = false"
                        v-model:value="creditCardForm.cvv"
                      ></n-input>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
          <div class="footer">
            <n-button
              v-if="currentStep === STEP.payMethod"
              type="info"
              ghost
              @click="paymentModal.onClose(addCloseClass, resetStep)"
            >
              取消
            </n-button>
            <n-button
              v-if="currentStep === STEP.payInfo"
              type="info"
              ghost
              @click="currentStep--"
              :loading="loading"
            >
              上一步
            </n-button>
            <n-button v-if="currentStep === STEP.payMethod" type="info" ghost @click="nextStep()">
              下一步
            </n-button>
            <n-button
              v-if="currentStep === STEP.payInfo"
              type="info"
              ghost
              @click="nextStep()"
              :loading="loading"
            >
              結帳 >
            </n-button>
            <n-button
              v-if="currentStep === STEP.complete"
              type="info"
              ghost
              @click="paymentModal.onClose(addCloseClass, resetStep)"
            >
              關閉
            </n-button>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<style lang="scss" scoped>
@import '@/styles/styles';

.modal-mask {
  width: 100vw;
  height: 100vh;
  background: $modal-bg-color;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10000;

  .modal {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: $bg-color;
    border-radius: 10px;
    width: 600px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    animation: onOpen 0.5s ease forwards;

    &.close {
      animation: onClose 0.5s ease forwards;
    }

    @keyframes onOpen {
      0% {
        top: 70%;
        opacity: 0;
      }
    }

    @keyframes onClose {
      100% {
        top: 70%;
        opacity: 0;
      }
    }

    @include md {
      width: 500px;
    }

    @include sm {
      width: 100%;
      height: 100%;
    }

    .body {
      display: flex;
      flex-direction: column;
      gap: 10px;
      .category-wrap {
        font-size: 1rem;
        .category {
          padding: 5px;
          background: $bg-color2;
          color: $text-color2;
          display: flex;
          justify-content: center;
          font-weight: bold;
        }
        .btn-group {
          display: flex;
          padding: 1rem;
          justify-content: center;
          > div {
            padding: 5px 10px;
            border-radius: 5px;
            background: $border-color;
            color: $text-color2;
            cursor: pointer;
            &.selected {
              border: 1px solid $text-color2;
            }
          }
        }
      }

      .payInfo {
        display: flex;
        flex-direction: column;
        gap: 10px;
        font-size: 1rem;
        .title {
          padding: 5px;
          background: $bg-color2;
          color: $text-color2;
          display: flex;
          justify-content: center;
          font-weight: bold;
        }
        .body {
          .card-wrap {
            padding: 10px;
            display: flex;
            justify-content: center;
          }
        }
      }
    }
    .footer {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
    }
  }
}
</style>

<script setup lang="ts">
import { ref, watch, type Ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'
import { usePaymentModalStore } from '@/stores/usePaymentModal'
import { Times } from '@vicons/fa'
import { AlertCircleOutline } from '@vicons/ionicons5'
import { useMessage } from 'naive-ui'
import type { IRating } from '@/types'
import { isEmail, isMobilePhone } from 'validator'
import { api } from '@/plugins/axios'
import { compareObjects, timeFromNow } from '@/composables'

import CreditCard from '@/components/cards/CreditCard.vue'

const { isOpen } = storeToRefs(usePaymentModalStore())
const { email, name, cellphone, address } = storeToRefs(useUserStore())
const message = useMessage()
const paymentModal = usePaymentModalStore()

const emit = defineEmits<{
  (e: 'update'): void
}>()

enum STEP {
  payMethod = 1,
  payInfo = 2,
  complete = 3
}

const currentStep = ref(STEP.payMethod)
const loading = ref(false)

// recipientEmail 非必要
const paymentForm: any = ref({
  payMethod: '',
  deliveryMethod: '',
  recipientName: name.value,
  recipientPhone: cellphone.value,
  recipientAddress: address.value,
  recipientEmail: email.value
})

const creditCardForm = ref({
  name: '',
  number: '',
  expireM: '',
  expireY: '',
  cvv: '',
  onBack: false
})

/**
 * 是否被選中
 * @param method 付款方法
 */
function payMethodSelected(method: string) {
  if (paymentForm.value.payMethod === method) return 'selected'
  return ''
}

function nextStep() {
  if (currentStep.value === STEP.payMethod) {
    if (paymentForm.value.payMethod === '') {
      message.warning('請選擇付款方式')
    } else {
      currentStep.value++
    }
    return
  }

  if (currentStep.value === STEP.payInfo) {
    currentStep.value++
    return
  }
}

/** 跳窗加 class 變更動畫 */
function addCloseClass() {
  const modal: HTMLElement = document.querySelector('.modal')!
  if (!modal) return
  modal.classList.add('close')
}

/** 重製步驟(關視窗執行) */
function resetStep() {
  currentStep.value = 1
  paymentForm.value = {
    payMethod: '',
    deliveryMethod: '',
    recipientName: name.value,
    recipientPhone: cellphone.value,
    recipientAddress: address.value,
    recipientEmail: email.value
  }
  creditCardForm.value = {
    name: '',
    number: '',
    expireM: '',
    expireY: '',
    cvv: '',
    onBack: false
  }
}
</script>
