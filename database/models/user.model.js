import { model, Schema } from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 20,
        
    },
    email: String,
    password: String,
  
    role: {
        type: String,
        enum: ['User', 'Admin'],
        default: 'User',
    },
    passwordChangedAt: Date
}, { timestamps: true, versionKey: false })
userSchema.pre('save', function () {
    this.password = bcrypt.hashSync(this.password, 8)

})
export const User = model('User', userSchema)