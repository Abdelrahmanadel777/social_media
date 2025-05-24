import { User } from "../../database/models/user.model.js"
import { AppError } from "../utils/Apperror.js"

export const checkEmail = async (req, res, next) => {
    let user = await User.findOne({ email: req.body.email })
    if (user) return next(new AppError('this email is already exist', 404))
    next()

}