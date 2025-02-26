import { expect } from 'chai'

import { LibraryService } from '../../src/service/LibraryService'
import { Book } from '../../src/Book'

describe('Library Users', () => {
  let libraryService: LibraryService
  let userId: string
  let bookId: string
  let bookTitle: string
  let bookIsbn: string
  let book: Book
  let book2: Book
  let favouriteAuthor: string
  let unavailableBookId: string
  let unavailableBook: Book

  before(() => {
    userId = '58a3566d-2a8a-4fa2-a649-949bfefb2534'
    bookId = 'cb7272ad-076a-4342-9b9c-fa429c8be57d'
    favouriteAuthor = 'Nigel Poulton'
    bookTitle = 'The Kubernetes Book'
    bookIsbn = '1916585000'
    unavailableBookId = 'be715cc7-bc77-4325-8f31-f11ed7807403'

    book = {
      id: bookId,
      title: bookTitle,
      author: favouriteAuthor,
      isbn: bookIsbn,
      ownerId: userId,
      userId,
    }
    book2 = {
      id: 'db7b276f-b7da-4236-bda5-fabc1eda8839',
      title: 'The KCNA Book',
      author: favouriteAuthor,
      isbn: '1916585035',
      ownerId: userId,
      userId,
    }
    unavailableBook = {
      id: unavailableBookId,
      title: 'Designing Data-Intensive Applications',
      author: 'Martin Kleppmann',
      isbn: '1449373321',
      ownerId: userId,
    }

    libraryService = new LibraryService()
    libraryService.users.addUser({
      id: userId,
      firstName: 'John',
      lastName: 'Smith',
      favouriteAuthor,
    })
    libraryService.books.addBook(book)
    libraryService.books.addBook(book2)
    libraryService.books.addBook(unavailableBook)
  })

  it('As a library user, I would like to be able to find books by my favourite author, so that I know if they are available in the library', () => {
    const expectedResult = [book, book2]

    const actualResult = libraryService.getBooksByFavouriteAuthor(userId)

    expect(actualResult).to.deep.equal(expectedResult)
  })

  it('As a library user, I would like to be able to find books by title, so that I know if they are available in the library', () => {
    const expectedResult = [book]

    const actualResult = libraryService.getBooksByTitle(bookTitle)

    expect(actualResult).to.deep.equal(expectedResult)
  })

  it('As a library user, I would like to be able to find books by ISBN, so that I know if they are available in the library', () => {
    const expectedResult = [book]

    const actualResult = libraryService.getBooksByIsbn(bookIsbn)

    expect(actualResult).to.deep.equal(expectedResult)
  })

  it.skip('As a library user, I would like to be able to borrow a book, so I can read it at home', () => {})

  it.skip('As the library owner, I would like to know how many books are being borrowed, so I can see how many are outstanding', () => {})

  it.skip('As a library user, I should be to prevented from borrowing reference books, so that they are always available', () => {})
})
