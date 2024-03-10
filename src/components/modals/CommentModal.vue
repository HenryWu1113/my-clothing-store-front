<template>
  <Teleport to="body">
    <transition name="modal">
      <div v-if="isOpen" class="modal-mask">
        <div class="modal">
          <div class="modal-title">
            <p>{{ productName }}</p>
            <n-icon :component="Times" @click="commentModal.onClose(addCloseClass)"></n-icon>
          </div>
          <div class="modal-body">
            <div class="user-info">
              <div class="avatar">
                <img :src="avatar" />
              </div>
              <div class="user-name">
                <p>{{ name ?? '沒有名字的人' }}</p>
                <div>
                  <p>此評論會在此購物平台公開發布</p>
                  <n-tooltip :style="{ maxWidth: '300px' }" trigger="hover">
                    <template #trigger>
                      <n-icon :component="AlertCircleOutline"></n-icon>
                    </template>
                    <p>
                      貼文會連同個人資料名稱、連結及相片公開顯示。
                      貼文必須符合此服務平台要求的規定。<br />您隨時可以刪除自己的貼文。
                      查看內容政策 你針對 Beta
                      版問題的回答，在實驗期間可能不會公開顯示，只有你自己和/或其他參與實驗的人看得到。我們可能會在實驗結束後刪除答案。
                    </p>
                  </n-tooltip>
                </div>
              </div>
            </div>
            <div class="user-rating">
              <n-rate
                size="large"
                :default-value="commentForm.score"
                @update:value="scoreOnUpdate"
              />
              <n-input
                maxlength="20"
                show-count
                v-model:value="commentForm.description"
                type="textarea"
                placeholder="請輸入商品評論"
              />
            </div>
            <div class="img-wrap">
              <div class="add-btn">
                <label for="commentImgUpload" class="btn">
                  {{ commentForm.previewImages.length === 0 ? '新增照片' : '編輯照片' }}
                </label>
                <InputImage id="commentImgUpload" multiple @update-multiple="imageUpdate" />
              </div>
              <div class="preview-img-wrap">
                <n-image-group>
                  <n-image
                    v-for="imgsrc in commentForm.previewImages"
                    :key="imgsrc"
                    :src="imgsrc"
                  />
                </n-image-group>
              </div>
            </div>
            <div class="submit-btns">
              <n-button type="warning" ghost @click="commentModal.onClose(addCloseClass)">
                取消
              </n-button>
              <n-button type="info" ghost :loading="commentForm.loading" @click="sendComment()">
                確認
              </n-button>
            </div>
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
    .modal-title {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: 1rem;
      font-size: 20px;
      font-weight: bold;
      color: $text-color2;
      > p {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
      > .n-icon {
        cursor: pointer;
      }
    }

    .modal-body {
      padding: 2rem;
      display: flex;
      flex-direction: column;
      gap: 10px;
      .user-info {
        display: flex;
        align-items: center;
        gap: 1rem;
        .avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          overflow: hidden;
          > img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        .user-name {
          display: flex;
          flex-direction: column;
          gap: 5px;
          color: $text-color2;
          > p {
            font-size: 1.2rem;
          }
          > div {
            display: flex;
            align-items: center;
            .n-icon {
              margin-left: 0.5rem;
              font-size: 1.2rem;
              cursor: pointer;
            }
          }
        }
      }
      .user-rating {
        padding-top: 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        .n-rate {
          --n-item-size: 30px !important;
        }
        .n-input--textarea {
          --n-font-size: 1rem !important;
        }
      }
      .img-wrap {
        display: flex;
        flex-direction: column;
        padding-top: 1.5rem;
        gap: 10px;
        .add-btn {
          display: flex;
          justify-content: center;
          .btn {
            cursor: pointer;
            font-size: 14px;
            color: $info;
            padding: 0.3rem 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid $info;
            border-radius: 100px;
            &:hover {
              opacity: 0.9;
            }
          }
        }
        .preview-img-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
          justify-content: center;
          :deep(.n-image) {
            > img {
              width: 150px !important;
              height: 150px !important;
              object-fit: cover !important;
              @include md {
                width: 100px !important;
                height: 100px !important;
              }
            }
          }
        }
      }
      .submit-btns {
        display: flex;
        justify-content: flex-end;
        gap: 1rem;
        padding-top: 0.5rem;
      }
    }

    .modal-footer {
      color: $text-color;
      border-top: 1px solid $border-color;
      padding: 10px;
      .quick-login {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        .n-icon {
          font-size: 2rem;
          cursor: pointer;
        }
      }

      .goto-login {
        display: flex;
        justify-content: flex-end;
        > p {
          font-size: 1rem;
          cursor: pointer;
        }
      }
    }
  }
}
</style>

