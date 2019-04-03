import { Prisma } from 'prisma-binding'
import { fragmentReplacements } from './resolvers'

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://192.168.99.100:4466',
  secret: 'thisissupersecrettext',
  fragmentReplacements,
})


export { prisma as default }
// prisma.query.users(null, '{id name email posts {title body id}}')
//   .then(data => {
//     console.log(JSON.stringify(data, undefined, 2))
//   }) 

// prisma.mutation.createPost({
//   data: {
//     title: 'GraphQl 101  post',
//     body: '',
//     published: false,
//     author: {
//       connect: {
//         id: 'cjtwu23oz001u071096ybuve9',
//       },
//     },
//   },
// }, '{id title body published}')
//   .then(data => {
//     console.log(JSON.stringify(data))
//     prisma.query.users(null, '{id name email posts {title body id}}')
//       .then(data => {
//         console.log(JSON.stringify(data, undefined, 2))
//       }) 
//   })

// prisma.mutation.updatePost({
//   where: {
//     id: 'cjty5fs9g00140710urdk3bw5',
//   },
//   data: {
//     published: true,
//     body: 'It\'s an updated post',
//   },
// })
//   .then(data => {
//     console.log(JSON.stringify(data))
//     return prisma.query.users(null, '{id name email posts {title body id published}}')
//   })
//   .then(data => {
//     console.log(JSON.stringify(data, undefined, 2))
//   }) 

// prisma.exists.Comment({
//   id: 'cjtwuu3w0004507105b1id6bk',
// }).then(res => {
//   console.log(res)
// })

// const createPostForUser = async (authorId, data) => {
//   const userExists = await prisma.exists.User({
//     id: authorId,
//   })
//   if (!userExists) {
//     throw new Error('No such user')
//   }
//   const post = await prisma.mutation.createPost({
//     data: { 
//       ...data,
//       author: {
//         connect: {
//           id: authorId,
//         },
//       },
//     }, 
//   }, '{ author {id name email posts {id title body published}} }')
//   // console.log(post)
//   // const user = await prisma.query.user({
//   //   where: {
//   //     id: authorId,
//   //   },
//   // }, '{id name email posts {id title published}}')

//   return post.author
// }

// createPostForUser('cjtycpv8900820710p95t8pjl', {
//   title: 'Book to read',
//   body: 'Obstacle is the way',
//   published: true,
// })
//   .then(user => {
//     console.log(JSON.stringify(user, undefined, 2))
//   })
//   .catch(e => console.log(e.message))

// const updatePostForUser = async (postId, data) => {
//   const postExists = await prisma.exists.Post({ id: postId })
//   if (!postExists) {
//     throw new Error('No such post exists')
//   }
//   const post = await prisma.mutation.updatePost({
//     where: {
//       id: postId,
//     },
//     data,
//   }, '{author {id name email posts {id title published}}}')

//   // const user = await prisma.query.user({
//   //   where: {
//   //     id: post.author.id,
//   //   },
//   // }, '{id name email posts {id title published}}')

//   return post.author
// }
/* 
updatePostForUser('cjty6he02003207106e5cagsv', {
  published: true,
  body: 'Longevity Diet',
})
  .then(user => {
    console.log(JSON.stringify(user, undefined, 2))
  })
  .catch(e => console.log(e.message)) */

// updatePostForUser('cjty6ggs2002u0710htf2j5u3', {
//   published: true,
//   body: 'Awakening',
// })
//   .then(user => {
//     console.log(JSON.stringify(user, undefined, 2))
//   })
//   .catch(e => console.log(e.message))