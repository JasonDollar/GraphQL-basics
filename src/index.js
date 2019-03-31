import { GraphQLServer, PubSub } from 'graphql-yoga'
import uuid from 'uuid/v4'

import './prisma'
import db from './db'
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation'
import Subscription from './resolvers/Subscription'
import User from './resolvers/User'
import Post from './resolvers/Post'
import Comment from './resolvers/Comment'


const pubsub = new PubSub()

// const server = new GraphQLServer({
//   typeDefs: './src/schema.graphql',
//   resolvers: {
//     Query,
//     Mutation,
//     Subscription,
//     User,
//     Post,
//     Comment,
//   },
//   context: {
//     db,
//     pubsub,
//   },
// })

// server.start({ port: 4000 }, () => {
//   console.log('started')
// }) 