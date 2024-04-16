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
import CustomerController from '#controllers/customer.controller'
import ProductController from '#controllers/product.controller'
import SellController from '#controllers/sell.controller'

router.post('signup', [UserController, 'store'])
router.post('login', [UserController, 'login'])

router.post('customer', [CustomerController, 'store']).use(
  middleware.auth({
    guards: ['api'],
  })
)
router.get('customer', [CustomerController, 'index']).use(
  middleware.auth({
    guards: ['api'],
  })
)
router.get('customer/:id', [CustomerController, 'show']).use(
  middleware.auth({
    guards: ['api'],
  })
)
router.delete('customer/:id', [CustomerController, 'delete']).use(
  middleware.auth({
    guards: ['api'],
  })
)
router.put('customer/:id', [CustomerController, 'update']).use(
  middleware.auth({
    guards: ['api'],
  })
)

router.post('product', [ProductController, 'store']).use(
  middleware.auth({
    guards: ['api'],
  })
)
router.delete('product/:id', [ProductController, 'delete']).use(
  middleware.auth({
    guards: ['api'],
  })
)
router.get('product/:id', [ProductController, 'show']).use(
  middleware.auth({
    guards: ['api'],
  })
)
router.patch('product/:id', [ProductController, 'update']).use(
  middleware.auth({
    guards: ['api'],
  })
)
router.get('product', [ProductController, 'index']).use(
  middleware.auth({
    guards: ['api'],
  })
)

router.post('sell', [SellController, 'store']).use(
  middleware.auth({
    guards: ['api'],
  })
)
