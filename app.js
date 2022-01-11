var express=require("express")
var bodyParser=require("body-parser")
var mongoose=require("mongoose")
const app=express()

app.set('view engine','ejs')                       //set ejs as template engine
app.engine('ejs', require('ejs').__express);

app.use(bodyParser.json())
app.use(express.static('views'))
app.use(bodyParser.urlencoded({
    extended:true
}))

//connect to database
mongoose.connect('mongodb://localhost:27017/Registration',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

var db=mongoose.connection;
db.on('error',()=>console.log("Error in connecting to database"));
db.once('open',()=>console.log("Connected to Database"))

app.post("/register",(req,res)=>{
    var fname=req.body.fname;
    var lname=req.body.lname;
    var email=req.body.email;
    var phone=req.body.phone;
    var age=req.body.age;
    var course=req.body.course;

    var data={
        "fname":fname,
        "lname":lname,
        "email":email,
        "phone":phone,
        "age":age,
        "course":course
    }

    db.collection("Form_input").insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });
    
    return res.render('success')
    
})
app.get("/",(req,res)=>{
    return res.render("index");
}).listen(8000,()=>console.log("Listening on port 8000"));
