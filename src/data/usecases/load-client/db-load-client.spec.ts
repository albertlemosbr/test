import { DbLoadClient } from "./db-load-client";
import { ClientModel, LoadClientRepository } from "./db-load-protocols";

interface SutTypes {
  sut: DbLoadClient,
  loadClientRepositoryStub: LoadClientRepository
}

const makeLoadClientRepository = (): LoadClientRepository => {
  class LoadClientRepositoryStub implements LoadClientRepository {
    async load (): Promise<ClientModel[]> {
      const fakeClients = [
        {
          id: "valid_id",
          name: 'valid_name',
          email: 'valid_email',
          favoriteProducts: []
        },
        {
          id: "valid_id",
          name: 'valid_name',
          email: 'valid_email',
          favoriteProducts: []
        }
      ]
      return new Promise(resolve => resolve(fakeClients))
    }
  }
  return new LoadClientRepositoryStub()
}

const makeSut = (): SutTypes => {
  const loadClientRepositoryStub = makeLoadClientRepository()
  const sut = new DbLoadClient(loadClientRepositoryStub)
  return {
    sut,
    loadClientRepositoryStub
  }
}

describe('DbLoadClient UseCase', () => {
  test('should return a list of clients', async () => {
    const { sut, loadClientRepositoryStub } = makeSut()
    const clients = await sut.load()
    expect(clients).toEqual([
      {
        id: "valid_id",
        name: 'valid_name',
        email: 'valid_email',
        favoriteProducts: []
      },
      {
        id: "valid_id",
        name: 'valid_name',
        email: 'valid_email',
        favoriteProducts: []
      }
    ])
  });

  test('Should throw if LoadClientRepository throws', async () => {
    const { sut, loadClientRepositoryStub } = makeSut()
    jest.spyOn(loadClientRepositoryStub, 'load').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error()))) 
    const promise = sut.load()
    await expect(promise).rejects.toThrow()
  });
});