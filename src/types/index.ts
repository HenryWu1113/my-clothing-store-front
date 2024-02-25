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
  ratings: any
  sell: boolean
  sizes: string[]
  soldQuantity: number
  stockQuantity: number
  tags: string[]
  updatedAt: string
  _id: string
}
