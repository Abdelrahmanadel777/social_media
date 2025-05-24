import { AppError } from '../utils/Apperror.js'

export const validate = (schema) => {
    let errMsgs = []
    return (req, res, next) => {
        if (req.file) {
            let { error } = schema.validate({ image: req.file, ...req.body, ...req.params, ...req.query })
            console.log({ ...req.body, ...req.params, ...req.query });

            if (!error) return next()
            console.log(error);

            error.details.map((err) => errMsgs.push(err.message))
            next(new AppError(errMsgs, 404))
        } else {
            let { error } = schema.validate({ ...req.body, ...req.params, ...req.query })
            console.log({ ...req.body, ...req.params, ...req.query });

            if (!error) return next()
            console.log(error);

            error.details.map((err) => errMsgs.push(err.message))
            next(new AppError(errMsgs, 404))
        }


    }
}