import { LibraryService } from './service/LibraryService'

console.log('Starting app...')

const { users, books } = new LibraryService()
console.log('App started')

console.log(`users: ${users.data.length}, books: ${books.data.length}`)
