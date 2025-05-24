import Joi from "joi";

export const signupSchema = Joi.object({
    name: Joi.string().max(20).min(2).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).required(),
    repassword: Joi.string().valid(Joi.ref('password')).required(),
    role:Joi.string()

})
export const signinSchema = Joi.object({

    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).required(),


})