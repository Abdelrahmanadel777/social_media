import { User } from "../../database/models/user.model.js";
import { AppError } from "../utils/Apperror.js";
import { catchError } from "./catchError.js";
import jwt from 'jsonwebtoken'

export const protectedRoutes = catchError(async (req, res, next) => {
    let { token } = req.headers
    let userPayload = null
    if (!token) return next(new AppError('token not sended', 401))
    jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
        if (err) return next(new AppError('invalid token', 401))
        userPayload = payload
    })
    let user = await User.findById(userPayload.userId)
    if (!user) return next(new AppError('user not found', 404))

    let time = parseInt(user.passwordChangedAt?.getTime() / 1000)
    if (time > userPayload.iat) return next(new AppError('token is invalid', 401))
    req.user = user

    next()


})