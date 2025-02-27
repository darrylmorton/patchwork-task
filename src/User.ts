import { v4 as uuidv4 } from 'uuid'

export enum UserType {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export class User {
  id: string
  firstName: string
  lastName: string
  favouriteAuthor: string
  type?: UserType

  constructor(firstName: string, lastName: string, favouriteAuthor: string, type?: UserType.USER) {
    this.id = uuidv4()
    this.firstName = firstName
    this.lastName = lastName
    this.favouriteAuthor = favouriteAuthor
    this.type = type
  }
}
