import { EditClientController } from '../../presentation/controllers/edit-client/edit-client'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'
import { DbEditClient } from '../../data/usecases/edit-client/db-Edit-client'
import { ClientMongoRepository } from '../../infra/db/mongodb/client-repository/client'

export const makeEditClientController = (): EditClientController => {
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const clientMongoRepository = new ClientMongoRepository()
  const dbEditClient = new DbEditClient(clientMongoRepository)
  return new EditClientController(emailValidatorAdapter, dbEditClient)
}