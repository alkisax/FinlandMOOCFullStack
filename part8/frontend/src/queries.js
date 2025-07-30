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

export const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!,
    $published: Int!,
    $author: String!,
    $genres: [String]!
  ) {
    addBook(
      title: $title,
      published: $published,
      author: $author,
      genres: $genres
    ) {
      id
      title
      published
      author
      genres      
    }
  }
`

export const EDIT_AUTHOR = gql`
  mutation editAuthor(
    $name: String!,
    $setBornTo: Int!
  ) {
    editAuthor(
      name: $name,
      setBornTo: $setBornTo
    ) {
      name
      born
      id
    }
  }
`