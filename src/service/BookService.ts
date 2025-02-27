import { Book } from '../Book'

export class BookService {
  data: Book[]

  constructor() {
    this.data = Array<Book>()
  }

  addBook(book: Book): void {
    this.data.push(book)
  }

  borrowBook(userId: string, bookId: string): Book {
    const result = this.data.reduce(
      (
        acc: {
          books: Book[]
          borrowedBook: Book
        },
        book: Book
      ) => {
        if (book.id === bookId && !book.reference) {
          book.userId = userId

          acc.borrowedBook = book
        }
        acc.books.push(book)

        return acc
      },
      { books: Array<Book>(), borrowedBook: <Book>{} }
    )

    return result.borrowedBook
  }

  getFavouriteBooksByAuthor(author: string): Book[] {
    return this.data.filter((book: Book) => book.author === author)
  }

  countBorrowedBooks(): number {
    return this.data.filter((book: Book) => book.userId).length
  }
}
