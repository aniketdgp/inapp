const express = require('express')
const hbs = require('hbs')
const path = require('path')

require("./db/mongodb")   //Include Database connections

const user_router = require("./router/user_route")
const vendor_router = require("./router/vendor_route")
const port = process.env.PORT || 3000

const app = express()
app.use(express.json()) //Brings the json response from client side

//Creating routes from different file
app.use(user_router)
app.use(vendor_router)




app.set('view engine','hbs')
//setting dir address
const dir = path.join(__dirname,"../public")
const viewdir = path.join(__dirname,"../templates/view")
const pardir = path.join(__dirname,"../templates/partials")
//setting the directory for use
app.use(express.static(dir))
app.set('views',viewdir)
hbs.registerPartials(pardir)





app.get('/',(req,res)=>{
    res.render('home.hbs')
})

app.get('/register',(req,res)=>{
    res.render('register.hbs')
})

app.get('/register_vendor',(req,res)=>{
    res.render('register/vendor_register.hbs')
})

app.get('/register_user',(req,res)=>{
    res.render('register/user_register.hbs')
})

app.get('/login',(req,res)=>{
    res.render('login.hbs')
})

app.get('/login_vendor',(req,res)=>{
    res.render('login/vendor_login.hbs')
})

app.get('/login_user',(req,res)=>{
    res.render('login/user_login.hbs')
})






app.listen(port,()=>{
    console.log("Server is Running at port "+ port)
})

