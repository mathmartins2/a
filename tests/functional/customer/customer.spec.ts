import { test } from '@japa/runner'
import { StatusCodes } from 'http-status-codes'
import { userMockData } from '../mock/index.js'
import { faker } from '@faker-js/faker'
import { fakerBr } from '@js-brasil/fakerbr'

test.group('Customer', () => {
  let authToken = ''
  let customerId = ''

  test('login to obtain auth token', async ({ client, assert }) => {
    const loginPayload = userMockData
    const loginResponse = await client.post('/login').json(loginPayload)
    assert.equal(loginResponse.status(), StatusCodes.OK)
    authToken = loginResponse.body().token
  })

  test('create customer with auth', async ({ client, assert }) => {
    assert.isNotEmpty(authToken, 'Auth token must not be empty')
    const customerPayload = {
      fullName: faker.company.name(),
      email: faker.internet.email(),
      cpf: fakerBr.cpf(),
    }

    const response = await client
      .post('/customer')
      .header('Authorization', `Bearer ${authToken}`)
      .json(customerPayload)
    assert.equal(response.status(), StatusCodes.CREATED)
    assert.deepInclude(response.body(), customerPayload)
    customerId = response.body().id
  })

  test('list customers with auth', async ({ client, assert }) => {
    assert.isNotEmpty(authToken, 'Auth token must not be empty')

    const response = await client.get('/customer').header('Authorization', `Bearer ${authToken}`)

    assert.equal(response.status(), StatusCodes.OK)
    assert.isArray(response.body())
  })

  test('show customer details with auth', async ({ client, assert }) => {
    assert.isNotEmpty(authToken, 'Auth token must not be empty')

    const response = await client
      .get(`/customer/${customerId}`)
      .header('Authorization', `Bearer ${authToken}`)

    assert.equal(response.status(), StatusCodes.OK)
    assert.isObject(response.body())
    assert.property(response.body(), 'id')
    assert.equal(response.body().id, customerId)
  })

  test('update customer with auth', async ({ client, assert }) => {
    assert.isNotEmpty(authToken, 'Auth token must not be empty')

    const updatePayload = {
      name: faker.company.name(),
    }

    const response = await client
      .put(`/customer/${customerId}`)
      .header('Authorization', `Bearer ${authToken}`)
      .json(updatePayload)

    assert.equal(response.status(), StatusCodes.NO_CONTENT)
  })

  test('delete customer with auth', async ({ client, assert }) => {
    assert.isNotEmpty(authToken, 'Auth token must not be empty')

    const response = await client
      .delete(`/customer/${customerId}`)
      .header('Authorization', `Bearer ${authToken}`)

    assert.equal(response.status(), StatusCodes.NO_CONTENT)
  })
})
