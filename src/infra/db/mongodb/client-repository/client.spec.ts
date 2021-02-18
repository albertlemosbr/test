import { MongoHelper } from '../helpers/mongo-helper'
import { ClientMongoRepository } from './client'

describe('Client Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const clientCollection = MongoHelper.getCollection('clients')
    await clientCollection.deleteMany({})
  })

  const makeSut = (): ClientMongoRepository => {
    return new ClientMongoRepository()
  }

  test('Should return an client on success when call add client', async () => {
    const sut = makeSut()
    const client = await sut.add({
      name: 'any_name',
      email: 'any_email',
      favoriteProducts: []
    })
    expect(client).toBeTruthy()
    expect(client.id).toBeTruthy()
    expect(client.name).toBe('any_name')
    expect(client.email).toBe('any_email')
    expect(client.favoriteProducts).toHaveLength(0)
  });

  test('Should return a list of clients on success', async () => {
    const sut = makeSut()
    const clients = await sut.load()
    expect(clients).toBeTruthy()
    expect(clients).toHaveLength(0)
  });
});