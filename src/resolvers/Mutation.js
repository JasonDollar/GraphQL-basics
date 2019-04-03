import bcrypt from 'bcryptjs'
import getUserId from '../utils/getUserId'
import generateToken from '../utils/generateToken'
import hashPassword from '../utils/hashPassword'

const Mutation = {
  async createUser(parent, args, { prisma }, info) {

    const password = await hashPassword(args.data.password)
    

    const user = await prisma.mutation.createUser({ 
      data: {
        ...args.data,
        password,
      }, 
    }) //no info returns all scalar values

    return {
      user,
      token: generateToken(user.id),
    }
  },
  async login(parent, args, { prisma }, info) {
    const user = await prisma.query.user({ where: { email: args.data.email } })
    if (!user) {
      throw new Error('unable to login')
    }

    const doesPasswordMatch = await bcrypt.compare(args.data.password, user.password)
    if (!doesPasswordMatch) {
      throw new Error('unable to login')
    }
    return {
      user,
      token: generateToken(user.id),
    }
  },
  createPost(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)
    return prisma.mutation.createPost({
      data: {
        ...args.data,
        author: {
          connect: { id: userId },
        },
      },
    }, info)

  },
  async createComment(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)
    const postExists = await prisma.exists.Post({
      id: args.data.post, published: true,
    })
    if (!postExists) {
      throw new Error('Unable to find post')
    }
    return prisma.mutation.createComment({
      data: {
        text: args.data.text,
        author: {
          connect: { id: userId },
        },
        post: {
          connect: { id: args.data.post },
        },
      },
    }, info)
    
  },
  async deleteUser(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)
    return prisma.mutation.deleteUser({ where: { id: userId } }, info)
  },
  async deletePost(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)
    const postExists = await prisma.exists.Post({
      id: args.id,
      author: {
        id: userId,
      },
    })
    if (!postExists) {
      throw new Error('Unable to find post')
    }
    return prisma.mutation.deletePost({
      where: {
        id: args.id,
      },
    }, info)

  },
  async deleteComment(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)
    const commentExists = await prisma.exists.Comment({ id: args.id, author: { id: userId } })
    if (!commentExists) {
      throw new Error('No comment found')
    }
    return prisma.mutation.deleteComment({ where: { id: args.id } }, info)
  },
  async updateUser(parent, args, { prisma, request }, info) {
    if (typeof args.data.password === 'string') {
      args.data.password = await hashPassword(args.data.password)
    }
    const userId = getUserId(request)
    return prisma.mutation.updateUser({
      where: { id: userId },
      data: args.data,
    }, info)

  },
  async updatePost(parent, args, { prisma, request }, info) {
    const { id, data } = args
    const userId = getUserId(request)
    const postExists = await prisma.exists.Post({
      id: args.id,
      author: {
        id: userId,
      },
    })
    if (!postExists) {
      throw new Error('No post found')
    }
    const isPublished = await prisma.exists.Post({ id: args.id, published: true })
    if (isPublished && args.data.published === false) {
      await prisma.mutation.deleteManyComments({ where: { post: { id: args.id } } })
    }

    return prisma.mutation.updatePost({
      where: { id },
      data,
    }, info)
  },
  async updateComment(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)
    const commentExists = await prisma.exists.Comment({ id: args.id, author: { id: userId } })
    if (!commentExists) {
      throw new Error('No comment found')
    }
    return prisma.mutation.updateComment({
      where: { id: args.id },
      data: args.data,
    }, info)
  },
}

export default Mutation