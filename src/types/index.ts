/**
 * 商品資料結構格式
 */
export interface IProduct {
  clothingGender: '男' | '女'
  clothingPart: string
  colors: ICategory[]
  createdAt: string
  description: string
  discountRate: number
  images: string[]
  name: string
  price: number
  ratings: { _id: string; score: number }[]
  sell: boolean
  sizes: ICategory[]
  soldQuantity: number
  stockQuantity: number
  tags: string[]
  updatedAt: string
  _id: string
}

/**
 * 穿搭資料結構格式
 */
export interface IOutfit {
  _id: string
  outfitName: string
  description: string
  clerk: {
    avatar: string | undefined
    height: number | undefined
    weight: number | undefined
    sex: '男' | '女'
    _id: string
    name: string | undefined
    store: {
      _id: string
      name: string
    }
    introduce: string | undefined
  }
  images: string[]
  products: {
    product: IProduct[]
    color: ICategory
    size: ICategory
    _id: string
  }[]
  show: boolean
  createdAt: string
  updatedAt: string
}

/**
 * 評分資料結構格式
 */
export interface IRating {
  _id: string
  user: {
    _id: string
    name: string
    avatar: string
  }
  product: string
  score: number
  description: string
  thumb: string[]
  images: string[]
  createdAt: string
  updatedAt: string
}

/**
 * 最新消息資料結構格式
 */
export interface INews {
  _id: string
  title: string
  content: string
  image?: string
  show: boolean
  createdAt: string
  updatedAt: string
}

/**
 * 分類資料結構格式
 */
export interface ICategory {
  _id: string
  categoryType: string
  gender: string
  key: string
  name: string
  createdAt: string
  updatedAt: string
}

/**
 * 店鋪資料結構格式
 */
export interface IStore {
  _id: string
  name: string
  phone: string
  address: string
  position: string
  googleMapAddress: string
  openingTime: string
  sellSeries: {
    _id: string
    key: string
    name: string
    gender: string
    categoryType: string
    updatedAt: string
    createdAt: string
  }[]
  updatedAt: string
  createdAt: string
}

/**
 * 購物車資料結構格式
 */
export interface ICart {
  _id: string
  product: IProduct
  color: ICategory
  quantity: number
  size: ICategory
}

/**
 * 品牌資料結構格式
 */
export interface IBrand {
  _id: string
  name: string
  deliveryFee: number
  freeDeliveryFee: number
  updatedAt: string
  createdAt: string
}

/**
 * 訂單資料結構格式
 */
export interface IOrder {
  _id: string
  user: string
  deliveryFee: number
  deliveryMethod: string
  orderStatus: string
  payMethod: string
  payStatus: string
  products: {
    _id: string
    color: ICategory
    size: ICategory
    quantity: number
    price: number
    product: IProduct
  }[]
  recipientAddress: string
  recipientEmail?: string
  recipientName: string
  recipientPhone: string
  sendStatus: string
  totalAmount: number
  updatedAt: string
  createdAt: string
}

/**
 * 使用者資料結構格式
 */
export interface IUser {
  _id: string
  email: string
  disabled: boolean
  address?: string
  avatar?: string
  backgroundImg?: string
  birthday?: string
  cellphone?: string
  name?: string
  sex?: '男' | '女'
  updatedAt: string
  createdAt: string
}

/**
 * 管理者(員工)資料結構格式
 */
export interface IAdmin {
  _id: string
  account: string
  address?: string
  avatar?: string
  birthday?: string
  cellphone?: string
  disabled: boolean
  email: string
  height?: number
  weight?: number
  introduce?: string
  name: string
  role: 'manager' | 'clerk'
  sex: '男' | '女'
  store: IStore
  updatedAt: string
  createdAt: string
}
