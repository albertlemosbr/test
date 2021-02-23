import { LoadClientController } from './load-client'
import { MissingParamError, InvalidParamError, ServerError } from '../../errors'
import { LoadClient } from './load-client-protocols'
import { ClientModel } from '../../../domain/models/client'

const makeLoadClient = (): LoadClient => {
  class LoadClientStub implements LoadClient {
    async load (): Promise<ClientModel[]> {
      const fakeClients = [{  
        id: 'valid_id',      
        name: 'valid_name',
        email: 'valid_email@email.com',
        favoriteProducts: []      
      },{  
        id: 'valid_id',      
        name: 'valid_name',
        email: 'valid_email@email.com',
        favoriteProducts: []      
      }]
      return new Promise(resolve => resolve(fakeClients))
    }
  }

  return new LoadClientStub()
}

interface SubTypes {
  sut: LoadClientController,
  loadClientStub: LoadClient
}

const makeSut = (): SubTypes => {
  const loadClientStub = makeLoadClient()
  const sut = new LoadClientController(loadClientStub)

  return {
    sut,
    loadClientStub
  }
}

describe('LoadClient Controller', () => {

  test('should call LoadClient and return a list of clients', async () => {
    const { sut, loadClientStub }  = makeSut()
    const loadSpy = jest.spyOn(loadClientStub, 'load')
    sut.handle({})
    expect(loadSpy).toBeCalled()
  });

  test('should return 500 if LoadAccount throws', async () => {
    const { sut, loadClientStub } = makeSut()
    jest.spyOn(loadClientStub, 'load').mockImplementationOnce(() => {
      return new Promise((resolve, reject) =>  reject(new Error()))
    })
    const httpResponse = await sut.handle({})
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  });
});