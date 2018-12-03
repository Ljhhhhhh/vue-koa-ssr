import Router from 'koa-router'
import axios from './utils/axios'
import Province from '../dbs/models/province'
import City from '../dbs/models/city'

let router = new Router({
  prefix: '/geo'
})

const sign = 'd8402a2d5ad7e02e80108270d71831cc'

router.get('/getPosition', async (ctx) => {
  let {data:{province, city}} = await axios.get(`http://cp-tools.cn/geo/getPosition?sign=${sign}`)
  if (city) {
    ctx.body = {
      province,
      city
    }
  } else {
    ctx.body = {
      province: '',
      city: '',
    }
  }
})

router.get('/province', async (ctx) => {
  // let province = await Province.find()
  // ctx.body = {
  //   province: province.map(item =>{
  //     return {
  //       id: item.id,
  //       name: item.value[0]
  //     }
  //   })
  // }
  let {status, data:{province}} = await axios.get(`http://cp-tools.cn/geo/province?sign=${sign}`)
  ctx.body = {
    province: status === 200 ? province : ''
  }
})

router.get('/menu', async (ctx) => {
  let {data:{menu}} = await axios.get(`http://cp-tools.cn/geo/menu?sign=${sign}`)
  if (menu) {
    ctx.body = {
      menu
    }
  } else {
    ctx.body = {
      menu: []
    }
  }
})

router.get('/city', async (ctx) => {
  // let city = []
  // let result = await City.find()
  // result.forEach(item => {
  //   city = city.concat(item.value)
  // })
  // ctx.body = {
  //   code: 0,
  //   city: city.map(item => {
  //     return {
  //       province: item.province,
  //       id: item.id,
  //       name: item.name === '市辖区' || item.name === '省直辖县级行政区划'
  //         ? item.province
  //         : item.name
  //     }
  //   })
  // }
  let {
    status, data: {
      city
    }
  } = await axios.get(`http://cp-tools.cn/geo/city?sign=${sign}`);
  if (status === 200) {
    ctx.body = {
      city
    }
  } else {
    ctx.body = {
      city: []
    }
  }
})

router.get('/province/:id', async (ctx) => {
  let citys = await City.find()
  let city = await City.findOne({id: ctx.params.id})

  ctx.body = {
    code: 0,
    city: city.value.map(item => {
      return {province: item.province, id: item.id, name: item.name}
    })
  }
  // let {status, data: {
  //   city
  // }} = await axios.get(`http://cp-tools.cn/geo/province/${ctx.params.id}?sign=${sign}`)
  // if (status === 200) {
  //   ctx.body = {
  //     city
  //   }
  // } else {
  //   ctx.body = {
  //     city: []
  //   }
  // }
})

router.get('/hotCity', async (ctx) => {
  // let list = [
  //   '北京市',
  //   '上海市',
  //   '广州市',
  //   '深圳市',
  //   '天津市',
  //   '西安市',
  //   '杭州市',
  //   '南京市',
  //   '武汉市',
  //   '成都市'
  // ]
  // let result = await City.find()
  // let nList = []
  // result.forEach(item => {
  //   nList = nList.concat(item.value.filter(k => list.includes(k.name) || list.includes(k.province)))
  // })
  // ctx.body = {
  //   hots: nList
  // }


  let {
    status, data: {
      hots
    }
  } = await axios.get(`http://cp-tools.cn/geo/hotCity?sign=${sign}`);
  if (status === 200) {
    ctx.body = {
      hots
    }
  } else {
    ctx.body = {
      hots: []
    }
  }
})

export default router
