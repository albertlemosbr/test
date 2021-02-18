import { DeleteClient, DeleteClientRepository } from './db-delete-client-protocols'

export class DbDeleteClient implements DeleteClient { 

  constructor (private readonly deleteClientRepository: DeleteClientRepository) {
    this.deleteClientRepository = deleteClientRepository
  }

  async delete (id: string): Promise<boolean> {
    const client = await this.deleteClientRepository.delete(id)
    return client
  }
}  