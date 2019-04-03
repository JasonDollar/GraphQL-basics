import getUserId from '../utils/getUserId'

const User = {
  email: {
    fragment: 'fragment userId on User {id}',
    resolve(parent, args, { request }, info) {
      const userId = getUserId(request, false)
      if (userId && userId === parent.id) {
        return parent.email
      }
      return null
    },

  },
  posts: {
    fragment: 'fragment usersPosts on User {id}',
    async resolve(parent, args, { request, prisma }, info) {
      // const userId = getUserId(request, false)
      const posts = await prisma.query.posts({ where: { author: { id: parent.id }, published: true } })
      return posts
    },
  },
}

export default User