export const typeDefs = `#graphql
  type User {
    username: String!
    favoriteGenre: String
    friends: [User!]!
    id: ID!
  }

  type Person {
    username: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Author {
    id: ID!
    name: String!
    born: Int
  }

  type Book {
    id: ID!
    title: String!
    published: Int!
    author: Author!
    genres: [String]!
  }

  type AuthorWithBookCount {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    findBook (title: String!): Book
    findAuthor(name: String!): Author
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [AuthorWithBookCount!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String]!
    ): Book
    editAuthor (
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      password: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
    editFavoriteGenre(
      genre: String!
    ): User
  }
`

