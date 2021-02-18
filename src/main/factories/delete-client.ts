import { DeleteClientController } from '../../presentation/controllers/delete-client/delete-client'
import { DbDeleteClient } from '../../data/usecases/delete-client/db-delete-client'
import { ClientMongoRepository } from '../../infra/db/mongodb/client-repository/client'

export const makeDeleteClientController = (): DeleteClientController => {
  const clientMongoRepository = new ClientMongoRepository()
  const dbDeleteClient = new DbDeleteClient(clientMongoRepository)
  return new DeleteClientController(dbDeleteClient)
}