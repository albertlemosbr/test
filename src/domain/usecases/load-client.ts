import { ClientModel } from '../models/client'

export interface LoadClient {
  load (id?: string): Promise<ClientModel[]>
}