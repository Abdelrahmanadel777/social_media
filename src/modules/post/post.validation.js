import Joi from "joi";

export const addPostValidation = Joi.object({
    caption: Joi.string().max(2000).min(1),
    user: Joi.string().hex().max(24),
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
export const updatePostValidation = Joi.object({
    caption: Joi.string().max(2000).min(1),
    id: Joi.string().hex().length(24)
})
export const getPostValidation = Joi.object({

    id: Joi.string().hex().length(24)
})