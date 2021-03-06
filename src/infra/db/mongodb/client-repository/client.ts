import { AddClientRepository } from '../../../../data/protocols/add-client-repository'
import { AddClientModel } from '../../../../domain/usecases/add-client'
import { EditClientModel } from '../../../../domain/usecases/edit-client'
import { ClientModel } from '../../../../domain/models/client'
import { MongoHelper } from '../helpers/mongo-helper'
import { LoadClientRepository } from '../../../../data/protocols/load-client-repository'
import { ObjectId } from 'mongodb'
import { EditClientRepository } from '../../../../data/protocols/edit-client-repository'
import { DeleteClientRepository } from '../../../../data/protocols/delete-client-repository'
import { AddFavoriteRepository } from '../../../../data/protocols/add-favorite-repository'
import { AddFavoriteModel } from '../../../../domain/usecases/add-favorite'

export class ClientMongoRepository implements AddClientRepository, LoadClientRepository, EditClientRepository, DeleteClientRepository, AddFavoriteRepository {
  async add (clientData: AddClientModel): Promise<ClientModel> {
    const clientCollection = MongoHelper.getCollection('clients')
    const clientExist = await clientCollection.findOne({ email: clientData.email })
    if(clientExist) {
      return MongoHelper.mapper(clientExist)
    }

    const result = await clientCollection.insertOne(clientData)
    return MongoHelper.mapper(result.ops[0])
  }

  async load(id?: string): Promise<ClientModel[]> {
    const clientCollection = MongoHelper.getCollection('clients')

    if (!id) {
      const clientList = await clientCollection.find().toArray()
      return MongoHelper.mapperList(clientList)
    }

    const result = await clientCollection.find({ _id: new ObjectId(id) }).toArray()
    return MongoHelper.mapperList(result)
  }

  async edit(id: string, clientData: EditClientModel): Promise<ClientModel> {
    const clientCollection = MongoHelper.getCollection('clients')
    const edit = await clientCollection.findOneAndUpdate(
      { _id: new ObjectId(id) }, 
      { 
        $set: {
          ...clientData
        }
      },
      {
        upsert: true
      }
    )

    const result = await clientCollection.findOne({ _id: new ObjectId(id) })
    return MongoHelper.mapper(result)
  }

  async delete(id: string): Promise<boolean> {
    const clientCollection = MongoHelper.getCollection('clients')
    const deleteClient = await clientCollection.deleteOne({ _id: new ObjectId(id) })
    return deleteClient.result.ok ? true : false
  }

  async addFavorite(favoriteData: AddFavoriteModel): Promise<ClientModel> {
    const clientCollection = MongoHelper.getCollection('clients')
    const client = await clientCollection.findOne({ _id: new ObjectId(favoriteData.clientId) })
    if (!client) {
      throw new Error()
    }

    const productExists = await clientCollection.findOne({ _id: new ObjectId(favoriteData.clientId), 'favoriteProducts.id': favoriteData.productId })
    if (productExists) {
      throw new Error()
    }

    await clientCollection.updateOne(
      { _id: new ObjectId(favoriteData.clientId) }, 
      { 
        $push: {
          favoriteProducts: favoriteData.productFavorite
        }
      },
      {
        upsert: true
      }
    )

    const result = await clientCollection.findOne({ _id: new ObjectId(favoriteData.clientId) })
    return MongoHelper.mapper(result)
  }
} 