import { ClientModel } from "../../domain/models/client";

export interface LoadClientRepository {
  load (id?: string): Promise<ClientModel[]>
}