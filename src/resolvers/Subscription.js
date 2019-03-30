const Subscription = {
  comment: {
    subscribe(parent, { postId }, { db, pubsub }, info) {
      const post = db.posts.find(item => item.id === postId && item.published)
      if (!post) {
        throw new Error('Post not found')
      }

      return pubsub.asyncIterator(`comment ${postId}`)
    },
  },
  post: {
    subscribe(parent, args, { db, pubsub }, info) {
      return pubsub.asyncIterator('post')
    },
  },

}

export default Subscription