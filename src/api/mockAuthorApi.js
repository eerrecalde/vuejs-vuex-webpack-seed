import delay from '@api/delay'

//  This file mocks a web API by working with the hard-coded data below.
//  It uses setTimeout to simulate the delay of an AJAX call.
//  All calls return promises.
const authors = [{
  id: 'cory-house',
  firstName: 'Cory',
  lastName: 'House',
}, {
  id: 'scott-allen',
  firstName: 'Scott',
  lastName: 'Allen',
}, {
  id: 'dan-wahlin',
  firstName: 'Dan',
  lastName: 'Wahlin',
}]

//  This would be performed on the server in a real app. Just stubbing in.
const generateId = author => `${author.firstName.toLowerCase()} - ${author.lastName.toLowerCase()}`

class AuthorApi {
  static getAllAuthors() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(Object.assign([], authors))
      }, delay)
    })
  }

  static saveAuthor(author) {
    const authr = author
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minAuthorNameLength = 3
        if (authr.firstName.length < minAuthorNameLength) {
          reject(`First Name must be at least ${minAuthorNameLength} characters.`)
        }

        if (authr.lastName.length < minAuthorNameLength) {
          reject(`Last Name must be at least ${minAuthorNameLength} characters.`)
        }

        if (authr.id) {
          const existingAuthorIndex = authors.findIndex(a => a.id === authr.id)
          authors.splice(existingAuthorIndex, 1, authr)
        } else {
          // Just simulating creation here.
          // The server would generate ids for new authors in a real app.
          // Cloning so copy returned is passed by value rather than by reference.
          authr.id = generateId(authr)
          authors.push(authr)
        }

        resolve(Object.assign({}, author))
      }, delay)
    })
  }

  static deleteAuthor(authorId) {
    return new Promise(resolve => {
      setTimeout(() => {
        const indexOfAuthorToDelete = authors.findIndex(author => author.authorId === authorId)
        authors.splice(indexOfAuthorToDelete, 1)
        resolve()
      }, delay)
    })
  }
}

export default AuthorApi
