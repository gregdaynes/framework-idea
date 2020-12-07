const data = () => (req, res, next) => {
  req.data = {
    ...req.query,
    ...req.body,
    ...req.headers,
    ...req.params
  }

  next()
}

export default data