<script setup lang="ts">
import { ref, watch, type Ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'
import { useCommentModalStore } from '@/stores/useCommentModal'
import { Times } from '@vicons/fa'
import { AlertCircleOutline } from '@vicons/ionicons5'
import { useMessage } from 'naive-ui'
import type { IRating } from '@/types'
import { isEmail, isMobilePhone } from 'validator'
import { api } from '@/plugins/axios'
import { compareObjects, timeFromNow } from '@/composables'

import InputImage from '../InputImage.vue'

const { isOpen } = storeToRefs(useCommentModalStore())
const { avatar, name } = storeToRefs(useUserStore())
const message = useMessage()
const commentModal = useCommentModalStore()

const props = defineProps({
  productName: {
    type: String,
    required: true
  },
  productId: {
    type: String,
    required: true
  },
  myRating: {
    type: Object as () => IRating | {},
    default: () => ({})
  }
})

const emit = defineEmits<{
  (e: 'update'): void
}>()

/** 評論內容 */
const commentForm: Ref<{ [key: string]: any }> = ref({
  score: 0,
  description: '',
  images: [],
  previewImages: [] as string[],
  loading: false
})

/** rate 元件沒有 v-model 只能用 emit 事件去改值 */
const scoreOnUpdate = (value: number) => {
  console.log(value)
  commentForm.value.score = value
}

/** 跳窗加 class 變更動畫 */
function addCloseClass() {
  const modal: HTMLElement = document.querySelector('.modal')!
  if (!modal) return
  modal.classList.add('close')
}

/** 新增修改評論 */
async function sendComment() {
  const fd = new FormData()
  for (const key in commentForm.value) {
    if (['previewImages', 'loading'].includes(key)) {
      continue
    } else if (key === 'images') {
      for (const val of commentForm.value[key]) {
        fd.append(key, val)
      }
    } else {
      fd.append(key, commentForm.value[key])
    }
  }
  fd.append('product', props.productId)

  try {
    commentForm.value.loading = true
    // 新增
    if (compareObjects(props.myRating, {})) {
      await api('auth').post('/ratings', fd)
    } else {
      // 修改
      // 多傳了商品的 id 應該沒關係
      // @ts-ignore
      await api('auth').patch(`/ratings/edit/${props.myRating._id}`, fd)
    }
    emit('update')
    commentModal.onClose(addCloseClass)
    message.success('評論完成')
  } catch (error: any) {
    console.log(error)
    message.error(error.isAxiosError ? error.response.data.message : error.message)
  }
  commentForm.value.loading = false
}

/** 取的我的評論(如果有的話去改 commentForm) */
function getMyComment() {
  console.log(props.myRating)
  if (compareObjects(props.myRating, {})) {
    // @ts-ignore
    commentForm.value.score = 0
    // @ts-ignore
    commentForm.value.description = ''
    // @ts-ignore
    commentForm.value.previewImages = []
  } else {
    // @ts-ignore
    commentForm.value.score = props.myRating.score
    // @ts-ignore
    commentForm.value.description = props.myRating.description
    // @ts-ignore
    commentForm.value.previewImages = props.myRating.images
  }
}

function imageUpdate(obj: { images: FileList; previewImages: string[] }) {
  console.log(obj)
  commentForm.value.images = obj.images
  commentForm.value.previewImages = obj.previewImages
}

// 打開評論視窗確認是否有評論過
watch(isOpen, (newVal) => {
  if (newVal) {
    getMyComment()
  }
})
</script>
