import { AppError } from "../utils/Apperror.js"

export const isAllowedTo = (...role) => {

    return (req, res, next) => {
     
        
        if (req.user.role !== role[0] && req.user.role !== role[1])return next(new AppError('unauthorized', 404))
        next()
    }

}
