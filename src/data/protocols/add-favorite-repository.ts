import { ClientModel } from "../../domain/models/client";
import { AddFavoriteModel } from "../../domain/usecases/add-favorite";

export interface AddFavoriteRepository {
  addFavorite (favoriteData: AddFavoriteModel): Promise<ClientModel> 
}