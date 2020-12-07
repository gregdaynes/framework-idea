import r from 'lib'

function respond() {
  return async function respond(req, res) {
    const data = await res.data

    console.log('resdata', res.data)
    res.json(data)
    // console.log(res.data)
    // res.status(200);
    // res.json(data);
  }
}

export default respond;
