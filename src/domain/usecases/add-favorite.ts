import { ClientModel, FavoriteProducts } from '../models/client'

export interface AddFavoriteModel {
  clientId: string
  productId: string
  productFavorite? : FavoriteProducts
}

export interface AddFavorite {
  addFavorite (favoriteData: AddFavoriteModel): Promise<ClientModel>
}