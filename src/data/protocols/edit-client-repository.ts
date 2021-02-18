import { ClientModel } from "../../domain/models/client";
import { EditClientModel } from "../../domain/usecases/edit-client";

export interface EditClientRepository {
  edit (id: string, clientData: EditClientModel): Promise<ClientModel> 
}