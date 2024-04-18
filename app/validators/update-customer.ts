import vine from '@vinejs/vine'

export const updateCustomerValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().minLength(3).maxLength(255).optional(),
    email: vine.string().trim().email().optional(),
    address: vine.string().trim().minLength(3).maxLength(255).optional(),
    phone: vine.string().trim().minLength(8).maxLength(15).optional(),
    cpf: vine.string().trim().minLength(11).maxLength(14).optional(),
  })
)
