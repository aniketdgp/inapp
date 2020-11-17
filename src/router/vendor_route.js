const express = require('express')
const router = new express.Router()
const vendor_model = require("../models/vendor")
const item_model = require("../models/item")


//Vendor Signup 
router.get('/vendor/signup',async (req,res)=>{
    
    const vendor = new vendor_model(req.query)
      try{
        await vendor.save()
        res.status(201).send("<h1>Registerd Sucessfully</h1>")
    }catch(e){
        res.status(400).send("<h1>Couldn't Register</h1>")
    }
})

//View all Registerd Vendors
router.get("/vendor/view",async(req,res)=>{
    
    try{
       const vendor =  await vendor_model.find({})
       res.send(vendor)
    }catch(e){
        res.status(500).send(e)
    }   

})

//Login Registerd vendors
router.get("/vendor/login",async(req,res)=>{

    const data = new vendor_model(req.query)

    try{
        const vendor = await vendor_model.findByCredentials(data.phone,data.password)
        res.send("<h1>Logged in Sucessfully</h1>")

    }catch(e){
        res.status(200).send("<h1>Invalid Credentials</h1>")   
    }

})


//Add Items to Vendor List

router.post("/vendor/add/list",async(req,res)=>{

    const item = new item_model(req.body)
    try{
      await item.save()
      res.status(200).send(item)
  }catch(e){
      res.status(400).send()
  }

})


//View All items in Vendor Item list

router.get("/vendor/list",async(req,res)=>{
    try{
        const item =  await item_model.find({})
        res.status(200).send(item)
     }catch(e){
         res.status(500).send(e)
     }  
})

module.exports = router