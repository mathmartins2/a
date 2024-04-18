import { test } from '@japa/runner'
import { StatusCodes } from 'http-status-codes'
import { userMockData } from '../mock/index.js'

test.group('Sell Tests', () => {
  let authToken = ''

  test('login to obtain auth token', async ({ client, assert }) => {
    const loginPayload = userMockData
    const loginResponse = await client.post('/login').json(loginPayload)
    assert.equal(loginResponse.status(), StatusCodes.OK)
    authToken = loginResponse.body().token
  })

  test('create sell with auth', async ({ client, assert }) => {
    assert.isNotEmpty(authToken, 'Auth token must not be empty')
    const sellPayload = {
      productId: '09babf7a-5a6e-40d6-8183-40cbe4a09205',
      customerId: '311e6480-2105-4a24-8440-c07bd407dccc',
      quantity: 1,
      total: 1,
    }

    const response = await client
      .post('/sell')
      .header('Authorization', `Bearer ${authToken}`)
      .json(sellPayload)

    assert.equal(response.status(), StatusCodes.OK)
    assert.deepInclude(response.body(), sellPayload)
  })
})
