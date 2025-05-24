import { User } from "../../../database/models/user.model.js"
import { catchError } from "../../middleware/catchError.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { AppError } from "../../utils/Apperror.js"


export const signup = catchError(async (req, res, next) => {
    let user = User(req.body)
    let token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_KEY)
    await user.save()
    res.json({ message: 'added', user, token })
})
export const signin = catchError(async (req, res, next) => {
    let user = await User.findOne({ email: req.body.email })
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
        let token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_KEY)
        res.json({ message: "success", user, token })
    } else {
        next(new AppError('something is wrong', 404))
    }
})
export const changePassword = catchError(async (req, res, next) => {
    let user = await User.findOne({ email: req.body.email })
    if (user && bcrypt.compareSync(req.body.oldPassword, user.password)) {
        let updatedUser = await User.findOneAndUpdate({ email: req.body.email }, { password: bcrypt.hashSync(req.body.newPassword, 8), passwordChangedAt: Date.now() }, { new: true })
        let token = jwt.sign({ userId: updatedUser._id, role: updatedUser.role }, process.env.JWT_KEY)
        res.json({ message: "updated", updatedUser, token })
    } else {
        next(new AppError('something is wrong', 404))
    }
})