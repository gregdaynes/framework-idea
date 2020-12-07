import lib from 'lib'

export default function daily() {
  return lib.router('/')
    .all('/', lib.controller((req, res) => {
      console.log('report/daily')
      res.data = {data: 'report/daily'}
    }))
}
