import { LoginController } from '../../presentation/controllers/login/login'

export const makeLoginController = (): LoginController => {
  return new LoginController()
}