import { Router } from "express";
import { changePassword, signin, signup } from "./authentication.controller.js";
import { checkEmail } from "../../middleware/checkEmail.js";
import { validate } from "../../middleware/validation.js";
import { signinSchema, signupSchema } from "./authentication.validation.js";

export const authRouter = Router()
authRouter.route('/signup').post(checkEmail, validate(signupSchema), signup)
authRouter.route('/signin').post(validate(signinSchema), signin)
authRouter.route('/changePassword').put(changePassword)
