import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  clientMongo: null as MongoClient,
  async connect (uri: string): Promise<void> {
    this.clientMongo = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  },

  async disconnect (): Promise<void> {
    await this.clientMongo.close()
  },

  getCollection (name: string): Collection {
    return this.clientMongo.db().collection(name)
  },

  mapper (item: any): any {
    const { _id, ...itemWithoutId } = item
    return Object.assign({}, itemWithoutId, { id: _id})
  },

  mapperList (list: any): any {
    return list.map((item) => {
      const { _id, ...itemWithoutId } = item
      return Object.assign({}, itemWithoutId, { id: _id})
    })
  }
}