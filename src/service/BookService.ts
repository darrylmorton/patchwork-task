import { Book } from '../Book'

export class BookService {
  data: Array<Book>

  constructor() {
    this.data = Array<Book>()
  }

  addBook(book: Book) {
    this.data.push(book)
  }
}