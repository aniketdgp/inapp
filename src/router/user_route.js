const express = require('express')
const router = new express.Router()
const user_model = require("../models/user")
const bycrypt = require("bcryptjs")

//User Signup 
router.get('/user/signup',async (req,res)=>{
    
    const user = new user_model(req.query)
      try{
        await user.save()
        res.status(201).send("<h1>Registerd Sucessfully</h1>")
    }catch(e){
        res.status(400).send("<h1>Couldn't Register</h1>")
    }
})

//View all Registerd Users

router.get("/user/view",async(req,res)=>{
    
    try{
       const users =  await user_model.find({})
       res.send(users)
    }catch(e){
        res.status(500).send(e)
    }   

})


//Login Registerd User
const session = undefined
router.get("/user/login",async(req,res)=>{

    const data = new user_model(req.query)

    try{
        const users = await user_model.findByCredentials(data.username,data.password)

        if(users){
            session = data.username
        }

        res.send("<h1>Sucess Login</h1>")

    }catch(e){
        res.status(200).send("<h1>Invalid Credentials</h1>")   
    }



})

module.exports = router