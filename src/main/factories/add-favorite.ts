import { AddFavoriteController } from '../../presentation/controllers/add-favorite/add-favorite'
import { DbAddFavorite } from '../../data/usecases/add-favorite/db-add-favorite'
import { ClientMongoRepository } from '../../infra/db/mongodb/client-repository/client'

export const makeAddFavoriteController = (): AddFavoriteController => {
  const clientMongoRepository = new ClientMongoRepository()
  const dbAddClient = new DbAddFavorite(clientMongoRepository)
  return new AddFavoriteController(dbAddClient)
}