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

router
  .group(() => {
    router
      .group(() => {
        router.post('/', [CustomerController, 'store'])
        router.get('/', [CustomerController, 'index'])
        router.get(':id', [CustomerController, 'show'])
        router.delete(':id', [CustomerController, 'delete'])
        router.put(':id', [CustomerController, 'update'])
      })
      .prefix('customer')

    router
      .group(() => {
        router.post('/', [ProductController, 'store'])
        router.get('/', [ProductController, 'index'])
        router.get(':id', [ProductController, 'show'])
        router.delete(':id', [ProductController, 'delete'])
        router.put(':id', [ProductController, 'update'])
      })
      .prefix('product')

    router
      .group(() => {
        router.post('/', [SellController, 'store'])
      })
      .prefix('sell')
  })
  .use(middleware.auth({ guards: ['api'] }))
