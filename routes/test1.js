const router = require('koa-router')()
const redis   = require('redis');
const client  = redis.createClient({host:'127.0.0.1', port: 6379,no_ready_check:true});
client.on("error", function (err) {
    console.log("redis client连接失败",err);
});
client.on('ready', function (res) {
    console.log('client ready');
});



router.prefix('/yinxs')

router.get('/yinxs', function (ctx, next) {
    client.get("var_2", function (errGet,responseGet) {
        console.log("第二次读取到的值："+responseGet);
    });
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