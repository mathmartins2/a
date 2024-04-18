import { test } from '@japa/runner'
import { faker } from '@faker-js/faker'
import { StatusCodes } from 'http-status-codes'
import { userMockData } from '../mock/index.js'

test.group('Product', () => {
  let authToken = ''
  let productId = ''

  test('login to obtain auth token', async ({ client, assert }) => {
    const loginPayload = userMockData
    const loginResponse = await client.post('/login').json(loginPayload)
    assert.equal(loginResponse.status(), StatusCodes.OK)
    authToken = loginResponse.body().token
  })

  test('create product with auth', async ({ client, assert }) => {
    assert.isNotEmpty(authToken, 'Auth token must not be empty')
    const productPayload = {
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      quantity: 1,
    }

    const response = await client
      .post('/product')
      .header('Authorization', `Bearer ${authToken}`)
      .json(productPayload)
    assert.equal(response.status(), StatusCodes.OK)
    assert.deepInclude(response.body(), productPayload)
    productId = response.body().id
  })

  test('list products with auth', async ({ client, assert }) => {
    assert.isNotEmpty(authToken, 'Auth token must not be empty')

    const response = await client.get('/product').header('Authorization', `Bearer ${authToken}`)

    assert.equal(response.status(), StatusCodes.OK)
    assert.isArray(response.body())
  })

  test('show product details with auth', async ({ client, assert }) => {
    assert.isNotEmpty(authToken, 'Auth token must not be empty')

    const response = await client
      .get(`/product/${productId}`)
      .header('Authorization', `Bearer ${authToken}`)

    assert.equal(response.status(), StatusCodes.OK)
    assert.isObject(response.body())
    assert.property(response.body(), 'id')
    assert.equal(response.body().id, productId)
  })

  test('update product with auth', async ({ client, assert }) => {
    assert.isNotEmpty(authToken, 'Auth token must not be empty')

    const updatePayload = {
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
    }

    const response = await client
      .put(`/product/${productId}`)
      .header('Authorization', `Bearer ${authToken}`)
      .json(updatePayload)

    assert.equal(response.status(), StatusCodes.OK)
  })

  test('delete product with auth', async ({ client, assert }) => {
    assert.isNotEmpty(authToken, 'Auth token must not be empty')

    const response = await client
      .delete(`/product/${productId}`)
      .header('Authorization', `Bearer ${authToken}`)

    assert.equal(response.status(), StatusCodes.OK)
  })
})
