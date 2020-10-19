const bcrypt = require('bcryptjs')
const { USER } = require('../constants/roles')

module.exports = {
  register: async (req, res) => {
    let { email, first, last, password } = req.body

    email = email.toLowerCase()

    const existingUser = await req.db.users.findOne({ email })

    if (existingUser) {
      return res.status(409).send('User already exists')
    }
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    const newUser = await req.db.users.insert({
      first,
      last,
      email,
      role: USER,
    })
    await req.db.users_auth.insert({ users_id: newUser.id, hash })

    req.session.user = newUser
    res.status(200).send(newUser)
  },
  login: async (req, res) => {
    let { email, password } = req.body

    email = email.toLowerCase()

    const existingUser = await req.db.users.findOne({ email })

    if (!existingUser) {
      return res.status(404).send('User does not exist')
    }

    const userAuth = await req.db.users_auth.findOne({
      users_id: existingUser.id,
    })

    const authenticated = bcrypt.compareSync(password, userAuth.hash)

    if (!authenticated) {
      return res.status(403).send('Password wrong')
    }

    req.session.user = existingUser

    res.status(200).send(existingUser)
  },
  getUser: (req, res) => {
    res.status(200).send('USER')
  },
  logout: (req, res) => {
    req.session.destroy()
    res.sendStatus(200)
  },
}
