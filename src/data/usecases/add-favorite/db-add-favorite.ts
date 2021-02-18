import { AddFavorite, AddFavoriteModel, ClientModel, AddFavoriteRepository, ConsumerMagalu } from './db-add-favorite-protocols'

export class DbAddFavorite implements AddFavorite {
  private readonly addFavoriteRepository: AddFavoriteRepository

  constructor (addFavoriteRepository: AddFavoriteRepository) {
    this.addFavoriteRepository = addFavoriteRepository
  }

  async addFavorite (favoriteData: AddFavoriteModel): Promise<ClientModel> {
    const consumerMagalu = new ConsumerMagalu()
    favoriteData.productFavorite = await consumerMagalu.getProduct(favoriteData.productId)

    const client = await this.addFavoriteRepository.addFavorite(favoriteData)
    return client
  }
} 