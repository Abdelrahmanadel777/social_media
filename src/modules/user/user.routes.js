import { Router } from "express";
import * as userFunctions from "./user.controller.js";
import { isAllowedTo } from "../../middleware/isAllowedTo.js";
import { protectedRoutes } from "../../middleware/protectedRoute.js";
import { validate } from "../../middleware/validation.js";
import * as userValidations from "./user.validation.js";

export const userRouter = Router()
userRouter.route('/').get(protectedRoutes, isAllowedTo('admin'), userFunctions.getUsers)
    .post(protectedRoutes, validate(userValidations.addUserValidation), isAllowedTo('admin'), userFunctions.addUser)
userRouter.route('/:id').get(protectedRoutes, isAllowedTo('admin'), userFunctions.getUser)
    .put(protectedRoutes, validate(userValidations.updateUserValidation), isAllowedTo('admin'), userFunctions.updateUser)
    .delete(protectedRoutes, validate(userValidations.deleteUserValidation), isAllowedTo('admin'), userFunctions.deleteUser)