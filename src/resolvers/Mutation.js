import uuid from 'uuid/v4'

const Mutation = {
  async createUser(parent, args, { prisma }, info) {

    return prisma.mutation.createUser({ data: args.data }, info)

  },
  createPost(parent, args, { pubsub, prisma }, info) {
    return prisma.mutation.createPost({
      data: {
        ...args.data,
        author: {
          connect: { id: args.data.author },
        },
      },
    }, info)

  },
  createComment(parent, args, { prisma, pubsub }, info) {
    return prisma.mutation.createComment({
      data: {
        text: args.data.text,
        author: {
          connect: { id: args.data.author },
        },
        post: {
          connect: { id: args.data.post },
        },
      },
    }, info)
    
  },
  async deleteUser(parent, args, { prisma }, info) {
    return prisma.mutation.deleteUser({ where: { id: args.id } }, info)
  },
  deletePost(parent, args, { prisma, pubsub }, info) {
    return prisma.mutation.deletePost({
      where: {
        id: args.id,
      },
    }, info)

  },
  deleteComment(parent, args, { prisma, pubsub }, info) {
    return prisma.mutation.deleteComment({ where: { id: args.id } }, info)
  },
  async updateUser(parent, args, { prisma }, info) {
    const { id, data } = args
    return prisma.mutation.updateUser({
      where: { id },
      data,
    }, info)

  },
  updatePost(parent, args, { prisma, pubsub }, info) {
    const { id, data } = args
    return prisma.mutation.updatePost({
      where: { id },
      data,
    }, info)
  },
  updateComment(parent, args, { prisma, pubsub }, info) {
    return prisma.mutation.updateComment({
      where: { id: args.id },
      data: args.data,
    }, info)
  },
}

export default Mutation