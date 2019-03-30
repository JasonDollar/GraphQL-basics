const Query = { 
  users(parent, args, { db }, info) {
    
    if (args.query) {
      return db.users.filter(item => item.name.toLowerCase().includes(args.query))
    }
    return db.users
  },
  posts(parent, args, { db }, info) {
    if (args.query) {
      return db.posts.filter(item => item.title.toLowerCase().includes(args.query.toLowerCase()) 
      || item.body.toLowerCase().includes(args.query.toLowerCase()))
    }
    return db.posts 
  },
  comments(parent, args, { db }, info) {
    return db.comments 
  },
}

export default Query