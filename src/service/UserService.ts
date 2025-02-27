import { User } from '../User'

export class UserService {
  data: User[]

  constructor() {
    this.data = Array<User>()
  }

  addUser(user: User): void {
    this.data.push(user)
  }

  getUserById(id: string): User | undefined {
    return this.data.find((_user: User) => _user.id === id)
  }
}
