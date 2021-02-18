import { AddClientController } from '../../presentation/controllers/add-client/add-client'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'
import { DbAddClient } from '../../data/usecases/add-client/db-add-client'
import { ClientMongoRepository } from '../../infra/db/mongodb/client-repository/client'

export const makeAddClientController = (): AddClientController => {
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const clientMongoRepository = new ClientMongoRepository()
  const dbAddClient = new DbAddClient(clientMongoRepository)
  return new AddClientController(emailValidatorAdapter, dbAddClient)
}