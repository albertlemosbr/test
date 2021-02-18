import { LoadClient, ClientModel, LoadClientRepository,  } from './db-load-protocols'

export class DbLoadClient implements LoadClient {
  constructor (private readonly loadClientRepository: LoadClientRepository) {
    this.loadClientRepository = loadClientRepository   
  }

  async load (id?: string): Promise<ClientModel[]> {
    const clients = await this.loadClientRepository.load(id)
    return clients
  }
}  