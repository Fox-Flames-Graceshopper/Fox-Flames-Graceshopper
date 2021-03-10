const isAdmin = function(req, res, next) {
  if (!req.user) {
    return res.status(403).send({message: 'not a user'})
  }
  if (req.user.dataValues.isAdmin) {
    next()
  } else {
    res.status(403).send({message: 'not a admin'})
  }
}

module.exports = isAdmin
