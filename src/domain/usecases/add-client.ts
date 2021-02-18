import { ClientModel } from '../models/client'

export interface AddClientModel {
  name: string
  email: string
  favoriteProducts?: any[]
}

export interface AddClient {
  add (client: AddClientModel): Promise<ClientModel>
}