const users = [
  {
    id: '1',
    name: 'Jason',
    email: 'jd@gmail.com',
    age: 28,
  },
  {
    id: '2',
    name: 'Dorota',
    email: 'dd@gmail.com',
    age: 27,
  },
  {
    id: '3',
    name: 'Iga',
    email: 'iga@gmail.com',
    age: 24,
  },
]

const posts = [ 
  {
    id: '11',
    title: 'First',
    body: 'Body',
    published: true,
    author: '1',
  }, {
    id: '15',
    title: 'Second',
    body: 'Body',
    published: true,
    author: '2',
  }, {
    id: '18',
    title: 'www',
    body: 'Lody',
    published: true,
    author: '3',
  }, {
    id: '19',
    title: 'jd',
    body: 'Lody',
    published: false,
    author: '2',
  }, 
] 

const comments = [
  {
    id: '2134',
    text: 'First comment',
    author: '1',
    post: '18',
  }, { 
    id: '2s134',
    text: 'Second comment',
    author: '2',
    post: '19',
  }, { 
    id: '2qwe134',
    text: 'Third comment',
    author: '1',
    post: '15',
  }, { 
    id: 'wqwe',
    text: '4th comment',
    author: '3',
    post: '11',
  }, 
]

const db = { users, posts, comments }

export default db