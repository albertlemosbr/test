import { AddClientController } from './add-client'
import { MissingParamError, InvalidParamError, ServerError } from '../../errors'
import { EmailValidator, AddClient, AddClientModel } from './add-client-protocols'
import { ClientModel } from '../../../domain/models/client'

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}

const makeAddClient = (): AddClient => {
  class AddClientStub implements AddClient {
    async add (client: AddClientModel): Promise<ClientModel> {
      const fakeClient = {  
        id: 'valid_id',      
        name: 'valid_name',
        email: 'valid_email@email.com',
        favoriteProducts: []      
      }
      return new Promise(resolve => resolve(fakeClient))
    }
  }

  return new AddClientStub()
}

interface SubTypes {
  sut: AddClientController,
  emailValidatorStub: EmailValidator
  addClientStub: AddClient
}

const makeSut = (): SubTypes => {
  const emailValidatorStub = makeEmailValidator()
  const addClientStub = makeAddClient()
  const sut = new AddClientController(emailValidatorStub, addClientStub)

  return {
    sut,
    emailValidatorStub,
    addClientStub
  }
}

describe('AddClient Controller', () => {
  test('should return 400 if no name is provided ', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email',
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  });

  test('should return 400 if no email is provided ', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  });

  test('should return 400 if an invalid email is provided ', async () => {
    const { sut, emailValidatorStub }  = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email',
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('email'))
  });

  test('should call EmailValidator with correct email ', async () => {
    const { sut, emailValidatorStub }  = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@gmail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith('any_email@gmail.com')
  });

  test('should return 500 if emailValidator throws', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email',
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  });

  test('should call AddAccount with correct values', async () => {
    const { sut, addClientStub }  = makeSut()
    const addSpy = jest.spyOn(addClientStub, 'add')
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@gmail.com',
      }
    }
    sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@gmail.com',
    })
  });

  test('should return 500 if AddAccount throws', async () => {
    const { sut, addClientStub } = makeSut()
    jest.spyOn(addClientStub, 'add').mockImplementationOnce(() => {
      return new Promise((resolve, reject) =>  reject(new Error()))
    })

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email',
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  });

  test('should return 200 if valid data is provided ', async () => {
    const { sut }  = makeSut()
    const httpRequest = {
      body: {
        name: 'valid_name',
        email: 'valid_email@email.com',
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual(
      {
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_email@email.com',
        favoriteProducts: []
      }
    )
  });
});