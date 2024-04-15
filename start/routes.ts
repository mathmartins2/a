/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import UserController from '#controllers/user.controller'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.post('user', [UserController, 'store'])
router.get('user', [UserController, 'index']).use(
  middleware.auth({
    guards: ['api'],
  })
)
