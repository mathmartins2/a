import User from '../entities/user.js'
import { CreateUserDto } from '../types/create-user.js'

export class UserService {
  async createUser(dto: CreateUserDto): Promise<User> {
    const user = new User()
    user.fullName = dto.fullName
    user.email = dto.email
    user.password = dto.password
    const createdUser = await user.save()
    // User.accessTokens.create(createdUser)
    return user
  }
}
