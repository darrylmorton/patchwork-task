import { User } from '../User'

export class UserService {
  data: User[]

  constructor() {
    this.data = Array<User>()
  }

  addUser(user: User): void {
    this.data.push(user)
  }
}
