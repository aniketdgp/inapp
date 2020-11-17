const mongoose = require('mongoose')

const dburl = "mongodb://127.0.0.1:27017/INAPI"

mongoose.connect(dburl,{
    useNewUrlParser :true,
    useCreateIndex:true,
    useUnifiedTopology: true,
    useFindAndModify :false
})
