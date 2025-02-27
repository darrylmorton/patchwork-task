import { expect } from 'chai'

import { LibraryService } from '../../src/service/LibraryService'
import { Book } from '../../src/Book'
import { UserType } from '../../src/User'

describe('Library Service', () => {
  let libraryService: LibraryService
  let userId: string
  let user2Id: string
  let libraryOwnerId: string
  let bookId: string
  let bookTitle: string
  let bookIsbn: string
  let book: Book
  let book2: Book
  let favouriteAuthor: string
  let unavailableBookId: string
  let unavailableBookTitle: string
  let unavailableBook: Book

  before(() => {
    userId = '58a3566d-2a8a-4fa2-a649-949bfefb2534'
    user2Id = '83eab1ec-88ff-4403-a0dc-20e1f7b3d4df'
    libraryOwnerId = '703af525-3282-4347-8210-4fb4e516f20d'
    bookId = 'cb7272ad-076a-4342-9b9c-fa429c8be57d'
    favouriteAuthor = 'Nigel Poulton'
    bookTitle = 'The Kubernetes Book'
    bookIsbn = '1916585000'
    unavailableBookId = 'be715cc7-bc77-4325-8f31-f11ed7807403'
    unavailableBookTitle = 'Designing Data-Intensive Applications'
  })

  beforeEach(() => {
    book = {
      id: bookId,
      title: bookTitle,
      author: favouriteAuthor,
      isbn: bookIsbn,
      ownerId: userId,
    }
    book2 = {
      id: 'db7b276f-b7da-4236-bda5-fabc1eda8839',
      title: 'The KCNA Book',
      author: favouriteAuthor,
      isbn: '1916585035',
      ownerId: userId,
      userId: user2Id,
    }
    unavailableBook = {
      id: unavailableBookId,
      title: unavailableBookTitle,
      author: 'Martin Kleppmann',
      isbn: '1449373321',
      ownerId: user2Id,
      reference: true,
    }

    libraryService = new LibraryService()

    libraryService.users.addUser({
      id: userId,
      firstName: 'John',
      lastName: 'Smith',
      favouriteAuthor,
    })
    libraryService.users.addUser({
      id: user2Id,
      firstName: 'Mary',
      lastName: 'Jane',
      favouriteAuthor: 'John Kleppmann',
    })
    libraryService.users.addUser({
      id: libraryOwnerId,
      firstName: 'Jonas',
      lastName: 'Vingegaard',
      favouriteAuthor: 'Wout van Aert',
      type: UserType.ADMIN,
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

  it('As a library user, I would like to be able to borrow a book, so I can read it at home', () => {
    const expectedResult = book

    const actualResult = libraryService.borrowBook(user2Id, bookId)

    expect(actualResult).to.deep.equal(expectedResult)
  })

  it('As the library owner, I would like to know how many books are being borrowed, so I can see how many are outstanding', () => {
    const expectedResult = 1

    const actualResult = libraryService.countBorrowedBooks(libraryOwnerId)

    expect(actualResult).to.deep.equal(expectedResult)
  })

  it('As a library user, I should be to prevented from borrowing reference books, so that they are always available', () => {
    const expectedResult = <Book>{}

    const actualResult = libraryService.borrowBook(userId, unavailableBookId)

    expect(actualResult).to.deep.equal(expectedResult)
  })
})
