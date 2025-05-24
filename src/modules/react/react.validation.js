import Joi from "joi";

export const addReactValidation = Joi.object({
    post: Joi.string().hex().length(24).required(),
    react: Joi.string().required().valid('haha','like','sad','angry','care')
})
export const getReactsValidation = Joi.object({
    post: Joi.string().hex().length(24).required(),
})
export const deleteReactValidation = Joi.object({
    id: Joi.string().hex().length(24).required(),
})
export const getReactValidation = Joi.object({
    post: Joi.string().hex().length(24).required(),
    react: Joi.string().valid('haha','like','sad','angry','care')
})