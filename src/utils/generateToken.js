import jwt from 'jsonwebtoken'

const generateToken = id => jwt.sign({ userId: id }, 'thisisasecret', { expiresIn: '10 days' })

export default generateToken