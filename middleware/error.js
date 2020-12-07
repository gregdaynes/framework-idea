import r from 'lib'

function error() {
  return async function error(err, req, res, next) {
    r.logger.error(err)

    res.send('oops');
  }
}

export default error;
