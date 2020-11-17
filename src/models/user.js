const validator = require('validator')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({

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



userSchema.statics.findByCredentials = async (username, password) => {
    const user = await User.findOne({ username })

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}


// Hash the plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})


const User = mongoose.model('user', userSchema)
module.exports = User