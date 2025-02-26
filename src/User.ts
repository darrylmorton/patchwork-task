import { v4 as uuidv4 } from 'uuid'

export class User {
  id: string
  firstName: string
  lastName: string
  favouriteAuthor: string

  constructor(firstName: string, lastName: string, favouriteAuthor: string) {
    this.id = uuidv4()
    this.firstName = firstName
    this.lastName = lastName
    this.favouriteAuthor = favouriteAuthor
  }
}
