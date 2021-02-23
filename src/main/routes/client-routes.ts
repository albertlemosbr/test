import { Router } from 'express'
import { makeAddClientController } from '../factories/add-client'
import { adaptRoute } from '../adapter/express-route-adapter'
import { makeLoadClientController } from '../factories/load-client'
import { makeEditClientController } from '../factories/edit-client'
import { makeDeleteClientController } from '../factories/delete-client'
import { makeAddFavoriteController } from '../factories/add-favorite'
import { makeLoginController } from '../factories/login'

export default (router: Router): void => {
  router.post('/client', adaptRoute(makeAddClientController()))
  router.get('/client', adaptRoute(makeLoadClientController()))
  router.get('/client/:id', adaptRoute(makeLoadClientController()))
  router.delete('/client/:id', adaptRoute(makeDeleteClientController()))
  router.put('/client', adaptRoute(makeEditClientController()))
  router.post('/addfavorite', adaptRoute(makeAddFavoriteController()))
  router.get('/login', adaptRoute(makeLoginController()))
}