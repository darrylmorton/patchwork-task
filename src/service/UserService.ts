import { User } from '../User'

export class UserService {
  data: Array<User>

  constructor() {
    this.data = Array<User>()
  }

  addUser(user: User) {
    this.data.push(user)
  }
}