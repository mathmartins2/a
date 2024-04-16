import User from '../entities/user.js'
import { CreateUserDto } from '../types/create-user.js'
import hash from '@adonisjs/core/services/hash'
import UserNotFoundException from '#exceptions/user-not-found.exception'
import UnAuthorizedException from '#exceptions/unauthorized-exception'
import UserAlreadyExistsException from '#exceptions/customer-already-exists.exception'

export class UserService {
  async createUser(dto: CreateUserDto): Promise<User> {
    const prevUser = await User.findBy('email', dto.email)
    if (prevUser) throw new UserAlreadyExistsException()
    const user = new User()
    user.fullName = dto.fullName
    user.email = dto.email
    user.password = dto.password
    return await user.save()
  }

  async login(email: string, password: string): Promise<any> {
    const user = await User.findBy('email', email)
    if (!user) throw new UserNotFoundException()
    const isPasswordValid = await hash.verify(user.password, password)
    if (!isPasswordValid) throw new UnAuthorizedException()
    return await User.accessTokens.create(user)
  }
}
