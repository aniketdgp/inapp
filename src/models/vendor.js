const validator = require('validator')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const vendorSchema = mongoose.Schema({

    name:{
        type : String,
        lowercase : true ,
        trim : true ,
        required : true
    },
    username:{
        type : String,
        lowercase : true ,
        trim : true ,
        required : true
    },
    email : {
        type : String ,
        required : true ,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is Invalid")
            }
        }
    },
    password :{
        type : String,
        required : true,
        minlength : 7 ,
        trim : true,
        validator(value){
            if(value.toLowerCase().includes("password")){
                throw new Error("Password Cannot Contain Password")
            }
        }
    },
    phone:{
        type : Number,
        trim : true ,
        required : true
    },

})


vendorSchema.statics.findByCredentials = async (phone, password) => {
    const vendor = await Vendor.findOne({ phone })

    if (!vendor) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, vendor.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return vendor
}


// Hash the plain text password before saving
vendorSchema.pre('save', async function (next) {
    const vendor = this

    if (vendor.isModified('password')) {
        vendor.password = await bcrypt.hash(vendor.password, 8)
    }

    next()
})


const Vendor = mongoose.model('vendor', vendorSchema)
module.exports = Vendor