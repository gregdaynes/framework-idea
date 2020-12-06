const controllerInit = (fn) =>
  async function controller(req, res, next) {
    let caughtError

    try {
      await fn.call(this, req, res)
    } catch (err) {
      caughtError = err
    } finally {
      next(caughtError)
    }
  }

export default controllerInit
