import Joi from "joi";

export const addUserValidation = Joi.object({
    name: Joi.string().max(20).min(2).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).required(),
    repassword: Joi.string().valid(Joi.ref('password')).required(),
    role:Joi.string()
})
export const updateUserValidation = Joi.object({
    name: Joi.string().max(20).min(2),
    email: Joi.string().email(),
    id: Joi.string().hex().length(24).required()

})
export const deleteUserValidation = Joi.object({

    id: Joi.string().hex().length(24).required()

})