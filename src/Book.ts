import { v4 as uuidv4 } from 'uuid'

export class Book {
  id: string
  title: string
  author: string
  isbn: string
  ownerId: string
  userId?: string

  constructor(title: string, author: string, isbn: string, ownerId: string, userId?: string) {
    this.id = uuidv4()
    this.title = title
    this.author = author
    this.isbn = isbn
    this.ownerId = ownerId
    this.userId = userId
  }
}
