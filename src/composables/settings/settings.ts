/** 上方選單項 */
export const menuSelection = [
  {
    key: 'man',
    text: '男裝',
    route: '/category?gender=男&categoryType=clothingPart'
  },
  {
    key: 'woman',
    text: '女裝',
    route: '/category?gender=女&categoryType=clothingPart'
  },
  {
    key: 'outfits',
    text: '穿搭',
    route: '/outfits'
  },
  {
    key: 'stores',
    text: '店鋪',
    route: '/stores'
  },
  {
    key: 'news',
    text: '最新消息',
    route: '/news'
  },
  {
    key: 'aboutUs',
    text: '關於我們',
    route: '/aboutus'
  }
]

type homeCarouselType = {
  key: string
  children: {
    key: string
    src: string
    type: 'video' | 'img'
    info: {
      title: string
      text: string
      price: null | string
      showBtn: boolean
      position: 'left' | 'right'
      textGradient?: string
      location?: string
    }
  }[]
}

/** 首頁輪播圖控制 */
export const homeCarousel: homeCarouselType[] = [
  {
    key: '1',
    children: [
      {
        key: '1-1',
        src: new URL('../../assets/images/home/video1new.mp4', import.meta.url).href,
        type: 'video',
        info: {
          title: '穿出自信，展現不凡',
          text: '好衣服讓你自信，更加突出與眾不同',
          price: null,
          showBtn: false,
          position: 'left',
          textGradient: 'error'
        }
      },
      {
        key: '1-2',
        src: new URL('../../assets/images/home/img1.jpg', import.meta.url).href,
        type: 'img',
        info: {
          title: '風格獨特，品味出眾',
          text: '獨特風格展現卓越品味，與眾不同',
          price: null,
          showBtn: true,
          position: 'left',
          textGradient: 'error',
          location: '/products?clothingGender=female&clothingPart=shirts&sort=integrate'
        }
      },
      {
        key: '1-3',
        src: new URL('../../assets/images/home/img2.jpg', import.meta.url).href,
        type: 'img',
        info: {
          title: '時尚從這裡開始',
          text: '在這裡找到你的時尚起點，引領潮流',
          price: null,
          showBtn: false,
          position: 'right',
          textGradient: 'info'
        }
      },
      {
        key: '1-4',
        src: new URL('../../assets/images/home/img3.jpg', import.meta.url).href,
        type: 'img',
        info: {
          title: '專屬你的時尚風格',
          text: '找到屬於自己的風格，獨一無二',
          price: null,
          showBtn: true,
          position: 'right',
          location: '/products?clothingGender=female&clothingPart=shirts&sort=integrate'
        }
      }
    ]
  },
  {
    key: '2',
    children: [
      {
        key: '2-1',
        src: new URL('../../assets/images/home/img4.jpg', import.meta.url).href,
        type: 'img',
        info: {
          title: '簡約不凡，時尚永恆',
          text: ' 簡約風格卻不失卓越，永不過時',
          price: null,
          showBtn: true,
          position: 'right',
          location: '/products?clothingGender=female&clothingPart=pants&sort=integrate'
        }
      },
      {
        key: '2-2',
        src: new URL('../../assets/images/home/img5.jpg', import.meta.url).href,
        type: 'img',
        info: {
          title: '品味生活，從穿著開始',
          text: '衣著展現品味，從這裡開始精彩生活',
          price: null,
          showBtn: true,
          position: 'right',
          location: '/products?clothingGender=male&clothingPart=tshirts&sort=integrate'
        }
      },
      {
        key: '2-3',
        src: new URL('../../assets/images/home/img6.jpg', import.meta.url).href,
        type: 'img',
        info: {
          title: '穿出個性，展現魅力',
          text: '衣服展現個性，散發自身獨特魅力',
          price: null,
          showBtn: true,
          position: 'left'
        }
      },
      {
        key: '2-4',
        src: new URL('../../assets/images/home/img7.jpg', import.meta.url).href,
        type: 'img',
        info: {
          title: '讓衣服成為你的語言',
          text: '用衣服表達自我，成為你的語言',
          price: null,
          showBtn: false,
          position: 'left'
        }
      }
    ]
  },
  {
    key: '3',
    children: [
      {
        key: '3-1',
        src: new URL('../../assets/images/home/img8.jpg', import.meta.url).href,
        type: 'img',
        info: {
          title: '一件衣服，一段故事',
          text: ' 每一件衣服背後都有一個故事，成就你的故事',
          price: null,
          showBtn: true,
          position: 'right'
        }
      },
      {
        key: '3-2',
        src: new URL('../../assets/images/home/img9.jpg', import.meta.url).href,
        type: 'img',
        info: {
          title: '時尚風格，唯我獨尊',
          text: '在這裡打造只屬於你的時尚風格',
          price: null,
          showBtn: true,
          position: 'left'
        }
      },
      {
        key: '3-3',
        src: new URL('../../assets/images/home/img10.jpg', import.meta.url).href,
        type: 'img',
        info: {
          title: '時尚不僅是風格，更是態度',
          text: '時尚不僅是外在表現，更是內在態度的展示',
          price: null,
          showBtn: true,
          position: 'right',
          textGradient: 'info'
        }
      },
      {
        key: '3-4',
        src: new URL('../../assets/images/home/img11.jpg', import.meta.url).href,
        type: 'img',
        info: {
          title: '經典再現，風格永恆',
          text: '經典款式永不過時，展現永恆風格',
          price: null,
          showBtn: true,
          position: 'right'
        }
      }
    ]
  },
  {
    key: '4',
    children: [
      {
        key: '4-1',
        src: new URL('../../assets/images/home/img12.jpg', import.meta.url).href,
        type: 'img',
        info: {
          title: '舒適至上，品味生活',
          text: '追求舒適感，享受高品味生活',
          price: null,
          showBtn: true,
          position: 'right'
        }
      },
      {
        key: '4-2',
        src: new URL('../../assets/images/home/img13.jpg', import.meta.url).href,
        type: 'img',
        info: {
          title: '穿上夢想，展現自我',
          text: ' 每一件衣服都是夢想的一部分，穿上它們展現真正的自我',
          price: null,
          showBtn: true,
          position: 'left'
        }
      },
      {
        key: '4-3',
        src: new URL('../../assets/images/home/img14.jpg', import.meta.url).href,
        type: 'img',
        info: {
          title: '風格無限，舞出青春',
          text: '隨心所欲地展現風格，與青春共舞',
          price: null,
          showBtn: true,
          position: 'left'
        }
      },
      {
        key: '4-4',
        src: new URL('../../assets/images/home/img15.jpg', import.meta.url).href,
        type: 'img',
        info: {
          title: '打造時尚典範，引領潮流',
          text: '不僅展現時尚，更引領時尚潮流的發展',
          price: null,
          showBtn: true,
          position: 'right',
          textGradient: 'error'
        }
      }
    ]
  }
]
