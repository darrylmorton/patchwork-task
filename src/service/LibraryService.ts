import { UserService } from './UserService'
import { BookService } from './BookService'
import { User } from '../User'
import { Book } from '../Book'

export class LibraryService {
  users: UserService
  books: BookService

  constructor() {
    this.users = new UserService()
    this.books = new BookService()
  }

  getUserById(id: string): User | undefined {
    return this.users.data.find((_user: User) => _user.id === id)
  }

  getBooksByFavouriteAuthor(userId: string): Book[] {
    const user = this.getUserById(userId)

    if (user) {
      return this.books.data.filter((book: Book) => book.author === user.favouriteAuthor)
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
    const user = this.getUserById(userId)

    if (user) {
      return this.books.borrowBook(userId, bookId)
    }

    return <Book>{}
  }

  countBorrowedBooks(): number {
    return this.books.data.filter((book: Book) => book.userId).length
  }
}
