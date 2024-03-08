/**
 * 商品資料結構格式
 */
export interface IProduct {
  clothingGender: 'male' | 'female'
  clothingPart: 'shirts' | 'pants'
  colors: string[]
  createdAt: string
  description: string
  discountRate: number
  images: string[]
  name: string
  price: number
  ratings: { _id: string; score: number }[]
  sell: boolean
  sizes: string[]
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
  clerk: string
  images: string[]
  products: {
    product: string
    color: string
    size: string
    _id: string
  }
  show: boolean
  createdAt: string
  updatedAt: string
}
