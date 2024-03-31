<template>
  <div class="aboutus-page myContainer min-h-screen">
    <div class="top-img-wrap">
      <img src="../assets/images/aboutus/AboutusTop.jpg" alt="" />
      <div class="title">
        <p>Get to Know</p>
        <p>Us</p>
      </div>
    </div>
    <div class="store-wrap">
      <div class="left">
        <div class="title">
          <p>綻放時尚之花&nbsp;&nbsp; 探索品牌背後的故事</p>
          <p></p>
        </div>
        <div class="img-gallary">
          <div class="top">
            <img src="../assets/images/aboutus/img3.jpg" alt="" />
          </div>
          <div class="left">
            <img src="../assets/images/aboutus/img1.jpg" alt="" />
          </div>
          <div class="bottom">
            <img src="../assets/images/aboutus/img2.jpg" alt="" />
          </div>
        </div>
      </div>
      <div class="right">
        <div>
          <p>初心與夢想</p>
          <p>
            我們的故事始於對時尚的熱愛和對美好生活的追求。
            品牌名字的由來，源自於我們對獨特、高質感服裝的不懈追求。
            從最初的一抹靈感，我們立志要打造出獨具風格、令人眼前一亮的服裝品牌，為每個追求優雅、自信風格的人提供精緻的選擇。
          </p>
        </div>
        <div>
          <p>匠心與品質</p>
          <p>
            在品牌成長的過程中，我們始終秉持著匠心精神，對每一件服裝都追求極致的品質和細節。
            我們與優秀的設計師團隊合作，傾心打造每個設計，從布料的選擇到裁剪的工藝，都經過嚴格把關，只為呈現最完美的穿著體驗。
          </p>
        </div>
        <div>
          <p>創新與時尚</p>
          <p>
            隨著時代的變遷，我們不斷融入創新元素，挖掘時尚的多元性，讓品牌煥發出更多的活力與活力。
            我們積極探索永續發展的道路，致力於打造出既具有時尚潮流感又環保永續的產品，為時尚產業帶來更多的可能性。
          </p>
        </div>
        <div>
          <p>共享與成長</p>
          <p>
            我們深知，一個品牌的成功離不開與您的共同成長與支持。
            因此，我們將品牌文化融入每一件產品中，希望能傳遞出我們對美好生活的嚮往與追求，並與您共同分享時尚與美好。
            我們願意與您一同探索，一同成長，創造更多美好的時刻。
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/styles';

.aboutus-page {
  display: flex;
  flex-direction: column;

  .top-img-wrap {
    border-radius: 50px;
    // overflow: hidden;
    height: 400px;
    position: relative;
    box-shadow: 0 2px 10px $border-color;

    > img {
      object-fit: cover;
      border-radius: 50px;
      width: 100%;
      height: 100%;
      object-position: center;
    }
    .title {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      border-radius: 20px;
      font-weight: bold;
      // box-shadow: 0 2px 10px $border-color;
      bottom: -50px;
      padding: 1rem 2rem;
      background: $bg-color;
      font-size: 3rem;
      opacity: 0;
      @extend %AshowEffect;
      display: flex;
      align-items: center;
      gap: 1rem;
      > p {
        &:first-child {
          color: $text-color2;
        }
        &:last-child {
          color: $info;
        }
      }
    }
  }

  .store-wrap {
    margin-top: 10rem;
    display: flex;
    gap: 2rem;
    opacity: 0;
    @extend %AshowEffect;
    > div {
      &.left {
        width: calc(60% - 1rem);

        > .title {
          color: $text-color2;
          > p {
            font-size: 2rem;
            font-weight: bold;
          }
        }
        .img-gallary {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 2rem;
          > div {
            // border: 1px solid #000;
            &.top {
              width: 100%;
              aspect-ratio: 3/1;
            }
            &.left {
              width: calc(25% - 5px);
              // height: 500px;
              > img {
                object-position: 100% center;
              }
            }
            &.bottom {
              width: calc(75% - 5px);
            }
            > img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }
        }
      }
      &.right {
        width: calc(40% - 1rem);
        color: $text-color2;
        display: flex;
        flex-direction: column;
        gap: 2rem;
        opacity: 0;
        // padding-top: 5rem;
        @extend %AshowEffect;
        > div {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          // border-bottom: 1px solid $border-color;
          padding-bottom: 1rem;
          // &:nth-child(even) {
          //   > p:first-child {
          //     text-align: end;
          //   }
          // }
          > p {
            color: $text-color2;
            &:first-child {
              font-size: 1.5rem;
              font-weight: bold;
            }
            &:last-child {
              font-size: 1.1rem;
            }
          }
        }
      }
    }
  }
}
</style>

<script setup lang="ts"></script>
