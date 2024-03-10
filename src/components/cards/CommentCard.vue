<template>
  <div class="comment-card">
    <div class="my-comment-wrap">
      <div class="user-info">
        <div class="avatar">
          <img :src="rating.user.avatar" />
        </div>
        <div class="user-name">
          <p>{{ rating.user.name ?? `使用者 ${rating.user._id}` }}</p>
        </div>
        <n-dropdown
          trigger="click"
          placement="left"
          :options="[
            {
              label: '檢舉評論',
              key: 'report'
            }
          ]"
          @select="clickDropdown"
        >
          <n-icon v-show="userId !== rating.user._id" :component="EllipsisVerticalSharp"></n-icon>
        </n-dropdown>
      </div>
      <div class="user-rating">
        <n-rate size="large" readonly :title="rating.score" :value="rating.score" />
        <p>{{ timeFromNow(rating.createdAt) }}</p>
        <div class="comment" v-if="rating.description && rating.description.length > 0">
          {{ rating.description }}
        </div>
        <div class="preview-img-wrap" v-if="rating.images.length > 0">
          <n-image-group>
            <n-image v-for="imgsrc in rating.images" :key="imgsrc" :src="imgsrc" />
          </n-image-group>
        </div>
        <div class="thumb-wrap">
          <n-icon
            @click="editRatingThumb"
            v-if="rating.thumb.includes(userId)"
            :component="ThumbsUp"
          ></n-icon>
          <n-icon @click="editRatingThumb" v-else :component="ThumbsUpOutline"></n-icon>
          <p>{{ rating.thumb.length || '' }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/styles';
.comment-card {
  display: flex;
  flex-direction: column;
  padding: 1rem;
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
    }
    .n-icon {
      margin-left: auto;
      cursor: pointer;
      font-size: 20px;
      :hover {
        opacity: 0.9;
      }
    }
  }

  .user-rating {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: auto;
    .comment {
      font-size: 1rem;
    }
    .preview-img-wrap {
      display: flex;
      align-items: center;
      gap: 10px;
      :deep(.n-image) {
        > img {
          width: 100px !important;
          height: 100px !important;
          object-fit: cover !important;
          border-radius: 3px;
        }
      }
    }

    .thumb-wrap {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 1rem;
      .n-icon {
        font-size: 1.2rem;
        cursor: pointer;
      }
    }
  }
}
</style>

<script setup lang="ts">
import type { IRating } from '@/types'
import { EllipsisVerticalSharp, ThumbsUpOutline, ThumbsUp } from '@vicons/ionicons5'
import { api } from '@/plugins/axios'
import { timeFromNow } from '@/composables'
import { useMessage, useDialog } from 'naive-ui'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'

const message = useMessage()
const dialog = useDialog()
const { userId } = storeToRefs(useUserStore())

const props = defineProps({
  rating: {
    type: Object as () => IRating,
    required: true
  }
})

const emit = defineEmits<{
  (e: 'update'): void
}>()

function clickDropdown(key: string | number) {
  if (key === 'report') {
    const d = dialog.warning({
      title: '檢舉',
      content: '確認檢舉評論?',
      positiveText: '確認',
      negativeText: '取消',
      onPositiveClick: () => {
        d.loading = true
        message.success('已檢舉')
      }
    })
  }
}

async function editRatingThumb() {
  try {
    await api('auth').patch(`/ratings/thumb/${props.rating._id}`)
    emit('update')
  } catch (error: any) {
    message.error(error.isAxiosError ? error.response.data.message : error.message)
  }
}
</script>
