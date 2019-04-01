const Query = { 
  users(parent, args, { prisma }, info) {
    const opArgs = {} //operation arguments

    if (args.query) {
      opArgs.where = {
        OR: [
          {
            email_contains: args.query,
          }, { 
            name_contains: args.query, 
          },
        ],
      }
    }

    return prisma.query.users(opArgs, info)
  },
  posts(parent, args, { prisma }, info) {
    const opArgs = {}
    if (args.query) {
      opArgs.where = {
        OR: [
          { title_contains: args.query },
          { body_contains: args.query },
        ],
      }
    }
    return prisma.query.posts(opArgs, info)
    // if (args.query) {
    //   return db.posts.filter(item => item.title.toLowerCase().includes(args.query.toLowerCase()) 
    //   || item.body.toLowerCase().includes(args.query.toLowerCase()))
    // }
    // return db.posts 
  },
  comments(parent, args, { prisma }, info) {
    return prisma.query.comments(null, info)
  },
}

export default Query