import { gql } from '@apollo/client'


export const TEST_QUERY = gql`
  query {
    bookCount
  }
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`

export const FIND_AUTHOR = gql`
  query findAuthorByName($nameToSearch: String!) {
    findAuthor(name: $nameToSearch) {
      name
      born
      id
    }
  }
`

export const ALL_BOOKS_NO_GENRE = gql`
  query {
    allBooks {
      title
      published
      author
    }
  }
`