<template>
  <div :class="['card', creditCardForm.onBack ? 'onBack' : '']">
    <div class="card-front">
      <div class="card-chip">
        <svg x="0px" y="0px" viewBox="0 0 100 100">
          <g transform="translate(0,-952.36218)">
            <path
              d="M 18,18 C 11.869627,18 7,23.41809 7,30 l 0,40 c 0,6.5819 4.869627,12 11,12 21.333333,0 42.666667,0 64,0 6.130373,0 11,-5.4181 11,-12 L 93,30 C 93,23.41809 88.130373,18 82,18 60.666667,18 39.333333,18 18,18 z m 0,2 23.46875,0 C 37.589245,22.564948 35,27.361832 35,33 l 0,4.6875 C 34.069867,37.259411 33.060307,37 32,37 L 9,37 9,30 c 0,-5.60609 4.050373,-10 9,-10 z m 30,0 4,0 c 6.043676,0 11,5.47378 11,13 0,2.009661 0,4.023816 0,6.03125 -0.251164,0.237363 -0.495555,0.475252 -0.71875,0.75 C 60.845717,41.54836 60,44.04215 60,47 l 0,5 c 0,2.9578 0.845717,5.4204 2.28125,7.1875 C 62.508873,59.467697 62.743321,59.757384 63,60 l 0,7 c 0,7.5263 -4.956311,13 -11,13 l -4,0 C 41.956311,80 37,74.5263 37,67 l 0,-7 c 0.256679,-0.242616 0.491127,-0.532303 0.71875,-0.8125 C 39.154283,57.4204 40,54.9578 40,52 l 0,-5 C 40,44.04215 39.154283,41.54836 37.71875,39.78125 37.491127,39.501051 37.256679,39.241295 37,39 l 0,-6 C 37,25.47378 41.956324,20 48,20 z M 58.53125,20 82,20 c 4.949627,0 9,4.39391 9,10 l 0,7 -23,0 c -1.060307,0 -2.069867,0.259411 -3,0.6875 L 65,33 C 65,27.361832 62.410755,22.564948 58.53125,20 z M 9,39 32,39 c 1.641597,0 3.092532,0.68336 4.1875,2.03125 C 37.282468,42.37914 38,44.41785 38,47 l 0,5 c 0,2.5822 -0.717532,4.5896 -1.8125,5.9375 C 35.092532,59.2854 33.641597,60 32,60 L 9,60 z m 59,0 23,0 0,21 -23,0 C 66.358403,60 64.907468,59.2854 63.8125,57.9375 62.717532,56.5896 62,54.5822 62,52 l 0,-5 c 0,-2.58215 0.717532,-4.62086 1.8125,-5.96875 C 64.907468,39.68336 66.358403,39 68,39 z M 35,61.34375 35,67 c 0,5.625803 2.572319,10.430848 6.4375,13 L 18,80 C 13.050373,80 9,75.6061 9,70 l 0,-8 23,0 c 1.060307,0 2.069867,-0.220772 3,-0.65625 z m 30,0 C 65.930133,61.779228 66.939693,62 68,62 l 23,0 0,8 c 0,5.6061 -4.050373,10 -9,10 L 58.5625,80 C 62.427681,77.430848 65,72.625803 65,67 z"
              transform="translate(0,952.36218)"
            ></path>
          </g>
        </svg>
      </div>
      <n-icon :component="CcVisa"></n-icon>
      <div class="card-number">{{ creditCardForm.number.replace(/(\d{4})(?=\d)/g, '$1 ') }}</div>
      <div class="card-holder">{{ creditCardForm.name }}</div>
      <div class="card-expires">
        <p>GOOD<br />THUR</p>
        <p>{{ creditCardForm.expireM.padStart(2, '0') }}/20{{ creditCardForm.expireY }}</p>
      </div>
    </div>
    <div class="card-back">
      <div class="strip"></div>
      <div class="cvv">cvv : {{ creditCardForm.cvv }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/styles';

.card {
  width: 60%;
  aspect-ratio: 7/4;
  position: relative;
  perspective: 500px;
  &.onBack {
    .card-front {
      transform: rotateY(-180deg);
    }
    .card-back {
      transform: rotateY(0deg);
    }
  }

  .card-front,
  .card-back {
    border-radius: 10px;
    width: 100%;
    height: 100%;
    background: url('../../assets/images/creditCardBG.jpg');
    transition: 1s;
    backface-visibility: hidden;
    position: absolute;
    left: 0;
    top: 0;
  }

  .card-front {
    .card-chip {
      position: absolute;
      top: 50px;
      left: 20px;
      width: 55px;
      height: 40px;
      background: #d4af37;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 7px;
    }
    .n-icon {
      position: absolute;
      top: 10px;
      right: 20px;
      font-size: 5rem;
      color: rgb(80, 80, 80);
    }
    .card-number {
      position: absolute;
      bottom: 50px;
      left: 20px;
      color: white;
      font-size: 1.4rem;
    }
    .card-holder {
      position: absolute;
      bottom: 20px;
      left: 20px;
      color: white;
      font-size: 1rem;
    }
    .card-expires {
      position: absolute;
      bottom: 20px;
      right: 20px;
      color: white;
      display: flex;
      align-items: center;
      gap: 5px;
      > p {
        &:first-child {
          font-size: 8px;
        }
        &:last-child {
          font-size: 1rem;
        }
      }
    }
  }

  .card-back {
    transform: rotateY(180deg);
    .strip {
      width: 100%;
      height: 40px;
      background: linear-gradient(135deg, #404040, #1a1a1a);
      position: absolute;
      top: 25px;
    }
    .cvv {
      position: absolute;
      width: 90%;
      height: 40px;
      background: white;
      top: 80px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: 0 20px;
    }
  }
}
</style>

<script setup lang="ts">
import { CcVisa } from '@vicons/fa'

const props = defineProps({
  creditCardForm: {
    type: Object as () => {
      name: string
      number: string
      expireM: string
      expireY: string
      cvv: string
      onBack: boolean
    },
    default: () => ({
      name: '',
      number: '',
      expireM: '',
      expireY: '',
      cvv: '',
      onBack: false
    })
  }
})
</script>
