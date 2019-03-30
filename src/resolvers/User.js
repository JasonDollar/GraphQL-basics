const User = {
  posts(parent, args, { db }, info) {
    return db.posts.filter(item => item.author === parent.id)
  },
  comments(parent, args, { db }, info) {
    return db.comments.filter(item => item.author === parent.id)
  },
}

export default User