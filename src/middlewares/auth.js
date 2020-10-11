function verifyToken(req, res, next) {
  const bearerHeader = req.headers.authorization

  if (bearerHeader) {
    const bearer = bearerHeader.split(' ')
    const bearerToken = bearer[1]
    req.accessToken = bearerToken
    next()
  } else {
    res.sendStatus(403)
  }
}

export { verifyToken }
