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
  item_id?: number
}

export interface CardActionType {
  onClickFavorite?: () => void
  onClickPlusCard?: () => void
}

export interface OrderType {
  items: Card[]
  totalPrice: number
}

export interface CardListProps {
  cart: Card[]
  onAddToCart: (item: Card) => void
  onRemoveFromCart: (item: Card) => void
  addToFavorites: (item: Card) => void
}
