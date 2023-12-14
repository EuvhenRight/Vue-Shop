export interface Card {
  id?: number
  imageUrl: string
  title: string
  price: number
  isFavorite?: boolean
  isAddedToCart?: boolean
  favoritesId?: number
}

export interface FetchFiltersParams {
  sortBy: string
  title?: string
}

export interface CardFavorite {
  id?: number
  parentId?: number
}

export interface CardActionType {
  onClickFavorite?: () => void
  onClickPlusCard?: () => void
}
