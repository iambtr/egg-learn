const koa =require('koa')
const bodyParser =require('koa-bodyparser')
const Router =require('koa-router')
const mongodb =require('mongodb')

let dbc,company=null
mongodb.MongoClient.connect('mongodb://localhost:27017/',(err,db)=>{
    if(err)throw err
    console.log('数据库连接成功')
    dbc=db
    company=dbc.db('company')
})

const user=new Router()
const router=new Router()

user
.get('/lists',async (ctx,next)=>{
    let oQuery=ctx.request.query
    if(!oQuery.page){
        ctx.status=400
        ctx.body={success:false,message:'请传入page'}
    }
    let skipTip=Number(oQuery.page)*8
    let persons=await (()=>{
        return new Promise((resolve,reject)=>{
            company.collection('workmate').find().sort({name:-1}).skip(skipTip).limit(8).toArray((err,res)=>{
                if(err){
                    reject(err)
                }else{
                    resolve(res)
                }
            })
        })
    })()
    ctx.body=persons
    await next()
})
.post('/lists',async(ctx,next)=>{
    let d=[]
    for(let i=0;i<49;i++){
        let data={
            "name":"王榕"+i,
            "skill":{
                "skill1":"ppt"
            },
            "register":1530088530369,
            "age":23
        }
        d.push(data)
    }
    let persons=await (()=>{
        return new Promise((resolve,reject)=>{
            company.collection('workmate').insertMany(d,(err,res)=>{
                if(err){
                    reject(err)
                }else{
                    resolve(res)
                }
            })
        })
    })()
    ctx.body=persons
    await next()
})

const app=new koa()

router
    .use('/user',user.routes(),user.allowedMethods())
app
    .use(router.routes())
    .use(router.allowedMethods())

app.listen(3002,()=>{
    console.log('run')
})