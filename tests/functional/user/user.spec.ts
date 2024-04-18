import { test } from '@japa/runner'
import { faker } from '@faker-js/faker'
import { CreateUserDto } from '../../../app/types/create-user.js'
import { StatusCodes } from 'http-status-codes'

test.group('User', () => {
  const payload: CreateUserDto = {
    fullName: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  }

  test('user store', async ({ client }) => {
    const response = await client.post('/signup').json(payload)
    response.assertStatus(StatusCodes.CREATED)
    response.assertBodyContains({
      ...payload,
      password: undefined,
    })
  })

  test('user login', async ({ client, assert }) => {
    const response = await client.post('/login').json({
      email: payload.email,
      password: payload.password,
    })
    const responseBody = response.body()
    response.assertStatus(StatusCodes.OK)
    response.assertBodyContains({
      type: 'bearer',
      abilities: ['*'],
    })

    assert.exists(responseBody.token)
    assert.isString(responseBody.token)

    assert.exists(responseBody.type)
    assert.isString(responseBody.type)

    assert.exists(responseBody.abilities)
    assert.isArray(responseBody.abilities)

    assert.equal(responseBody.type, 'bearer')
    assert.deepEqual(responseBody.abilities, ['*'])

    assert.notTypeOf(responseBody.expiresAt, 'Invalid Date')
  })
})
