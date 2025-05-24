import { User } from "../../../database/models/user.model.js"
import { catchError } from "../../middleware/catchError.js"
import { AppError } from "../../utils/Apperror.js"
import jwt from 'jsonwebtoken'


export const addUser = catchError(async (req, res, next) => {
    let user = User(req.body)
    let token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_KEY)
    await user.save()
    res.json({ message: 'added', user, token })
})
export const updateUser = catchError(async (req, res, next) => {
    let user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!user) return next(new AppError('user not found'))
    res.json({ message: "updated", user })

})
export const deleteUser = catchError(async (req, res, next) => {
    let user = await User.findByIdAndDelete(req.params.id)
    if (!user) return next(new AppError('user not found'))
    res.json({ message: "deleted", user })

})
export const getUsers = catchError(async (req, res, next) => {
    let user = await User.find()
    if (!user) return next(new AppError('no users found'))
    res.json({ message: "success", user })

})
export const getUser = catchError(async (req, res, next) => {
    let user = await User.findById(req.params.id)
    if (!user) return next(new AppError('no user found'))
    res.json({ message: "success", user })

})