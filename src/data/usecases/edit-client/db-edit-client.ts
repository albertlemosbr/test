import { EditClient, EditClientModel, ClientModel, EditClientRepository } from './db-edit-client-protocols'

export class DbEditClient implements EditClient { 

  constructor (private readonly editClientRepository: EditClientRepository) {
    this.editClientRepository = editClientRepository
  }

  async edit (clientData: EditClientModel): Promise<ClientModel> {
    const clientID = clientData.id
    delete clientData.id
    const client = await this.editClientRepository.edit(clientID, clientData )
    return client
  }
}  