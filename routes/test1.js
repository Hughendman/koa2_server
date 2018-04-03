const router = require('koa-router')()

router.prefix('/yinxs')

router.get('/yinxs', function (ctx, next) {
    ctx.body = 'I am yinxs!'
})

router.get('/father', function (ctx, next) {
    ctx.body = 'I am father'
})

router.get('/son', function (ctx, next) {
    ctx.body = 'I am son'
})

router.post('/getname', function(ctx, next) {
    console.log(JSON.stringify(ctx.request));
    ctx.body = 'I am yinxs post'
})

module.exports = router