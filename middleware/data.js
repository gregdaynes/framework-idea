const data = (req, res, next) => {
  req.data = {
    ...req.body,
    ...req.headers
  }

  next()
}

export default data
