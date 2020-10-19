module.exports = (req, res, next) => {
  const db = req.app.get('db')
  req.db = db.poker
  next()
}
