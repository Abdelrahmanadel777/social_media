import Joi from "joi";

export const addCommentValidation = Joi.object({

    id: Joi.string().hex().length(24),
    content: Joi.string().min(1).max(600),
    image: Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid('image/jpeg', 'image/png', 'image/gif', 'image/jpg').required(),
        size: Joi.number().max(5242880).required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required()
    }).required()

})
export const CommentValidation = Joi.object({
    content: Joi.string().max(20).min(2),
    id: Joi.string().hex().length(24).required()

})
