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

  getBooksByFavouriteAuthor(userId: string): Array<Book> {
    const user = this.users.data.find((_user: User) => _user.id === userId)

    if (user) {
      return this.books.data.filter((book: Book) => book.author === user.favouriteAuthor)
    }

    return Array<Book>()
  }
}