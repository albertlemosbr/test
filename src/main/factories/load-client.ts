import { LoadClientController } from '../../presentation/controllers/load-client/load-client'
import { DbLoadClient } from '../../data/usecases/load-client/db-load-client'
import { ClientMongoRepository } from '../../infra/db/mongodb/client-repository/client'

export const makeLoadClientController = (): LoadClientController => {
  const clientMongoRepository = new ClientMongoRepository()
  const dbLoadClient = new DbLoadClient(clientMongoRepository)
  return new LoadClientController(dbLoadClient)
}