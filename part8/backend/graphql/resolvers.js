import { v4 as uuid } from 'uuid'
import { GraphQLError } from 'graphql'
import { authors } from '../data/authors.data.js'
import { books } from '../data/books.data.js'
import Book from '../models/book.model.js'
import Author from '../models/author.model.js'
import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { verifyPassword, generateAccessToken } from '../services/auth.service.js'

export const resolvers = {
  Query: {
    me: (root, args, context) => {
      return context.currentUser || null
    },

    bookCount: async () => await Book.countDocuments(),

    authorCount: async () => await Author.countDocuments(),

    findBook: async (root, args) => 
      await Book.findOne({ title: args.title }).populate('author'),

    findAuthor: async (root, args) => 
      await Author.findOne({ name: args.name }),

    allBooks: async (root, args) => {
      console.log('entered all books');
      
      const filter = {}

      if (args.genre) {
        filter.genres = { $in: [args.genre]}
      }
      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        if (!author) return []
        filter.author = author._id
      }
      // console.log('all books resolver, filter: ', filter);

      const books = await Book.find(filter).populate('author')

      // console.log('all books resolver: returned books: ', books);
      return books
    },

    allAuthors: async () => {
      console.log('entered fetch allAuthors backend');
      
      const authors = await Author.find({})
      // console.log('authors: ', authors);      

      const bookCounts = await Book.aggregate([
        { $group: { _id: '$author', count: { $sum: 1 } } }
      ])

      // console.log('bookcounts', bookCounts);      

      const countMap = {}
      bookCounts.forEach(entry => {
        countMap[entry._id.toString()] = entry.count
      })

      // const returnedObj = authors.map(author => ({
      //   id: author._id.toString(),
      //   name: author.name,
      //   born: author.born,
      //   bookCount: countMap[author._id.toString()] || 0
      // }))
      // console.log('returnedObj', returnedObj);
      // return returnedObj

      return authors.map(author => ({
        id: author._id.toString(),
        name: author.name,
        born: author.born,
        bookCount: countMap[author._id.toString()] || 0
      }))
    }
  },

  Book: {
    author: async (root) => await Author.findById(root.author)
  },

  Mutation: {
    addBook: async (root, args) => {
      console.log('entered backend resolvers addbook');
      
      const existingBook = await Book.findOne({ title: args.title })
      if (existingBook) {
        throw new GraphQLError('book already exists', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title
          }
        })
      }

      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({ name: args.author })
        try {
          await author.save()        
        } catch (error) {
          throw new GraphQLError("edit author failed", {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        }
      }

      const book = new Book({
        title: args.title,
        published: args.published,
        genres: args.genres,
        author: author._id
      })
      console.log('entered backend resolvers addbook. Book to add: ', book);

      try {
        await book.save()        
      } catch (error) {
        throw new GraphQLError("add book failed", {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }

      return book
    },

    editAuthor: async (root, args) => {
      console.log('entered backend editAuth resolver');      

      const author = await Author.findOne({ name: args.name })
      // console.log('editAuth author', author);
      
      if (!author) return null

      author.born = args.setBornTo
      try {
        await author.save()        
      } catch (error) {
        throw new GraphQLError("edit author failed", {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }

      // console.log('editAuth returned author', author);
      return author
    },

    createUser: async (root, args) => {
      const existingUser = await User.findOne({ username: args.username })
      if (existingUser) {
        throw new GraphQLError('Username already taken', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
          }
        })
      }

      const saltRounds = 10
      const hashedPassword = await bcrypt.hash(args.password, saltRounds)

      const user = new User({
        username: args.username,
        hashedPassword
      })

      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.username,
              error
            }
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      let passwordCorrect = false;
      if (user) {
        passwordCorrect = await verifyPassword(args.password, user.hashedPassword)
        console.log('passwordCorrect', passwordCorrect);
      }

      if ( !user || !passwordCorrect ) {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })        
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: generateAccessToken(user) }
    },    
  }
}
