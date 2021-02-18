export interface FavoriteProducts {
  price: number
  image: string
  brand: string
  id: string
  title: string
}

export interface ClientModel {
  id: string
  name: string
  email: string
  favoriteProducts: FavoriteProducts[]
}
