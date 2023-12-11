export interface Card {
  id?: number
  imageUrl: string
  title: string
  price: number
  isLiked?: boolean
  isAddedToCart?: boolean
}

export interface FetchFiltersParams {
  sortBy: string
  title?: string
}
