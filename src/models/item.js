const mongoose = require('mongoose')


const item = mongoose.model('item',{

    title:{
        type : String,
        trim : true,
        required : true
    },
    description:{
        type : String,
        trim : true,
        required : true
    },
    price:{
        type : Number,
        trim : true,
        required : true
    },


})

module.exports = item