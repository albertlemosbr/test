export interface ClientModel {
  id: string
  name: string
  email: string
  favoriteProducts: FavoriteProducts[]
}

type FavoriteProducts = {
  price: number
  image: string
  brand: string
  id: string
  title: string
}