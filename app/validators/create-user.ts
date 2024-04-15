import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().minLength(3).maxLength(255),
    email: vine.string().trim().email(),
    password: vine.string().minLength(6),
  })
)
