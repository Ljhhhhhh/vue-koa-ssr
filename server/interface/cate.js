import Router from 'koa-router'
import axios from './utils/axios'
let router = new Router({
  prefix: '/categroy'
})

const sign = 'd8402a2d5ad7e02e80108270d71831cc'

router.get('/crumbs', async (ctx) => {
  let res = await axios.get(`http://cp-tools.cn/categroy/crumbs`, {
    params: {
      sign,
      city: ctx.query.city.replace('市', '') || '北京'
    }
  })
  let areas = res.data.areas
  let types = res.data.types
  ctx.body = {
    areas,
    types
  }
})

export default router
