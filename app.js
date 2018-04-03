const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const index = require('./routes/index')
const users = require('./routes/users')
const yinxs1 = require('./routes/test1')
const yinxs2 = require('./routes/test2')

//使用redis，用来缓存数据
const redis   = require('redis');
const client  = redis.createClient({host:'127.0.0.1', port: 6379,no_ready_check:true});
client.on("error", function (err) {
    console.log("redis client连接失败",err);
});
client.on('ready', function (res) {
    console.log('client ready');
});

client.on('connect', function () {
    client.set("var_2", "var_2_val", function () {
        var read_var_2=client.get("var_2");
        console.log("第二次读取到的值："+read_var_2);
    });
    client.quit();
});

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(yinxs1.routes(), yinxs1.allowedMethods())
app.use(yinxs2.routes(), yinxs2.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
