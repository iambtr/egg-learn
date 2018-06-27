
var db=connect('company')
var d=[]
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
db.workmate.insert(d)