import { UserService } from './UserService'
import { BookService } from './BookService'
import { UserType } from '../User'
import { Book } from '../Book'

export class LibraryService {
  users: UserService
  books: BookService

  constructor() {
    this.users = new UserService()
    this.books = new BookService()
  }

  getBooksByFavouriteAuthor(userId: string): Book[] {
    const user = this.users.getUserById(userId)

    if (user) {
      return this.books.getFavouriteBooksByAuthor(user.favouriteAuthor)
    }

    return Array<Book>()
  }

  getBooksByTitle(title: string): Book[] {
    return this.books.data.filter((book: Book) => book.title === title)
  }

  getBooksByIsbn(isbn: string): Book[] {
    return this.books.data.filter((book: Book) => book.isbn === isbn)
  }

  borrowBook(userId: string, bookId: string): Book {
    const user = this.users.getUserById(userId)

    if (user) {
      return this.books.borrowBook(userId, bookId)
    }

    return <Book>{}
  }

  countBorrowedBooks(userId: string): number {
    const user = this.users.getUserById(userId)

    if (user && user.type === UserType.ADMIN) {
      return this.books.countBorrowedBooks()
    }

    return 0
  }
}
