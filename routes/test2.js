const router = require('koa-router')()
const json_1 = require('../public/json/test1');

router.prefix('/test_async')

router.get('/yinxs', function (ctx, next) {
    let query = ctx.query;
    let time = null ;
    async function test1(a) {
        let b = a.join(',');
        let test1_1 =await function (b) {
            return b;
        };
        let test1_2 =await function (b) {
            return b.split(',');
        };
        time = test1_1(b);
        times = test1_2(b);
        json_1.past = time;
        json_1.pasts = times;
        json_1.query = query;
        ctx.body = json_1;
    }
    let arr = ['I am test1','I am test2','I am test3'];
    test1(arr);
});

module.exports = router