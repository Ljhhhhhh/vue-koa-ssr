import Router from 'koa-router'
import axios from './utils/axios'
import Cart from '../dbs/models/cart'
import Order from '../dbs/models/order'
import md5 from 'crypto-js/md5'

let router = new Router({
  prefix: '/order'
})

router.post('/createOrder', async ctx => {
  let {id, price, count} = ctx.request.body
  let time = Date()
  let orderrID = md5(Math.random() * 1000 + time).toString()
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: -1,
      msg: 'plase login'
    }
  } else {
    let findCart = await Cart.findOne({
      cartNo: id
    })
    let order = new Order({
      id: orderrID,
      count,
      total: price * count,
      time,
      user: ctx.session.passport.user,
      name: findCart.detail[0].name,
      imgs: findCart.detail[0].imgs,
      status: 0
    })
    try {
      let result = await order.save();
      if (result) {
        await findCart.remove()
        ctx.body = {
          code: 0,
          id: orderrID
        }
      } else {
        ctx.body = {
          code: -1
        }
      }
    } catch(e) {
      ctx.body = {
        code: -1
      }
    }
  }
})

router.post('/getOrders', async ctx => {
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: -1,
      msg: 'plase login',
      list: []
    }
  } else {
    try {
      let result = await Order.find()
      if (result) {
        ctx.body = {
          code: 0,
          list: result
        }
      } else {
        ctx.body = {
          code: -1,
          list: []
        }
      }
    } catch (e) {
      ctx.body = {
        code: -1,
        list: [],
        msg: 'erorr'
      }
    }
  }
})

export default router
