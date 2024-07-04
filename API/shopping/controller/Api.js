const libExpress = require('express')

const User = require('../router/user')
const Product = require('../router/product')

api = libExpress.Router()

api.use('/users', User)
api.use('/products', Product)

api.use('*',(req,res,next)=>{
    res.status(404).json({error:"No API Found!"})
})

module.exports = api