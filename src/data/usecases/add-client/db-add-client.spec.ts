import { DbAddClient } from './db-add-client'
import { AddClientModel, ClientModel, AddClientRepository } from './db-add-client-protocols'


interface SutTypes {
  sut: DbAddClient,
  addClientRepositoryStub: AddClientRepository
}

const makeAddClientRepository = (): AddClientRepository => {
  class AddClientRepositoryStub implements AddClientRepository {
    async add (clientData: AddClientModel): Promise<ClientModel> {
      const fakeClient = {
        id: "valid_id",
        name: 'valid_name',
        email: 'valid_email',
        favoriteProducts: []
      }
      return new Promise(resolve => resolve(fakeClient))
    }
  }
  return new AddClientRepositoryStub()
}

const makeSut = (): SutTypes => {
  const addClientRepositoryStub = makeAddClientRepository()
  const sut = new DbAddClient(addClientRepositoryStub)
  return {
    sut,
    addClientRepositoryStub
  }
}



describe('DbAddClient UseCase', () => {

  test('Should call AddClientRepository with correct values', async () => {
    const { sut, addClientRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addClientRepositoryStub, 'add')
    const clientData = {
      name: 'valid_name',
      email: 'valid_email',
      favoriteProducts: []
    }
    await sut.add(clientData)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_email',
      favoriteProducts: []
    })
  });

  test('Should throw if AddClientRepository throws', async () => {
    const { sut, addClientRepositoryStub } = makeSut()
    jest.spyOn(addClientRepositoryStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const clientData = {
      name: 'valid_name',
      email: 'valid_email',
      favoriteProducts: []
    }
    const promise = sut.add(clientData)
    await expect(promise).rejects.toThrow()
  });

  test('Should return an account on success', async () => {
    const { sut } = makeSut()
    const clientData = {
      name: 'valid_name',
      email: 'valid_email',
      favoriteProducts: []
    }
    const account = await sut.add(clientData)
    expect(account).toEqual({
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_email',
      favoriteProducts: []
    })
  });
});