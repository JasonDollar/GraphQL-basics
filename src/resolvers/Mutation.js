import uuid from 'uuid/v4'

const Mutation = {
  createUser(parent, args, { db }, info) {
    const emailTaken = db.users.some(item => item.email === args.data.email)
    if (emailTaken) {
      throw new Error('Email already taken')
    }
    const newUser = {
      id: uuid(),
      ...args.data,
    }
    db.users.push(newUser)
    return newUser
  },
  createPost(parent, args, { db }, info) {
    const userExists = db.users.some(item => item.id === args.data.author)
    if (!userExists) {
      throw new Error('User does not exists')
    }
    const newPost = {
      id: uuid(),
      ...args.data,
    }
    db.posts.push(newPost)
    return newPost
  },
  createComment(parent, args, { db, pubsub }, info) {
    
    const userExists = db.users.some(item => item.id === args.data.author)
    const postExists = db.posts.some(item => item.id === args.data.post && item.published)
    if (!userExists || !postExists) {
      throw new Error('User or Post does not exists')
    }
    const comment = {
      id: uuid(),
      ...args.data,
    }
    db.comments.push(comment)
    pubsub.publish(`comment:${args.data.post}`, { comment })
    return comment
  },
  deleteUser(parent, args, { db }, info) {
    const userIndex = db.users.findIndex(item => item.id === args.id)
    if (userIndex === -1) {
      throw new Error('No such user')
    }
    const deletedUser = db.users.splice(userIndex, 1)

    db.posts = db.posts.filter(item => {
      const match = item.author === args.id

      if (match) {
        db.comments = db.comments.filter(comment => comment.post !== item.id)
      }

      return !match
    })
    db.comments = db.comments.filter(item => item.author !== args.id)

    return deletedUser[0]
  },
  deletePost(parent, args, { db }, info) {
    const postIndex = db.posts.findIndex(item => item.id === args.id)
    if (postIndex === -1) {
      throw new Error('Post not found')
    }
    

    db.comments = db.comments.filter(comment => comment.post !== args.id)

    const deletedPost = db.posts.splice(postIndex, 1)
    return deletedPost[0]
  },
  deleteComment(parent, args, { db }, info) {
    const commentIndex = db.comments.findIndex(item => item.id === args.id)
    if (commentIndex === -1) {
      throw new Error('Comment not found')
    }
    const deletedComment = db.comments.splice(commentIndex, 1)
    return deletedComment[0]
  },
  updateUser(parent, args, { db }, info) {
    const { id, data } = args
    const user = db.users.find(item => item.id === id)
    if (!user) {
      throw new Error('user not found')
    }
    if (typeof data.email === 'string') {
      const emailTaken = db.users.some(item => item.email === data.email)
      if (emailTaken) {
        throw new Error('You can\'t use this email')
      }
      user.email = data.email
    }

    if (typeof data.name === 'string' || typeof data.name !== 'undefined') {
      user.name = data.name
    }
    if (typeof data.age === 'number') {
      user.age = data.age
    }
    // const updated = { user, ...data }
    // db.users = db.users.map(item => {
    //   if (item.id === user.id) {
    //     item = updated
    //   }
    //   return true
    // })
    return user
  },
  updatePost(parent, args, { db }, info) {
    const { id, data } = args
    const post = db.posts.find(item => item.id === id)
    if (!post) {
      throw new Error('No posts found')
    }

    if (typeof data.title === 'string') {
      post.title = data.title
    }
    if (typeof data.body === 'string') {
      post.body = data.body
    }
    if (typeof data.published === 'boolean') {
      post.published = data.published
    }
    return post

  },
  updateComment(parent, args, { db }, info) {
    const { id, data } = args
    const comment = db.comments.find(item => item.id === id)
    if (!comment) {
      throw new Error('No comments found')
    }

    if (typeof data.text === 'string') {
      comment.text = data.text
    }
    return comment
  },
}

export default Mutation