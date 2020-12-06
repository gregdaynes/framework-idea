import r from 'lib'

const error = () =>
  async (err, req, res, next) => {
    r.logger.error(err)
    res.send('oops');
  }

export default error
