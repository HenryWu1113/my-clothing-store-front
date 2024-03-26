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
              <div class="pay-info" v-if="paymentForm.payMethod === '信用卡一次付清'">
                <div class="title">付款資訊</div>
                <div class="body">
                  <div class="card-wrap">
                    <CreditCard :creditCardForm="creditCardForm" />
                  </div>
                  <n-form
                    ref="cardFormRef"
                    :label-width="80"
                    :model="creditCardForm"
                    :rules="rules"
                    size="medium"
                  >
                    <div class="card-info-wrap">
                      <n-form-item label="姓名" path="name">
                        <n-input
                          v-model:value="creditCardForm.name"
                          placeholder="請輸入姓名"
                        ></n-input>
                      </n-form-item>
                      <n-form-item label="信用卡號" path="number">
                        <n-input
                          v-model:value="creditCardForm.number"
                          placeholder="請輸入卡號"
                          maxlength="16"
                        ></n-input>
                      </n-form-item>
                      <n-form-item class="expired month" label="月份" path="expireM">
                        <n-input
                          v-model:value="creditCardForm.expireM"
                          maxlength="2"
                          placeholder="請輸入月份"
                        ></n-input>
                      </n-form-item>
                      <n-form-item class="expired year" label="年份" path="expireY">
                        <n-input
                          v-model:value="creditCardForm.expireY"
                          maxlength="2"
                          placeholder="請輸入年份"
                        ></n-input>
                      </n-form-item>
                      <n-form-item label="卡片背面後3碼" path="cvv">
                        <n-input
                          @focus="creditCardForm.onBack = true"
                          @blur="creditCardForm.onBack = false"
                          v-model:value="creditCardForm.cvv"
                          maxlength="3"
                          placeholder="請輸入卡片背面後3碼"
                        ></n-input>
                      </n-form-item>
                    </div>
                  </n-form>
                </div>
              </div>
              <div class="pay-info">
                <div class="title">收貨人</div>
                <div class="body">
                  <n-form
                    ref="cartFormRef"
                    :label-width="80"
                    :model="paymentForm"
                    :rules="realRules"
                    size="medium"
                  >
                    <div class="card-info-wrap">
                      <n-form-item label="姓名" path="recipientName">
                        <n-input
                          v-model:value="paymentForm.recipientName"
                          placeholder="請輸入姓名"
                        ></n-input>
                      </n-form-item>
                      <n-form-item label="電話" path="recipientPhone">
                        <n-input
                          v-model:value="paymentForm.recipientPhone"
                          placeholder="請輸入電話"
                        ></n-input>
                      </n-form-item>
                      <n-form-item label="地址" path="recipientAddress">
                        <n-input
                          v-model:value="paymentForm.recipientAddress"
                          placeholder="請輸入地址"
                        ></n-input>
                      </n-form-item>
                      <n-form-item label="信箱" path="recipientEmail">
                        <n-input
                          v-model:value="paymentForm.recipientEmail"
                          placeholder="請輸入信箱"
                        ></n-input>
                      </n-form-item>
                    </div>
                  </n-form>
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
              @click="handleValidateClick"
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
    max-height: 700px;
    overflow: auto;

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

      .pay-info {
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

          .card-info-wrap {
            display: flex;
            flex-wrap: wrap;
            color: $text-color2;

            > div {
              // display: flex;
              // flex-direction: column;
              // gap: 5px;
              // padding: 5px 0;
              width: 100%;

              &.expired {
                width: calc(50% - 5px);

                &.year {
                  margin-left: 10px;
                }
              }
            }
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
const { email, name, cellphone, address, userId } = storeToRefs(useUserStore())
const { checkout } = useUserStore()
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

const cardFormRef = ref<any>(null)
const cartFormRef = ref<any>(null)

// recipientEmail 非必要
const paymentForm: any = ref({
  payMethod: '',
  deliveryMethod: '宅配到府',
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

const rules = {
  name: {
    required: true,
    validator(rule: any, value: string) {
      if (value.length === 0) {
        return new Error('姓名必填')
      }
      return true
    },
    trigger: ['input', 'blur']
  },
  number: {
    required: true,
    validator(rule: any, value: string) {
      if (value.length === 0) {
        return new Error('信用卡號')
      } else if (!/^\d+$/.test(value)) {
        return new Error('錯誤信用卡號規格')
      } else if (value.length !== 16) {
        return new Error('錯誤信用卡號規格')
      }
      return true
    },
    trigger: ['input', 'blur']
  },
  expireM: {
    required: true,
    validator(rule: any, value: string) {
      if (value.length === 0) {
        return new Error('月份必填')
      }

      const month = parseInt(value, 10)
      if (!(!isNaN(month) && month >= 1 && month <= 12)) {
        return new Error('月份錯誤')
      }

      return true
    },
    trigger: ['input', 'blur']
  },
  expireY: {
    required: true,
    validator(rule: any, value: string) {
      if (value.length === 0) {
        return new Error('年份必填')
      } else if (!/^\d+$/.test(value)) {
        return new Error('年份錯誤')
      }
      return true
    },
    trigger: ['input', 'blur']
  },
  cvv: {
    required: true,
    validator(rule: any, value: string) {
      if (value.length === 0) {
        return new Error('卡片背面後3碼必填')
      } else if (!/^\d+$/.test(value)) {
        return new Error('格式錯誤')
      }
      return true
    },
    trigger: ['input', 'blur']
  }
}

const realRules = {
  recipientName: {
    required: true,
    validator(rule: any, value: string) {
      if (value.length === 0) {
        return new Error('收貨人必填')
      }
      return true
    },
    trigger: ['input', 'blur']
  },
  recipientPhone: {
    required: true,
    validator(rule: any, value: string) {
      if (value.length === 0) {
        return new Error('手機號碼必填')
      } else if (!isMobilePhone(value, 'zh-TW')) {
        return new Error('不合法手機號碼')
      }
      return true
    },
    trigger: ['input', 'blur']
  },
  recipientAddress: {
    required: true,
    message: '收貨地址必填',
    trigger: ['input', 'blur']
  },
  recipientEmail: {
    trigger: ['input', 'blur'],
    validator(rule: any, value: string) {
      if (value.length === 0) {
        return true
      } else if (!isEmail(value)) {
        return new Error('電子郵件信箱格式錯誤')
      }
      return true
    }
  }
}

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
    deliveryMethod: '宅配到府',
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

function handleValidateClick(e: MouseEvent) {
  console.log(e)
  console.log(cardFormRef.value)
  e.preventDefault()

  // 信用卡付款(需要信用卡驗證)
  if (cardFormRef.value) {
    cardFormRef.value?.validate((errors: any) => {
      if (!errors) {
        cartFormRef.value?.validate(async (errors: any) => {
          if (!errors) {
            try {
              await checkout(paymentForm.value)
              loading.value = true
              currentStep.value = STEP.complete
              emit('update')
              loading.value = false
            } catch (error: any) {
              error.isAxiosError && error?.response?.data
                ? message.error(error?.response?.data?.message)
                : message.error('訂購失敗')
              loading.value = false
            }
          }
        })
      }
    })
  } else {
    cartFormRef.value?.validate(async (errors: any) => {
      if (!errors) {
        try {
          await checkout(paymentForm.value)
          loading.value = true
          currentStep.value = STEP.complete
          emit('update')
          loading.value = false
        } catch (error: any) {
          error.isAxiosError && error?.response?.data
            ? message.error(error?.response?.data?.message)
            : message.error('訂購失敗')
          loading.value = false
        }
      }
    })
  }
}
</script>
