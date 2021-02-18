import { ClientModel } from "../../domain/models/client";
import { AddClientModel } from "../../domain/usecases/add-client";

export interface AddClientRepository {
  add (clientData: AddClientModel): Promise<ClientModel> 
}