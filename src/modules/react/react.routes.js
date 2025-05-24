import { Router } from "express";
import { protectedRoutes } from "../../middleware/protectedRoute.js";
import { isAllowedTo } from "../../middleware/isAllowedTo.js";
import { validate } from "../../middleware/validation.js";
import * as reactValidation from "./react.validation.js";
import * as reactCruds from "./react.controller.js";

export const reactRouter = Router()
reactRouter.route('/:post').get(protectedRoutes, isAllowedTo('user', 'admin'), validate(reactValidation.getReactsValidation), reactCruds.getReacts)
    .post(protectedRoutes, isAllowedTo('user', 'admin'), validate(reactValidation.addReactValidation), reactCruds.addReact)

reactRouter.route('/:post/:react').get(protectedRoutes, isAllowedTo('user', 'admin'), validate(reactValidation.getReactValidation), reactCruds.getReact)
reactRouter.route('/:id').delete(protectedRoutes, isAllowedTo('user', 'admin'), validate(reactValidation.deleteReactValidation), reactCruds.deleteReact)
