const Comment = {
  author(parent, args, { db }, info) {
    return db.users.find(item => item.id === parent.author)
    // console.log(test)
    
  },
  post(parent, args, { db }, info) {
    return db.posts.find(item => item.id === parent.post)
  },
}

export default Comment