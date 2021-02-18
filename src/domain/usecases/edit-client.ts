import { ClientModel } from '../models/client'

export interface EditClientModel {
  id: string
  name?: string
  email?: string
}

export interface EditClient {
  edit (client: EditClientModel): Promise<ClientModel>
}