import lib from 'lib'

export default function week() {
  return lib.router('/')
    .all('/', lib.controller(async (req, res) => {
      console.log('report/monthly/week')
      res.data = {...req.data, controller: 'week'}
    }))
}
