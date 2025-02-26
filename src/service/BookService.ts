import { Book } from '../Book'

export class BookService {
  data: Book[]

  constructor() {
    this.data = Array<Book>()
  }

  addBook(book: Book): void {
    this.data.push(book)
  }
}
